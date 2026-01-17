'use client';

import { FaHouse, FaBed, FaDoorOpen, FaCalendarXmark, FaCalendarDays, FaChartLine } from "react-icons/fa6"
import Link from "next/link"

type Stats = {
    totalProperties: number
    totalRoomTypes: number
    totalRooms: number
    unavailableToday: number
    availableToday: number
    totalPeakSeasonRates: number
    activePeakSeasonRates: number
}

interface DashboardStatsProps {
    stats: Stats | null;
}

const DashboardStats = ({ stats }: DashboardStatsProps) => {
    const statCards = [
        {
            label: "Total Properties",
            value: stats?.totalProperties || 0,
            icon: FaHouse,
            color: "bg-rose-500",
            lightColor: "bg-rose-50",
            textColor: "text-rose-600",
            href: "/dashboard/properties"
        },
        {
            label: "Room Types",
            value: stats?.totalRoomTypes || 0,
            icon: FaBed,
            color: "bg-blue-500",
            lightColor: "bg-blue-50",
            textColor: "text-blue-600",
            href: "/dashboard/properties"
        },
        {
            label: "Total Rooms",
            value: stats?.totalRooms || 0,
            icon: FaDoorOpen,
            color: "bg-emerald-500",
            lightColor: "bg-emerald-50",
            textColor: "text-emerald-600",
            href: "/dashboard/rooms"
        },
        {
            label: "Available Today",
            value: stats?.availableToday || 0,
            icon: FaChartLine,
            color: "bg-violet-500",
            lightColor: "bg-violet-50",
            textColor: "text-violet-600",
            href: "/dashboard/room-availability"
        },
        {
            label: "Unavailable Today",
            value: stats?.unavailableToday || 0,
            icon: FaCalendarXmark,
            color: "bg-amber-500",
            lightColor: "bg-amber-50",
            textColor: "text-amber-600",
            href: "/dashboard/room-availability"
        },
        {
            label: "Active Peak Rates",
            value: stats?.activePeakSeasonRates || 0,
            icon: FaCalendarDays,
            color: "bg-pink-500",
            lightColor: "bg-pink-50",
            textColor: "text-pink-600",
            href: "/dashboard/peak-season-rate"
        },
    ]

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {statCards.map((stat) => {
                const Icon = stat.icon
                return (
                    <Link
                        key={stat.label}
                        href={stat.href}
                        className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-all duration-300 group"
                    >
                        <div className={`w-10 h-10 ${stat.lightColor} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                            <Icon size={18} className={stat.textColor} />
                        </div>
                        <p className="text-2xl md:text-3xl font-bold text-neutral-800">{stat.value}</p>
                        <p className="text-xs text-neutral-500 mt-1">{stat.label}</p>
                    </Link>
                )
            })}
        </div>
    );
};

export default DashboardStats;
