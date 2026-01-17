import { prisma } from '../lib/prisma.js';

interface PeakSeasonRate {
  id: string;
  roomTypeId: string;
  startDate: Date;
  endDate: Date;
  reason: string | null;
  adjustmentType: 'PERCENTAGE' | 'NOMINAL';
  adjustmentValue: number | { toNumber(): number };
}

interface PriceBreakdownItem {
  date: string;
  price: number;
  isPeakSeason: boolean;
  peakSeasonReason: string | null;
}

interface CalculateFinalPriceResult {
  finalPrice: number;
  nights: number;
  priceBreakdown: PriceBreakdownItem[];
}

export async function calculateFinalPrice(
  roomTypeId: string,
  basePrice: number | { toNumber(): number },
  checkIn: string,
  checkOut: string
): Promise<CalculateFinalPriceResult> {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  
  const nights = Math.ceil(
    (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  
  if (nights <= 0) {
    return {
      finalPrice: 0,
      nights: 0,
      priceBreakdown: []
    };
  }

  const peakSeasonRates = await prisma.peakSeasonRate.findMany({
    where: {
      roomTypeId,
      AND: [
        { startDate: { lte: checkOutDate } },
        { endDate: { gte: checkInDate } }
      ]
    }
  });

  const basePriceNum = typeof basePrice === 'number' ? basePrice : Number(basePrice);
  let totalPrice = 0;
  const priceBreakdown: CalculateFinalPriceResult['priceBreakdown'] = [];

  for (let i = 0; i < nights; i++) {
    const currentDate = new Date(checkInDate);
    currentDate.setDate(currentDate.getDate() + i);
    
    let dailyPrice = basePriceNum;
    let isPeakSeason = false;
    let peakSeasonReason: string | null = null;
    let highestAdjustment = 0;

    for (const rate of peakSeasonRates) {
      const rateStartDate = new Date(rate.startDate);
      const rateEndDate = new Date(rate.endDate);
      
      if (currentDate >= rateStartDate && currentDate <= rateEndDate) {
        let adjustedPrice: number;
        
        if (rate.adjustmentType === 'PERCENTAGE') {
          adjustedPrice = basePriceNum * (1 + Number(rate.adjustmentValue) / 100);
        } else {
          adjustedPrice = basePriceNum + Number(rate.adjustmentValue);
        }
        
        const adjustment = adjustedPrice - basePriceNum;
        if (adjustment > highestAdjustment) {
          highestAdjustment = adjustment;
          dailyPrice = adjustedPrice;
          isPeakSeason = true;
          peakSeasonReason = rate.reason ?? null;
        }
      }
    }

    totalPrice += dailyPrice;
    priceBreakdown.push({
      date: (currentDate as any).toISOString().split('T')[0],
      price: Math.round(dailyPrice),
      isPeakSeason,
      peakSeasonReason
    });
  }

  return {
    finalPrice: Math.round(totalPrice),
    nights,
    priceBreakdown
  };
}

// Synchronous version: menghitung harga final dengan peak season rates yang sudah di-fetch
export function calculateFinalPriceSync(
  basePrice: number | { toNumber(): number },
  checkIn: string,
  checkOut: string,
  peakSeasonRates: PeakSeasonRate[]
): CalculateFinalPriceResult {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  
  const nights = Math.ceil(
    (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  
  if (nights <= 0) {
    return {
      finalPrice: 0,
      nights: 0,
      priceBreakdown: []
    };
  }

  const basePriceNum = typeof basePrice === 'number' ? basePrice : Number(basePrice);
  let totalPrice = 0;
  const priceBreakdown: CalculateFinalPriceResult['priceBreakdown'] = [];

  for (let i = 0; i < nights; i++) {
    const currentDate = new Date(checkInDate);
    currentDate.setDate(currentDate.getDate() + i);
    
    let dailyPrice = basePriceNum;
    let isPeakSeason = false;
    let peakSeasonReason: string | null = null;
    let highestAdjustment = 0;

    for (const rate of peakSeasonRates) {
      const rateStartDate = new Date(rate.startDate);
      const rateEndDate = new Date(rate.endDate);
      
      if (currentDate >= rateStartDate && currentDate <= rateEndDate) {
        let adjustedPrice: number;
        
        if (rate.adjustmentType === 'PERCENTAGE') {
          adjustedPrice = basePriceNum * (1 + Number(rate.adjustmentValue) / 100);
        } else {
          adjustedPrice = basePriceNum + Number(rate.adjustmentValue);
        }
        
        const adjustment = adjustedPrice - basePriceNum;
        if (adjustment > highestAdjustment) {
          highestAdjustment = adjustment;
          dailyPrice = adjustedPrice;
          isPeakSeason = true;
          peakSeasonReason = rate.reason ?? null;
        }
      }
    }

    totalPrice += dailyPrice;
    priceBreakdown.push({
      date: (currentDate as any).toISOString().split('T')[0],
      price: Math.round(dailyPrice),
      isPeakSeason,
      peakSeasonReason
    });
  }

  return {
    finalPrice: Math.round(totalPrice),
    nights,
    priceBreakdown
  };
}
