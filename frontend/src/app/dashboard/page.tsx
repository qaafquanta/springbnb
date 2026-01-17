'use client'
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import DashboardStats from "@/components/dashboard/DashboardStats"
import DashboardCalendar from "@/components/dashboard/DashboardCalendar"
import RecentProperties from "@/components/dashboard/RecentProperties"


type Stats = {
    totalProperties: number
    totalRoomTypes: number
    totalRooms: number
    unavailableToday: number
    availableToday: number
    totalPeakSeasonRates: number
    activePeakSeasonRates: number
}

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

type CalendarAvailability = {
    date: string
    available: number
    total: number
}

export default function Dashboard() {
    const pathname = usePathname()
    const segments = pathname.split("/").filter(Boolean)

    const [stats, setStats] = useState<Stats | null>(null)
    const [recentProperties, setRecentProperties] = useState<RecentProperty[]>([])
    const [calendarAvailability, setCalendarAvailability] = useState<CalendarAvailability[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/stats`, {
                    method: 'GET',
                    credentials: 'include'
                })
                const result = await response.json()
                setStats(result.stats)
                setRecentProperties(result.recentProperties || [])
                setCalendarAvailability(result.calendarAvailability || [])
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchDashboardData()
    }, [])

    if (loading) {
        return (
            <div className="pt-4 md:pt-5 px-3 md:px-5 bg-neutral-100 w-full min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-neutral-500 text-sm">Loading dashboard...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="pt-4 md:pt-5 px-3 md:px-5 bg-neutral-100 w-full min-h-screen pb-10">
            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 overflow-x-auto pb-2 whitespace-nowrap">
                {segments.map((segment, index) => {
                    const href = "/" + segments.slice(0, index + 1).join("/");
                    const isLast = index === segments.length - 1;
                    const label = segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
                    return (
                        <div key={href} className="flex items-center gap-2">
                            {!isLast ? (
                                <Link href={href} className="hover:underline">{label}</Link>
                            ) : (
                                <span className="font-medium text-gray-900">{label}</span>
                            )}
                            {!isLast && <span>/</span>}
                        </div>
                    );
                })}
            </div>

            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-black">Welcome back!</h1>
                <p className="text-sm text-neutral-500 mt-1">Here's an overview of your properties</p>
            </div>

            <DashboardStats stats={stats} />

            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
                
                <DashboardCalendar 
                    calendarAvailability={calendarAvailability} 
                    totalRooms={stats?.totalRooms || 0}
                />

                <RecentProperties properties={recentProperties} />
            </div>
        </div>
    )
}