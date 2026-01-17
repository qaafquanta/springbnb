import {prisma} from '../lib/prisma.js'
import type { Request,Response } from "express";
import {cloudinary} from '../configs/cloudinary.config.js'
import { calculateFinalPriceSync } from '../functions/calculateFinalPrice.js';

export const fetchCreatePropertyPage = async(req:Request,res:Response) => {
    try{
        const propertyCategories = await prisma.propertyCategory.findMany({
            select:{
                name: true,
                description: true,
                id: true
            }
        })
        return res.status(200).json({
            success:true,
            result:propertyCategories
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err
        })
    }
}

export const createProperty = async(req:Request,res:Response) => {
    try{
        const imageUrl = req.file
        const tenantId = (req as any).user.id
        console.log(tenantId)
        console.log('1')
        if(!imageUrl){
            return res.status(400).json({message:"Image is required"})
        }
        const cloudinaryImage = await cloudinary.uploader.upload(imageUrl.path)
        console.log(req.body)
        const {name,description,city,address,categoryId} = req.body
        console.log(name,description,city,address,categoryId)
        const property = await prisma.property.create({
            data:{
                name,
                description,
                city,
                address,
                categoryId,
                tenantId,
                images: [cloudinaryImage.secure_url]
            }
        })
        return res.status(200).json({
            success:true,
            result:property
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err,
        })
    }
}

export const dashboardProperties = async(req:Request,res:Response) => {
    try{
        const userId = (req as any).user.id
        const properties = await prisma.property.findMany({
            where:{
                tenantId:userId
            },
            select:{
                id:true,
                name: true,
                description: true,
                city: true,
                address: true,
                category: true,
                images: true,
                roomTypes:true,
            }
        })
        return res.status(200).json({
            success:true,
            result:properties
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err,
        })
    }
}

export const getAllProperties = async(req:Request,res:Response)=>{
    try{
        const {page = 1,limit = 10} = req.query;
        const skip = (Number(page)-1) * Number(limit)
        const properties = await prisma.property.findMany({
            include:{
                category: true,
                roomTypes: {
                    select: {
                        basePrice: true
                    },
                    orderBy: {
                        basePrice: 'asc'
                    },
                    take: 1
                }
            },
            skip,
            take: Number(limit),

        })
        return res.status(200).json({
            success:true,
            result: properties
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:err,
        })
    }
}

export const getPropertyDetail = async(req:Request,res:Response)=>{
    try{
        const {id} = req.params
        const todayYYYYMMDD = new Date().toISOString().split("T")[0];
        const tomorrowYYYYMMDD = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0];
        const { checkIn = todayYYYYMMDD, checkOut = tomorrowYYYYMMDD } = req.query;
        
        if(!id){
            return res.status(400).json({message:"Property Id Required"})
        }
        const property = await prisma.property.findUnique({
            where: {id},
            include:{
                roomTypes: {
                    include: {
                        rooms:true,
                        peakSeasonRate: true
                    }
                }
            }
            
        })

        if (!property) {
            return res.status(404).json({ message: "Property not found" })
        }

        const checkInStr = String(checkIn);
        const checkOutStr = String(checkOut);
        
        const propertyWithFinalPrice = {
            ...property,
            roomTypes: property.roomTypes.map(roomType => {
                const priceResult = calculateFinalPriceSync(
                    roomType.basePrice,
                    checkInStr,
                    checkOutStr,
                    roomType.peakSeasonRate
                );
                return {
                    ...roomType,
                    finalPrice: priceResult.finalPrice,
                    nights: priceResult.nights
                };
            })
        };

        return res.status(200).json({
            property: propertyWithFinalPrice,
            dateRange: {
                checkIn: checkInStr,
                checkOut: checkOutStr
            }
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err,
        })
    }
}

export const getSearchInfo = async(req:Request,res:Response)=>{
    try{
        const cities = await prisma.property.groupBy({
            by: ['city'],
            _count: {
                city: true,
            },
            orderBy:{
                _count: {
                    city: 'desc',
                },
            }
        })
        const categories = await prisma.propertyCategory.findMany({
            select:{
                name:true,
                id:true,
            }
        })
        return res.status(200).json({cities,categories})
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err,
        })
    }
}

export const filterAllProperties = async(req:Request,res:Response)=>{
    try{
        const todayYYYYMMDD = new Date().toISOString().split("T")[0];
        const tomorrowYYYYMMDD = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0];
        const {page = 1,limit = 10,city="",categoryId="",checkIn=todayYYYYMMDD,checkOut=tomorrowYYYYMMDD,guests=1,propertyName=""} = req.query;
        const skip = (Number(page)-1) * Number(limit)

        const where:any = {
            AND: [{
                roomTypes: {
                    some:{
                        capacity: {
                            gte: Number(guests)
                        }
                    }
                }
            }],
        }

        if(propertyName){
            where.AND.push({
                name: {
                    contains: String(propertyName),mode: 'insensitive'
                }
            })
        }

        if(city){
            where.AND.push({
                city: {
                    contains: String(city),mode: 'insensitive'
                }
            })
        }

        if(categoryId){
            where.AND.push({
                categoryId: String(categoryId)
            })
        }

        if(checkIn && checkOut){
            where.AND.push({
                roomTypes: {
                    some: {
                        rooms: {
                            some: {
                                roomAvailability: {
                                    none: {
                                        date: {
                                            gte: new Date(String(checkIn)),
                                            lte: new Date(String(checkOut))
                                        },
                                        isAvailable: false
                                    }
                                }
                            }
                        }
                    }
                }
            })
        }

        const totalCount = await prisma.property.count({ where })

        const properties = await prisma.property.findMany({
            include:{
                category: true,
                roomTypes: {
                    include: {
                        rooms:true,
                        peakSeasonRate: true
                    },
                    orderBy:{
                        basePrice: 'asc'
                    },
                    where:{
                        capacity: {
                            gte: Number(guests)
                        }
                    }
                }
            },
            skip,
            take: Number(limit),
            where,
        })

        const checkInStr = String(checkIn);
        const checkOutStr = String(checkOut);
        
        const propertiesWithFinalPrice = properties.map(property => ({
            ...property,
            roomTypes: property.roomTypes.map(roomType => {
                const priceResult = calculateFinalPriceSync(
                    roomType.basePrice,
                    checkInStr,
                    checkOutStr,
                    roomType.peakSeasonRate
                );
                return {
                    ...roomType,
                    finalPrice: priceResult.finalPrice,
                    nights: priceResult.nights
                };
            })
        }));

        return res.status(200).json({
            success:true,
            result: propertiesWithFinalPrice,
            pagination:{
                currentPage: Number(page),
                totalPages: Math.ceil(totalCount / Number(limit)),
                totalData: totalCount,
                limit: Number(limit),
            },
            filterData:{
                city,
                categoryId,
                checkIn,
                checkOut, 
                guests,
                propertyName
            } 
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err,
        })
    }
}

export const getPropertyForEdit = async(req:Request,res:Response)=>{
    try{
        const {id} = req.params
        const tenantId = (req as any).user.id
        
        if(!id){
            return res.status(400).json({message:"Property Id Required"})
        }
        
        const property = await prisma.property.findUnique({
            where: {id, tenantId},
            include:{
                category: true
            }
        })
        
        if(!property){
            return res.status(404).json({message:"Property not found or unauthorized"})
        }
        
        const categories = await prisma.propertyCategory.findMany({
            select:{
                id: true,
                name: true
            }
        })
        
        return res.status(200).json({
            success:true,
            property,
            categories
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err,
        })
    }
}

export const updateProperty = async(req:Request,res:Response)=>{
    try{
        const {id} = req.params
        const tenantId = (req as any).user.id
        const {name, description, city, address, categoryId, existingImages} = req.body
        
        if(!id){
            return res.status(400).json({message:"Property Id Required"})
        }
        
        const existingProperty = await prisma.property.findUnique({
            where: {id, tenantId}
        })
        
        if(!existingProperty){
            return res.status(404).json({message:"Property not found or unauthorized"})
        }
        
        const newImages = req.files as Express.Multer.File[]
        let imageUrls: string[] = []
        
        if(existingImages){
            const parsedExistingImages = typeof existingImages === 'string' 
                ? JSON.parse(existingImages) 
                : existingImages
            imageUrls = Array.isArray(parsedExistingImages) ? parsedExistingImages : []
        }
        
        if(newImages && newImages.length > 0){
            const uploadPromises = newImages.map((file) => 
                cloudinary.uploader.upload(file.path)
            )
            const uploadedImages = await Promise.all(uploadPromises)
            const newImageUrls = uploadedImages.map((img) => img.secure_url)
            imageUrls = [...imageUrls, ...newImageUrls]
        }
        
        const updatedProperty = await prisma.property.update({
            where: {id},
            data:{
                name,
                description,
                city,
                address,
                categoryId,
                images: imageUrls
            }
        })
        
        return res.status(200).json({
            success:true,
            result:updatedProperty
        })
    }catch(err){
        console.error(err)
        return res.status(500).json({
            success:false,
            message:err,
        })
    }
}

export const deleteProperty = async(req:Request,res:Response)=>{
    try{
        const {id} = req.params
        const tenantId = (req as any).user.id
        
        if(!id){
            return res.status(400).json({message:"Property Id Required"})
        }
        
        const property = await prisma.property.findUnique({
            where: {id, tenantId}
        })
        
        if(!property){
            return res.status(404).json({message:"Property not found or unauthorized"})
        }
        
        await prisma.property.delete({
            where: {id}
        })
        
        return res.status(200).json({
            success:true,
            message:"Property deleted successfully"
        })
    }catch(err){
        console.error(err)
        return res.status(500).json({
            success:false,
            message:err,
        })
    }
}