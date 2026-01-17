'use client'
import { useEffect, useState, useMemo } from "react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaUsers } from "react-icons/fa6";
import RoomTypeCalendar from "@/components/room-type/RoomTypeCalendar";

type Params = Promise<{
    id: string;
}>;

type CalendarDay = {
    date: string;
    price: number;
    isPeakSeason: boolean;
    peakSeasonReason: string | null;
    isAvailable: boolean;
}

type RoomType = {
    id: string;
    name: string;
    description: string;
    basePrice: number;
    capacity: number;
    images: string[];
    totalRooms: number;
    property: {
        id: string;
        name: string;
        city: string;
    };
}

export default function RoomTypeDetail({ params }: { params: Params }) {
    const { id } = React.use(params)
    const [roomType, setRoomType] = useState<RoomType | null>(null)
    const [calendarData, setCalendarData] = useState<CalendarDay[]>([])
    const [loading, setLoading] = useState(true)

    const fetchCalendar = async (month?: string) => {
        try {
            setLoading(true)
            const queryParam = month ? `?month=${month}` : ''
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/room-type/${id}/calendar${queryParam}`)
            const result = await response.json()
            setRoomType(result.roomType)
            setCalendarData(result.calendarData)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCalendar()
    }, [id])

    const formatPrice = (price: number, short = false) => {
        if (short) {
            if (price >= 1000000) {
                return `${(price / 1000000).toFixed(1)}M`
            } else if (price >= 1000) {
                return `${Math.round(price / 1000)}K`
            }
            return price.toString()
        }
        return `Rp${price.toLocaleString('id-ID')}`
    }

    const handleMonthChange = (month: string) => {
        fetchCalendar(month)
    }

    if (loading && !roomType) {
        return (
            <div className="flex flex-col min-h-screen font-sans text-neutral-800 bg-white">
                <div className="pt-24 pb-20">
                    <div className="max-w-6xl mx-auto px-4 md:px-8">
                        <div className="animate-pulse">
                            <div className="h-8 bg-neutral-200 rounded w-1/3 mb-6"></div>
                            <div className="h-64 bg-neutral-200 rounded-2xl mb-8"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!roomType) {
        return (
            <div className="flex flex-col min-h-screen font-sans text-neutral-800 bg-white">
                <div className="pt-24 pb-20">
                    <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
                        <h1 className="text-2xl font-semibold text-neutral-800">Room type not found</h1>
                        <Link href="/search" className="mt-4 inline-block text-rose-500 hover:underline">
                            ← Back to search
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-screen font-sans text-neutral-800 bg-white">
            <div className="pt-24 pb-20">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <Link 
                        href={`/property/${roomType.property.id}`}
                        className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-6 transition"
                    >
                        <FaArrowLeft size={14} />
                        <span className="text-sm font-medium">Back to {roomType.property.name}</span>
                    </Link>

                    <div className="flex flex-col md:flex-row gap-6 mb-8">
                        <div className="relative w-full md:w-80 aspect-[4/3] rounded-2xl overflow-hidden">
                            <Image
                                fill
                                src={roomType.images[0] || '/placeholder-room.jpg'}
                                alt={roomType.name}
                                className="object-cover"
                            />
                        </div>

                        <div className="flex-1">
                            <h1 className="text-2xl md:text-3xl font-semibold text-neutral-900 mb-2">
                                {roomType.name}
                            </h1>
                            <p className="text-neutral-600 mb-4">{roomType.property.name} • {roomType.property.city}</p>
                            
                            <div className="flex flex-wrap gap-3 mb-4">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-100 rounded-full">
                                    <FaUsers size={14} className="text-neutral-600" />
                                    <span className="text-sm text-neutral-700 font-medium">{roomType.capacity} guests</span>
                                </div>
                                <div className="px-3 py-1.5 bg-green-50 rounded-full">
                                    <span className="text-sm text-green-700 font-medium">{roomType.totalRooms} rooms</span>
                                </div>
                            </div>

                            <p className="text-lg font-semibold text-neutral-900">
                                Base Price: <span className="text-rose-500">{formatPrice(roomType.basePrice)}</span>
                                <span className="text-neutral-500 text-sm font-normal"> / night</span>
                            </p>

                            {roomType.description && (
                                <p className="text-neutral-500 mt-3">{roomType.description}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-white border border-neutral-300"></div>
                            <span className="text-neutral-600">Normal</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-red-100 border border-red-300"></div>
                            <span className="text-neutral-600">Peak Season</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-neutral-300 border border-neutral-400"></div>
                            <span className="text-neutral-600">Unavailable</span>
                        </div>
                    </div>

                    <RoomTypeCalendar 
                        calendarData={calendarData} 
                        loading={loading}
                        onMonthChange={handleMonthChange}
                    />
                </div>
            </div>
        </div>
    )
}
