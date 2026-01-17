import {prisma} from '../lib/prisma.js'
import type { Request,Response } from "express";

export const getDashboardStats = async (req:Request,res:Response) => {
    try{
        const tenantId = (req as any).user.id

        const totalProperties = await prisma.property.count({
            where:{ tenantId }
        })

        const totalRoomTypes = await prisma.roomType.count({
            where:{
                property:{ tenantId }
            }
        })

        const totalRooms = await prisma.room.count({
            where:{
                roomType:{
                    property:{ tenantId }
                }
            }
        })

        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)

        const unavailableToday = await prisma.roomAvailability.count({
            where:{
                isAvailable: false,
                date:{
                    gte: today,
                    lt: tomorrow
                },
                room:{
                    roomType:{
                        property:{ tenantId }
                    }
                }
            }
        })

        const totalPeakSeasonRates = await prisma.peakSeasonRate.count({
            where:{
                roomType:{
                    property:{ tenantId }
                }
            }
        })

        const activePeakSeasonRates = await prisma.peakSeasonRate.count({
            where:{
                startDate:{ lte: today },
                endDate:{ gte: today },
                roomType:{
                    property:{ tenantId }
                }
            }
        })

        const recentProperties = await prisma.property.findMany({
            where:{ tenantId },
            take: 5,
            orderBy:{ createdAt: 'desc' },
            select:{
                id: true,
                name: true,
                city: true,
                images: true,
                createdAt: true,
                _count:{
                    select:{
                        roomTypes: true
                    }
                }
            }
        })

        const endDate = new Date(today)
        endDate.setDate(endDate.getDate() + 60)

        const unavailableRecords = await prisma.roomAvailability.findMany({
            where:{
                isAvailable: false,
                date:{
                    gte: today,
                    lte: endDate
                },
                room:{
                    roomType:{
                        property:{ tenantId }
                    }
                }
            },
            select:{
                date: true
            }
        })

        const unavailableByDate: Record<string, number> = {}
        unavailableRecords.forEach(record => {
            const dateKey = new Date(record.date).toISOString().split('T')[0] as string
            unavailableByDate[dateKey] = (unavailableByDate[dateKey] || 0) + 1
        })

        const calendarAvailability: { date: string; available: number; total: number }[] = []
        const currentDate = new Date(today)
        while (currentDate <= endDate) {
            const dateKey = currentDate.toISOString().split('T')[0] as string
            const unavailable = unavailableByDate[dateKey] || 0
            calendarAvailability.push({
                date: dateKey,
                available: totalRooms - unavailable,
                total: totalRooms
            })
            currentDate.setDate(currentDate.getDate() + 1)
        }

        res.status(200).json({
            stats:{
                totalProperties,
                totalRoomTypes,
                totalRooms,
                unavailableToday,
                availableToday: totalRooms - unavailableToday,
                totalPeakSeasonRates,
                activePeakSeasonRates
            },
            recentProperties,
            calendarAvailability
        })
    }catch(err){
        console.error(err)
        res.status(500).json({error:"Failed to get dashboard stats"})
    }
}

