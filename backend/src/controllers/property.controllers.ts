import {prisma} from '../lib/prisma.js'
import type { Request,Response } from "express";
import {cloudinary} from '../configs/cloudinary.config.js'
import { verifyAuthToken } from '../utils/verifyAuthToken.js';

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
        // const cloudinaryImages = await Promise.all(images?.map((image:File) => {
        //     return cloudinary.uploader.upload(image.path)
        // }))
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
                category: true
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
        if(!id){
            return res.status(400).json({message:"Property Id Required"})
        }
        const property = await prisma.property.findUnique({
            where: {id},
            include:{
                roomTypes: {
                    include: {
                        rooms:true
                    }
                }
            }
            
        })
        return res.status(200).json({property})
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err,
        })
    }
}