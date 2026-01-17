import { prisma } from '../lib/prisma.js';
import { cloudinary } from '../configs/cloudinary.config.js';
export const createRoomType = async (req, res) => {
    try {
        const imageUrl = req.file;
        const { propertyId } = req.params; //diliat dulu paramsnya apa
        if (!imageUrl) {
            return res.status(400).json({ error: "Image is required" });
        }
        if (!propertyId) {
            return res.status(400).json({ error: "Property ID is required" });
        }
        const cloudinaryImage = await cloudinary.uploader.upload(imageUrl.path);
        const { name, description, basePrice, capacity } = req.body;
        const roomType = await prisma.roomType.create({
            data: {
                name,
                description,
                basePrice: Number(basePrice),
                capacity: Number(capacity),
                propertyId,
                images: [cloudinaryImage.secure_url]
            }
        });
        res.status(200).json(roomType);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create room type" });
    }
};
export const getRoomTypes = async (req, res) => {
    try {
        const properties = await prisma.property.findMany({
            where: {
                roomTypes: {
                    some: {}
                }
            },
            select: {
                name: true,
                roomTypes: true
            }
        });
        res.status(200).json(properties);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to get room types" });
    }
};
export const getRoomTypesByTenantId = async (req, res) => {
    try {
        const tenantId = req.user.id;
        const properties = await prisma.property.findMany({
            where: {
                roomTypes: {
                    some: {}
                },
                tenantId
            },
            select: {
                name: true,
                roomTypes: true
            }
        });
        res.status(200).json(properties);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to get room types" });
    }
};
//# sourceMappingURL=roomType.controllers.js.map