import { prisma } from '../lib/prisma.js';
import { cloudinary } from '../configs/cloudinary.config.js';
import { verifyAuthToken } from '../utils/verifyAuthToken.js';
export const fetchCreatePropertyPage = async (req, res) => {
    try {
        const propertyCategories = await prisma.propertyCategory.findMany({
            select: {
                name: true,
                description: true,
                id: true
            }
        });
        return res.status(200).json({
            success: true,
            result: propertyCategories
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err
        });
    }
};
export const createProperty = async (req, res) => {
    try {
        const imageUrl = req.file;
        const tenantId = req.user.id;
        console.log(tenantId);
        console.log('1');
        if (!imageUrl) {
            return res.status(400).json({ message: "Image is required" });
        }
        // const cloudinaryImages = await Promise.all(images?.map((image:File) => {
        //     return cloudinary.uploader.upload(image.path)
        // }))
        const cloudinaryImage = await cloudinary.uploader.upload(imageUrl.path);
        console.log(req.body);
        const { name, description, city, address, categoryId } = req.body;
        console.log(name, description, city, address, categoryId);
        const property = await prisma.property.create({
            data: {
                name,
                description,
                city,
                address,
                categoryId,
                tenantId,
                images: [cloudinaryImage.secure_url]
            }
        });
        return res.status(200).json({
            success: true,
            result: property
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err,
        });
    }
};
export const dashboardProperties = async (req, res) => {
    try {
        const userId = req.user.id;
        const properties = await prisma.property.findMany({
            where: {
                tenantId: userId
            },
            select: {
                id: true,
                name: true,
                description: true,
                city: true,
                address: true,
                category: true,
                images: true,
                roomTypes: true,
            }
        });
        return res.status(200).json({
            success: true,
            result: properties
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err,
        });
    }
};
export const getAllProperties = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const properties = await prisma.property.findMany({
            include: {
                category: true
            },
            skip,
            take: Number(limit),
        });
        return res.status(200).json({
            success: true,
            result: properties
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err,
        });
    }
};
export const getPropertyDetail = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Property Id Required" });
        }
        const property = await prisma.property.findUnique({
            where: { id },
            include: {
                roomTypes: {
                    include: {
                        rooms: true
                    }
                }
            }
        });
        return res.status(200).json({ property });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err,
        });
    }
};
export const getSearchInfo = async (req, res) => {
    try {
        const cities = await prisma.property.groupBy({
            by: ['city'],
            _count: {
                city: true,
            },
            orderBy: {
                _count: {
                    city: 'desc',
                },
            }
        });
        const categories = await prisma.propertyCategory.findMany({
            select: {
                name: true,
                id: true,
            }
        });
        return res.status(200).json({ cities, categories });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err,
        });
    }
};
export const filterAllProperties = async (req, res) => {
    try {
        const { page = 1, limit = 10, city = "", categoryId = "", checkIn = "", checkOut = "", guests = 1 } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const where = {
            AND: [{
                    roomTypes: {
                        some: {
                            capacity: {
                                gte: Number(guests)
                            }
                        }
                    }
                }],
        };
        if (city) {
            where.AND.push({
                city: {
                    contains: String(city), mode: 'insensitive'
                }
            });
        }
        if (categoryId) {
            where.AND.push({
                categoryId: String(categoryId)
            });
        }
        const properties = await prisma.property.findMany({
            include: {
                category: true,
                roomTypes: {
                    include: {
                        rooms: true
                    },
                    orderBy: {
                        basePrice: 'asc'
                    },
                    where: {
                        capacity: {
                            gte: Number(guests)
                        }
                    }
                }
            },
            skip,
            take: Number(limit),
            where,
        });
        return res.status(200).json({
            success: true,
            result: properties,
            pagination: {
                currentPage: Number(page),
                totalPages: Math.ceil((properties.length / Number(limit))),
                totalData: properties.length,
                limit: Number(limit),
            },
            filterData: {
                city,
                categoryId,
                checkIn,
                checkOut,
                guests,
            }
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err,
        });
    }
};
//# sourceMappingURL=property.controllers.js.map