import {prisma} from '../lib/prisma.js'
import type { Request,Response } from "express";

export const getRoomsByRoomTypeId = async (req:Request,res:Response) => {
    try{
        const {roomTypeId} = req.params
        if(!roomTypeId){
            return res.status(400).json({error:"Room Type ID is required"})
        }
        const rooms = await prisma.room.findMany({
            where:{
                roomTypeId
            },
            orderBy:{
                roomNumber:'asc'
            }
        })
        res.status(200).json({rooms})
    }catch(err){
        console.error(err)
        res.status(500).json({error:"Failed to get rooms"})
    }
}

export const createRoom = async (req:Request,res:Response) => {
    try{
        const {roomTypeId} = req.params
        const {roomNumber} = req.body
        if(!roomTypeId){
            return res.status(400).json({error:"Room Type ID is required"})
        }
        const data: {roomTypeId: string, roomNumber?: number} = { roomTypeId }
        if(roomNumber){
            data.roomNumber = Number(roomNumber)
        }
        const room = await prisma.room.create({
            data
        })
        res.status(201).json({message:"Room created successfully",room})
    }catch(err){
        console.error(err)
        res.status(500).json({error:"Failed to create room"})
    }
}

export const updateRoom = async (req:Request,res:Response) => {
    try{
        const {roomId} = req.params
        const {roomNumber} = req.body
        if(!roomId){
            return res.status(400).json({error:"Room ID is required"})
        }
        if(!roomNumber){
            return res.status(400).json({error:"Room Number is required"})
        }
        const room = await prisma.room.update({
            where:{
                id:roomId
            },
            data:{
                roomNumber: Number(roomNumber)
            }
        })
        res.status(200).json({message:"Room updated successfully",room})
    }catch(err){
        console.error(err)
        res.status(500).json({error:"Failed to update room"})
    }
}

export const deleteRoom = async (req:Request,res:Response) => {
    try{
        const {roomId} = req.params
        if(!roomId){
            return res.status(400).json({error:"Room ID is required"})
        }
        await prisma.room.delete({
            where:{
                id:roomId
            }
        })
        res.status(200).json({message:"Room deleted successfully"})
    }catch(err){
        console.error(err)
        res.status(500).json({error:"Failed to delete room"})
    }
}
