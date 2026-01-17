import {prisma} from '../lib/prisma.js'
import type { Request,Response } from "express";

export const getPropertyCategories = async (req:Request,res:Response) => {
    try{
        const categories = await prisma.propertyCategory.findMany({
            orderBy:{ createdAt: 'asc' },
            include:{
                _count:{
                    select:{ properties: true }
                }
            }
        })
        res.status(200).json({ categories })
    }catch(err){
        console.error(err)
        res.status(500).json({error:"Failed to get property categories"})
    }
}

export const getTenantCategories = async (req:Request,res:Response) => {
    try{
        const tenantId = (req as any).user.id

        const categories = await prisma.propertyCategory.findMany({
            where:{ tenantId },
            orderBy:{ name: 'asc' },
            include:{
                _count:{
                    select:{ properties: true }
                },
                properties: {
                    select: { tenantId: true }
                }
            }
        })

        const categoriesWithOtherTenants = categories.map(category => {
            const otherTenantsCount = category.properties.filter(p => p.tenantId !== tenantId).length
            const { properties, ...categoryWithoutProperties } = category
            return {
                ...categoryWithoutProperties,
                otherTenantsCount
            }
        })

        res.status(200).json({ categories: categoriesWithOtherTenants })
    }catch(err){
        console.error(err)
        res.status(500).json({error:"Failed to get property categories"})
    }
}

export const getPublicPropertyCategories = async (req:Request,res:Response) => {
    try{
        const categories = await prisma.propertyCategory.findMany({
            where:{ tenantId: null },
            orderBy:{ name: 'asc' }
        })
        res.status(200).json({ categories })
    }catch(err){
        console.error(err)
        res.status(500).json({error:"Failed to get property categories"})
    }
}

export const getPropertyCategory = async (req:Request,res:Response) => {
    try{
        const id = req.params.id as string
        const category = await prisma.propertyCategory.findUnique({
            where:{ id },
            include:{
                _count:{
                    select:{ properties: true }
                }
            }
        })
        if(!category){
            return res.status(404).json({error:"Category not found"})
        }
        res.status(200).json({ category })
    }catch(err){
        console.error(err)
        res.status(500).json({error:"Failed to get property category"})
    }
}

export const createPropertyCategory = async (req:Request,res:Response) => {
    try{
        const tenantId = (req as any).user.id
        const { name, description } = req.body

        if(!name){
            return res.status(400).json({error:"Name is required"})
        }

        const existingCategory = await prisma.propertyCategory.findFirst({
            where:{ 
                name: { equals: name, mode: 'insensitive' },
                tenantId: tenantId
            }
        })

        if(existingCategory){
            return res.status(400).json({error:"Category with this name already exists"})
        }

        const category = await prisma.propertyCategory.create({
            data:{
                name,
                description: description || null,
                tenantId
            }
        })

        res.status(201).json({ category, message: "Category created successfully" })
    }catch(err){
        console.error(err)
        res.status(500).json({error:"Failed to create property category"})
    }
}

export const updatePropertyCategory = async (req:Request,res:Response) => {
    try{
        const tenantId = (req as any).user.id
        const id = req.params.id as string
        const { name, description } = req.body

        if(!name){
            return res.status(400).json({error:"Name is required"})
        }

        const existingCategory = await prisma.propertyCategory.findUnique({
            where:{ id }
        })

        if(!existingCategory){
            return res.status(404).json({error:"Category not found"})
        }

        if(existingCategory.tenantId !== tenantId){
            return res.status(403).json({error:"You can only edit your own categories"})
        }

        const duplicateCategory = await prisma.propertyCategory.findFirst({
            where:{ 
                name: { equals: name, mode: 'insensitive' },
                tenantId: tenantId,
                id: { not: id }
            }
        })

        if(duplicateCategory){
            return res.status(400).json({error:"Category with this name already exists"})
        }

        const otherTenantsUsingCategory = await prisma.property.count({
            where:{
                categoryId: id,
                tenantId: { not: tenantId }
            }
        })

        if(otherTenantsUsingCategory > 0){
            return res.status(400).json({error:`Cannot update category. ${otherTenantsUsingCategory} other tenant(s) are using this category.`})
        }

        const category = await prisma.propertyCategory.update({
            where:{ id },
            data:{
                name,
                description: description || null
            }
        })

        res.status(200).json({ category, message: "Category updated successfully" })
    }catch(err){
        console.error(err)
        res.status(500).json({error:"Failed to update property category"})
    }
}

export const deletePropertyCategory = async (req:Request,res:Response) => {
    try{
        const tenantId = (req as any).user.id
        const id = req.params.id as string

        const category = await prisma.propertyCategory.findUnique({
            where:{ id },
            include:{
                _count:{
                    select:{ properties: true }
                }
            }
        })

        if(!category){
            return res.status(404).json({error:"Category not found"})
        }

        if(category.tenantId !== tenantId){
            return res.status(403).json({error:"You can only delete your own categories"})
        }

        const otherTenantsUsingCategory = await prisma.property.count({
            where:{
                categoryId: id,
                tenantId: { not: tenantId }
            }
        })

        if(otherTenantsUsingCategory > 0){
            return res.status(400).json({error:`Cannot delete category. ${otherTenantsUsingCategory} other tenant(s) are using this category.`})
        }

        if(category._count.properties > 0){
            return res.status(400).json({error:`Cannot delete category. It has ${category._count.properties} properties attached.`})
        }

        await prisma.propertyCategory.delete({
            where:{ id }
        })

        res.status(200).json({ message: "Category deleted successfully" })
    }catch(err){
        console.error(err)
        res.status(500).json({error:"Failed to delete property category"})
    }
}
