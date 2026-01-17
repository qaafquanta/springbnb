import { prisma } from '../lib/prisma.js';
export const createPeakSeasonRate = async (req, res) => {
    try {
        const { roomTypeIds, startDate, endDate, reason, adjustmentType, adjustmentValue } = req.body;
        const result = await prisma.peakSeasonRate.createMany({
            data: roomTypeIds.map((roomTypeId) => ({
                roomTypeId,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                reason,
                adjustmentType,
                adjustmentValue: Number(adjustmentValue)
            }))
        });
        res.status(201).json({ message: "Peak season rate created successfully", result });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to create peak season rate" });
    }
};
export const getPeakSeasonRates = async (req, res) => {
    try {
        const tenantId = req.user.id;
        const peakSeasonRates = await prisma.peakSeasonRate.findMany({
            where: {
                roomType: {
                    property: {
                        tenantId
                    }
                }
            },
            include: {
                roomType: {
                    select: {
                        name: true,
                        property: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });
        res.status(200).json(peakSeasonRates);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to get peak season rates" });
    }
};
//# sourceMappingURL=peak-season-rate.controller.js.map