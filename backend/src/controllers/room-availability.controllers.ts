import {prisma} from '../lib/prisma.js'
import type { Request,Response } from "express";

export const getRoomAvailability = async (req:Request,res:Response) => {
    try{
        const {roomId} = req.params
        if(!roomId){
            return res.status(400).json({error:"Room ID is required"})
        }
        const availability = await prisma.roomAvailability.findMany({
            where:{
                roomId
            },
            orderBy:{
                date:'asc'
            }
        })
        res.status(200).json({availability})
    }catch(err){
        console.error(err)
        res.status(500).json({error:"Failed to get room availability"})
    }
}

export const getUnavailableDatesByTenant = async (req:Request,res:Response) => {
    try{
        const tenantId = (req as any).user.id
        const unavailable = await prisma.roomAvailability.findMany({
            where:{
                isAvailable: false,
                room:{
                    roomType:{
                        property:{
                            tenantId
                        }
                    }
                }
            },
            include:{
                room:{
                    select:{
                        roomNumber: true,
                        roomType:{
                            select:{
                                name: true,
                                property:{
                                    select:{
                                        name: true
                                    }
                                }
                            }
                        }
                    }
                }
            },
            orderBy:{
                date:'asc'
            }
        })
        res.status(200).json({unavailable})
    }catch(err){
        console.error(err)
        res.status(500).json({error:"Failed to get unavailable dates"})
    }
}

export const getRoomsByTenant = async (req:Request,res:Response) => {
    try{
        const tenantId = (req as any).user.id
        const properties = await prisma.property.findMany({
            where:{
                tenantId
            },
            select:{
                id: true,
                name: true,
                roomTypes:{
                    select:{
                        id: true,
                        name: true,
                        rooms:{
                            select:{
                                id: true,
                                roomNumber: true
                            }
                        }
                    }
                }
            }
        })
        res.status(200).json({properties})
    }catch(err){
        console.error(err)
        res.status(500).json({error:"Failed to get rooms"})
    }
}

export const createUnavailability = async (req:Request,res:Response) => {
    try{
        const {roomIds, startDate, endDate, reason} = req.body
        
        if(!roomIds || !Array.isArray(roomIds) || roomIds.length === 0){
            return res.status(400).json({error:"Room IDs are required"})
        }
        if(!startDate || !endDate){
            return res.status(400).json({error:"Start date and end date are required"})
        }

        const start = new Date(startDate)
        const end = new Date(endDate)
        
        const dates: Date[] = []
        const current = new Date(start)
        while(current <= end){
            dates.push(new Date(current))
            current.setDate(current.getDate() + 1)
        }

        let createdCount = 0
        for(const roomId of roomIds){
            for(const date of dates){
                const existing = await prisma.roomAvailability.findFirst({
                    where:{
                        roomId,
                        date
                    }
                })
                
                if(existing){
                    await prisma.roomAvailability.update({
                        where:{ id: existing.id },
                        data:{
                            isAvailable: false,
                            reason: reason || null
                        }
                    })
                } else {
                    await prisma.roomAvailability.create({
                        data:{
                            roomId,
                            date,
                            reason: reason || null,
                            isAvailable: false
                        }
                    })
                }
                createdCount++
            }
        }

        res.status(201).json({message:"Unavailability created successfully", count: createdCount})
    }catch(err){
        console.error(err)
        res.status(500).json({error:"Failed to create unavailability"})
    }
}

export const deleteUnavailability = async (req:Request,res:Response) => {
    try{
        const {id} = req.params
        if(!id){
            return res.status(400).json({error:"Unavailability ID is required"})
        }
        await prisma.roomAvailability.delete({
            where:{
                id
            }
        })
        res.status(200).json({message:"Unavailability deleted successfully"})
    }catch(err){
        console.error(err)
        res.status(500).json({error:"Failed to delete unavailability"})
    }
}

export const deleteUnavailabilityRange = async (req:Request,res:Response) => {
    try{
        const {roomId, startDate, endDate} = req.body
        
        if(!roomId){
            return res.status(400).json({error:"Room ID is required"})
        }
        if(!startDate || !endDate){
            return res.status(400).json({error:"Start date and end date are required"})
        }

        const start = new Date(startDate)
        const end = new Date(endDate)

        const result = await prisma.roomAvailability.deleteMany({
            where:{
                roomId,
                date:{
                    gte: start,
                    lte: end
                },
                isAvailable: false
            }
        })

        res.status(200).json({message:"Unavailability deleted successfully", count: result.count})
    }catch(err){
        console.error(err)
        res.status(500).json({error:"Failed to delete unavailability"})
    }
}
