'use client'
import { useEffect, useState, Suspense } from "react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaLocationDot, FaUsers, FaArrowLeft } from "react-icons/fa6";

type Params = Promise<{
    id: string;
 }>;

type Room = {
    id: string;
    roomNumber: number;
    roomTypeId: string;
}

type RoomType = {
    id: string;
    name: string;
    description: string;
    basePrice: number;
    finalPrice: number;
    nights: number;
    capacity: number;
    images: string[];
    rooms: Room[];
}

type Property = {
    id: string;
    name: string;
    description: string;
    city: string;
    address: string;
    images: string[];
    category: {
        id: string;
        name: string;
    };
    roomTypes: RoomType[];
}

function PropertyDetailContent({ id }: { id: string }) {
    const searchParams = useSearchParams()
    const [property, setProperty] = useState<Property | null>(null)
    const [loading, setLoading] = useState(true)
    const [selectedImage, setSelectedImage] = useState(0)

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const checkIn = searchParams.get('checkIn') || ''
                const checkOut = searchParams.get('checkOut') || ''
                const queryParams = new URLSearchParams()
                if (checkIn) queryParams.set('checkIn', checkIn)
                if (checkOut) queryParams.set('checkOut', checkOut)
                const queryString = queryParams.toString() ? `?${queryParams.toString()}` : ''
                
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/property/${id}${queryString}`)
                const result = await response.json()
                console.log(result)
                setProperty(result.property)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchProperty()
    }, [id, searchParams])

    if (loading) {
        return (
            <div className="flex flex-col min-h-screen font-sans text-neutral-800 bg-white">
                <div className="pt-24 pb-20">
                    <div className="max-w-6xl mx-auto px-4 md:px-8">
                        <div className="animate-pulse">
                            <div className="h-8 bg-neutral-200 rounded w-1/3 mb-6"></div>
                            <div className="h-96 bg-neutral-200 rounded-2xl mb-8"></div>
                            <div className="h-6 bg-neutral-200 rounded w-1/2 mb-4"></div>
                            <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!property) {
        return (
            <div className="flex flex-col min-h-screen font-sans text-neutral-800 bg-white">
                <div className="pt-24 pb-20">
                    <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
                        <h1 className="text-2xl font-semibold text-neutral-800">Property not found</h1>
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
                        href="/search" 
                        className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-6 transition"
                    >
                        <FaArrowLeft size={14} />
                        <span className="text-sm font-medium">Back</span>
                    </Link>

                    <h1 className="text-2xl md:text-3xl font-semibold text-neutral-900 mb-2">
                        {property.name}
                    </h1>
                    
                    <div className="flex flex-wrap items-center gap-3 text-neutral-600 mb-6">
                        <div className="flex items-center gap-1">
                            <FaLocationDot size={14} className="text-rose-500" />
                            <span className="text-sm">{property.address}, {property.city}</span>
                        </div>
                        <span className="text-neutral-300">•</span>
                        <span className="px-3 py-1 bg-neutral-100 rounded-full text-sm font-medium">
                            {property.category?.name}
                        </span>
                    </div>

                    <div className="mb-10">
                        <div className="relative aspect-[16/9] md:aspect-[2/1] rounded-2xl overflow-hidden mb-3">
                            <Image
                                fill
                                src={property.images[selectedImage] || property.images[0]}
                                alt={property.name}
                                className="object-cover"
                            />
                        </div>
                        {property.images.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {property.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition ${
                                            selectedImage === idx ? 'border-rose-500' : 'border-transparent hover:border-neutral-300'
                                        }`}
                                    >
                                        <Image fill src={img} alt={`${property.name} ${idx + 1}`} className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {property.description && (
                        <div className="mb-10 pb-8 border-b border-neutral-200">
                            <h2 className="text-xl font-semibold text-neutral-900 mb-3">About this place</h2>
                            <p className="text-neutral-600 leading-relaxed">{property.description}</p>
                        </div>
                    )}

                    <div>
                        <h2 className="text-xl font-semibold text-neutral-900 mb-6">
                            Room Types
                        </h2>

                        {property.roomTypes.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {property.roomTypes.map((roomType) => (
                                    <div 
                                        key={roomType.id} 
                                        className="bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-lg transition duration-300"
                                    >
                                        <div className="relative aspect-[4/3] overflow-hidden">
                                            <Image
                                                fill
                                                src={roomType.images[0] || '/placeholder-room.jpg'}
                                                alt={roomType.name}
                                                className="object-cover hover:scale-105 transition duration-300"
                                            />
                                        </div>

                                        <div className="p-5">
                                            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                                                {roomType.name}
                                            </h3>
                                            
                                            {roomType.description && (
                                                <p className="text-neutral-500 text-sm mb-4 line-clamp-2">
                                                    {roomType.description}
                                                </p>
                                            )}

                                            <div className="flex items-center gap-2 mb-4">
                                                <div className="flex items-center gap-1 px-3 py-1 bg-neutral-100 rounded-full">
                                                    <FaUsers size={12} className="text-neutral-600" />
                                                    <span className="text-sm text-neutral-700 font-medium">
                                                        {roomType.capacity} guests
                                                    </span>
                                                </div>
                                                <div className="px-3 py-1 bg-green-50 rounded-full">
                                                    <span className="text-sm text-green-700 font-medium">
                                                        {roomType.rooms.length} rooms available
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-end justify-between pt-4 border-t border-neutral-100">
                                                <div>
                                                    <span className="text-xl font-bold text-neutral-900">
                                                        Rp{Number(roomType.finalPrice).toLocaleString("en-US")}
                                                    </span>
                                                    <span className="text-neutral-500 text-sm"> for {roomType.nights} night{roomType.nights > 1 ? 's' : ''}</span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Link 
                                                        href={`/room-type/${roomType.id}`}
                                                        className="px-4 py-2.5 border border-neutral-300 text-neutral-700 rounded-lg font-medium text-sm hover:bg-neutral-50 transition"
                                                    >
                                                        View Calendar
                                                    </Link>
                                                    <button className="px-5 py-2.5 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-lg font-semibold text-sm hover:from-rose-600 hover:to-rose-700 transition">
                                                        Book
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-neutral-50 rounded-2xl">
                                <p className="text-neutral-500">No room types available</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function PropertyDetail({ params }: { params: Params }) {
    const { id } = React.use(params)
    return (
        <Suspense fallback={
            <div className="flex flex-col min-h-screen font-sans text-neutral-800 bg-white">
                <div className="pt-24 pb-20">
                    <div className="max-w-6xl mx-auto px-4 md:px-8">
                        <div className="animate-pulse">
                            <div className="h-8 bg-neutral-200 rounded w-1/3 mb-6"></div>
                            <div className="h-96 bg-neutral-200 rounded-2xl mb-8"></div>
                            <div className="h-6 bg-neutral-200 rounded w-1/2 mb-4"></div>
                            <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                        </div>
                    </div>
                </div>
            </div>
        }>
            <PropertyDetailContent id={id} />
        </Suspense>
    )
}
