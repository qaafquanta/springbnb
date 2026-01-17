import {prisma} from '../lib/prisma.js'
import type { Request,Response } from "express";
import {cloudinary} from '../configs/cloudinary.config.js'

export const createRoomType = async (req:Request,res:Response) => {
    try{
        const imageUrl = req.file
        const {propertyId} = req.params //diliat dulu paramsnya apa
        if(!imageUrl){
            return res.status(400).json({error:"Image is required"})
        }
        if(!propertyId){
            return res.status(400).json({error:"Property ID is required"})
        }
        const cloudinaryImage = await cloudinary.uploader.upload(imageUrl.path)
        
        const {name,description,basePrice,capacity} = req.body
        const roomType = await prisma.roomType.create({
            data:{
                name,
                description,
                basePrice: Number(basePrice),
                capacity: Number(capacity),
                propertyId,
                images: [cloudinaryImage.secure_url]
            }
        })
        res.status(200).json(roomType)
    }catch(err){
        console.error(err)
        res.status(500).json({error:"Failed to create room type"})
    }
}

export const getRoomTypes = async (req:Request,res:Response) => {
    try{
        const properties = await prisma.property.findMany({
            where:{
              roomTypes:{
                some:{}
              }
            },
            select:{
                name:true,
                roomTypes:true
            }
        })
        res.status(200).json(properties)
    }catch(err){
        console.error(err)
        res.status(500).json({error:"Failed to get room types"})
    }
}

export  const getRoomTypesByTenantId = async (req:Request,res:Response) => {
    try{
        const tenantId = (req as any).user.id
        const properties = await prisma.property.findMany({
            where:{
              roomTypes:{
                some:{}
              },
              tenantId
            },
            select:{
                name:true,
                roomTypes:true
            }
        })
        res.status(200).json(properties)
    }catch(err){
        console.error(err)
        res.status(500).json({error:"Failed to get room types"})
    }
}

export const getRoomTypeCalendar = async (req:Request, res:Response) => {
    try {
        const { id } = req.params
        const { month } = req.query 
        
        if (!id) {
            return res.status(400).json({ error: "RoomType ID is required" })
        }

        const now = new Date()
        const targetMonth = month ? String(month) : `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
        const parts = targetMonth.split('-').map(Number)
        const year = parts[0] || now.getFullYear()
        const monthNum = parts[1] || (now.getMonth() + 1)
        
        const firstDay = new Date(year, monthNum - 1, 1)
        const lastDay = new Date(year, monthNum, 0) 
        
        const roomType = await prisma.roomType.findUnique({
            where: { id },
            include: {
                property: {
                    select: {
                        id: true,
                        name: true,
                        city: true
                    }
                },
                peakSeasonRate: {
                    where: {
                        AND: [
                            { startDate: { lte: lastDay } },
                            { endDate: { gte: firstDay } }
                        ]
                    }
                },
                rooms: {
                    include: {
                        roomAvailability: {
                            where: {
                                date: {
                                    gte: firstDay,
                                    lte: lastDay
                                },
                                isAvailable: false
                            }
                        }
                    }
                }
            }
        })

        if (!roomType) {
            return res.status(404).json({ error: "RoomType not found" })
        }

        const calendarData: {
            date: string;
            price: number;
            isPeakSeason: boolean;
            peakSeasonReason: string | null;
            isAvailable: boolean;
        }[] = []

        const basePriceNum = Number(roomType.basePrice)
        const daysInMonth = lastDay.getDate()

        for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = new Date(year, monthNum - 1, day)
            const dateStr = currentDate.toISOString().split('T')[0]

            const unavailableRoomIds = new Set<string>()
            roomType.rooms.forEach(room => {
                room.roomAvailability.forEach(avail => {
                    const availDate = new Date(avail.date).toISOString().split('T')[0]
                    if (availDate === dateStr) {
                        unavailableRoomIds.add(room.id)
                    }
                })
            })
            const isAvailable = unavailableRoomIds.size < roomType.rooms.length

            let dailyPrice = basePriceNum
            let isPeakSeason = false
            let peakSeasonReason: string | null = null
            let highestAdjustment = 0

            for (const rate of roomType.peakSeasonRate) {
                const rateStartDate = new Date(rate.startDate)
                const rateEndDate = new Date(rate.endDate)

                if (currentDate >= rateStartDate && currentDate <= rateEndDate) {
                    let adjustedPrice: number

                    if (rate.adjustmentType === 'PERCENTAGE') {
                        adjustedPrice = basePriceNum * (1 + Number(rate.adjustmentValue) / 100)
                    } else {
                        adjustedPrice = basePriceNum + Number(rate.adjustmentValue)
                    }

                    const adjustment = adjustedPrice - basePriceNum
                    if (adjustment > highestAdjustment) {
                        highestAdjustment = adjustment
                        dailyPrice = adjustedPrice
                        isPeakSeason = true
                        peakSeasonReason = rate.reason
                    }
                }
            }

            calendarData.push({
                date: dateStr as any,
                price: Math.round(dailyPrice),
                isPeakSeason,
                peakSeasonReason,
                isAvailable
            })
        }

        return res.status(200).json({
            roomType: {
                id: roomType.id,
                name: roomType.name,
                description: roomType.description,
                basePrice: Number(roomType.basePrice),
                capacity: roomType.capacity,
                images: roomType.images,
                property: roomType.property,
                totalRooms: roomType.rooms.length
            },
            month: targetMonth,
            calendarData
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: "Failed to get room type calendar" })
    }
}