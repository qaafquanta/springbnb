'use client'
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaHouse, FaCalendarDays, FaChartLine, FaCalendarXmark, FaTag, FaBars, FaXmark, FaUser, FaArrowLeft } from "react-icons/fa6";

const sidebarLinks = [
    { href: "/", label: "Home", icon: FaArrowLeft },
    { href: "/dashboard", label: "Dashboard", icon: FaChartLine },
    { href: "/dashboard/properties", label: "Properties", icon: FaHouse },
    { href: "/dashboard/property-categories", label: "Property Categories", icon: FaTag },
    { href: "/dashboard/room-availability", label: "Room Availability", icon: FaCalendarXmark },
    { href: "/dashboard/peak-season-rate", label: "Peak Season Rate", icon: FaCalendarDays },
    { href: "/profile", label: "Profile", icon: FaUser },
]

export default function DashboardLayout({children,
}: Readonly<{
  children: React.ReactNode;
}>){
    const pathname = usePathname()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return(
        <main className="flex flex-col md:flex-row font-rethink text-black bg-white w-full min-h-screen">
            <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-30">
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg"
                    >
                        <FaBars size={20} />
                    </button>
                    <span className="text-lg font-bold text-rose-500">Springbnb</span>
                </div>
            </div>

            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <nav className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
                md:translate-x-0 md:static md:h-screen md:sticky md:top-0
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="flex flex-col h-full">
                    <div className="hidden md:block px-6 py-8 border-b border-gray-100">
                        <h1 className="text-2xl font-bold text-rose-500">Springbnb</h1>
                        <p className="text-xs text-neutral-500 mt-1">Tenant Dashboard</p>
                    </div>

                    <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-100">
                        <span className="font-bold text-rose-500">Menu</span>
                        <button 
                            onClick={() => setIsSidebarOpen(false)}
                            className="p-2 text-neutral-500 hover:bg-neutral-100 rounded-lg"
                        >
                            <FaXmark size={20} />
                        </button>
                    </div>

                    <div className="flex flex-col gap-1 p-4 flex-1 overflow-y-auto">
                        {sidebarLinks.map((link) => {
                            const isActive = pathname === link.href || 
                                (link.href !== "/dashboard" && pathname.startsWith(link.href))
                            const Icon = link.icon
                            
                            return (
                                <Link 
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                                        ${isActive 
                                            ? 'bg-rose-50 text-rose-600 font-semibold' 
                                            : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                                        }`}
                                >
                                    <Icon 
                                        size={18} 
                                        className={`transition-colors ${isActive ? 'text-rose-500' : 'text-neutral-400 group-hover:text-neutral-600'}`}
                                    />
                                    <span className="text-sm">{link.label}</span>
                                    {isActive && (
                                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-rose-500"></div>
                                    )}
                                </Link>
                            )
                        })}
                    </div>

                    <div className="p-4 border-t border-gray-100">
                        <div className="px-4 py-3 bg-neutral-50 rounded-xl">
                            <p className="text-xs text-neutral-500">Need help?</p>
                            <a href="#" className="text-sm text-rose-500 font-medium hover:underline">Contact Support</a>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="flex-1 min-w-0">
                {children}
            </div>
        </main>
    )
}