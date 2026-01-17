'use client';

import { FaHouse, FaArrowRight } from 'react-icons/fa6';
import Link from 'next/link';
import Image from 'next/image';

type RecentProperty = {
    id: string
    name: string
    city: string
    images: string[]
    createdAt: string
    _count: {
        roomTypes: number
    }
}

interface RecentPropertiesProps {
    properties: RecentProperty[];
}

const RecentProperties = ({ properties }: RecentPropertiesProps) => {
    return (
        <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden h-full">
            <div className="flex justify-between items-center px-5 py-4">
                <h2 className="font-semibold text-lg text-neutral-800">Recent Properties</h2>
                <Link href="/dashboard/properties" className="text-rose-500 text-sm font-medium flex items-center gap-1 hover:underline">
                    View all <FaArrowRight size={12} />
                </Link>
            </div>
            <div className="divide-y divide-neutral-50">
                {properties.length > 0 ? (
                    properties.map((property) => (
                        <Link
                            key={property.id}
                            href={`/dashboard/properties/${property.id}`}
                            className="flex items-center gap-4 px-5 py-3 hover:bg-neutral-50 transition"
                        >
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0">
                                {property.images && property.images[0] ? (
                                    <Image
                                        src={property.images[0]}
                                        alt={property.name}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <FaHouse size={16} className="text-neutral-400" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-neutral-800 truncate text-sm">{property.name}</p>
                                <p className="text-xs text-neutral-500">{property.city}</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                                <p className="text-sm font-semibold text-neutral-700">{property._count.roomTypes}</p>
                                <p className="text-[10px] text-neutral-400">room types</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="px-5 py-8 text-center">
                        <FaHouse size={28} className="mx-auto text-neutral-300 mb-2" />
                        <p className="text-neutral-500 text-sm">No properties yet</p>
                        <Link href="/dashboard/create-property" className="text-rose-500 text-sm font-medium hover:underline">
                            Create your first property
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecentProperties;
