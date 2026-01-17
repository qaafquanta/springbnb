'use client'
import { useState, useEffect, useMemo } from "react"
import { FaPlus, FaX, FaCalendarXmark, FaTrash, FaFilter } from "react-icons/fa6"
import { Calendar } from "@/components/ui/calendar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { DateRange } from "react-day-picker"
import { format } from "date-fns"

type Property = {
    id: string
    name: string
    roomTypes: {
        id: string
        name: string
        rooms: {
            id: string
            roomNumber: number
        }[]
    }[]
}

type UnavailableRecord = {
    id: string
    date: string
    reason: string | null
    room: {
        id: string
        roomNumber: number
        roomType: {
            name: string
            property: {
                name: string
            }
        }
    }
}

export default function RoomAvailability() {
    const pathname = usePathname()
    const segments = pathname.split("/").filter(Boolean)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDeleteRangeModalOpen, setIsDeleteRangeModalOpen] = useState(false)
    const [properties, setProperties] = useState<Property[]>([])
    const [unavailableRecords, setUnavailableRecords] = useState<UnavailableRecord[]>([])
    const [selectedRoomIds, setSelectedRoomIds] = useState<string[]>([])
    const [dateRange, setDateRange] = useState<DateRange | undefined>()
    const [reason, setReason] = useState("")
    const [loading, setLoading] = useState(false)

    const [filterDate, setFilterDate] = useState("")
    const [filterProperty, setFilterProperty] = useState("")
    const [filterRoomType, setFilterRoomType] = useState("")
    const [filterRoomNumber, setFilterRoomNumber] = useState("")

    const [deleteRoomId, setDeleteRoomId] = useState("")
    const [deleteDateRange, setDeleteDateRange] = useState<DateRange | undefined>()

    const fetchProperties = async () => {
        try {
            const response = await fetch(`/api/backend/room-availability/rooms`, {
                method: 'GET'
            })
            const result = await response.json()
            setProperties(result.properties || [])
        } catch (err) {
            console.error(err)
        }
    }

    const fetchUnavailableRecords = async () => {
        try {
            const response = await fetch(`/api/backend/room-availability/unavailable`, {
                method: 'GET'
            })
            const result = await response.json()
            setUnavailableRecords(result.unavailable || [])
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchProperties()
        fetchUnavailableRecords()
    }, [])

    const filterOptions = useMemo(() => {
        const dates = new Set<string>()
        const properties = new Set<string>()
        const roomTypes = new Set<string>()
        const roomNumbers = new Set<number>()

        unavailableRecords.forEach(record => {
            dates.add(new Date(record.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }))
            properties.add(record.room.roomType.property.name)
            roomTypes.add(record.room.roomType.name)
            roomNumbers.add(record.room.roomNumber)
        })

        return {
            dates: Array.from(dates).sort(),
            properties: Array.from(properties).sort(),
            roomTypes: Array.from(roomTypes).sort(),
            roomNumbers: Array.from(roomNumbers).sort((a, b) => a - b)
        }
    }, [unavailableRecords])

    const filteredRecords = useMemo(() => {
        return unavailableRecords.filter(record => {
            const dateStr = new Date(record.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
            const propertyName = record.room.roomType.property.name
            const roomTypeName = record.room.roomType.name
            const roomNumber = record.room.roomNumber

            if (filterDate && dateStr !== filterDate) return false
            if (filterProperty && propertyName !== filterProperty) return false
            if (filterRoomType && roomTypeName !== filterRoomType) return false
            if (filterRoomNumber && roomNumber !== Number(filterRoomNumber)) return false

            return true
        })
    }, [unavailableRecords, filterDate, filterProperty, filterRoomType, filterRoomNumber])

    const hasActiveFilters = filterDate || filterProperty || filterRoomType || filterRoomNumber

    const clearFilters = () => {
        setFilterDate("")
        setFilterProperty("")
        setFilterRoomType("")
        setFilterRoomNumber("")
    }

    const handleRoomSelection = (roomId: string, checked: boolean) => {
        if (checked) {
            setSelectedRoomIds(prev => [...prev, roomId])
        } else {
            setSelectedRoomIds(prev => prev.filter(id => id !== roomId))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (selectedRoomIds.length === 0 || !dateRange?.from || !dateRange?.to) {
            alert("Please select at least one room and a date range")
            return
        }

        setLoading(true)
        try {
            const response = await fetch(`/api/backend/room-availability/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    roomIds: selectedRoomIds,
                    startDate: dateRange.from.toISOString(),
                    endDate: dateRange.to.toISOString(),
                    reason: reason || null
                })
            })
            const result = await response.json()
            if (response.ok) {
                alert("Unavailability created successfully")
                setIsModalOpen(false)
                setSelectedRoomIds([])
                setDateRange(undefined)
                setReason("")
                fetchUnavailableRecords()
            } else {
                alert(result.error || "Failed to create unavailability")
            }
        } catch (err) {
            console.error(err)
            alert("Failed to create unavailability")
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this unavailability?")) return
        try {
            const response = await fetch(`/api/backend/room-availability/delete/${id}`, {
                method: 'DELETE'
            })
            if (response.ok) {
                alert("Deleted successfully")
                fetchUnavailableRecords()
            }
        } catch (err) {
            console.error(err)
            alert("Failed to delete")
        }
    }

    const handleDeleteRange = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!deleteRoomId || !deleteDateRange?.from || !deleteDateRange?.to) {
            alert("Please select a room and date range")
            return
        }

        if (!confirm(`Are you sure you want to delete all unavailability records for this room from ${format(deleteDateRange.from, 'dd MMM yyyy')} to ${format(deleteDateRange.to, 'dd MMM yyyy')}?`)) {
            return
        }

        setLoading(true)
        try {
            const response = await fetch(`/api/backend/room-availability/delete-range`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    roomId: deleteRoomId,
                    startDate: deleteDateRange.from.toISOString(),
                    endDate: deleteDateRange.to.toISOString()
                })
            })
            const result = await response.json()
            if (response.ok) {
                alert(`Deleted ${result.count} records successfully`)
                setIsDeleteRangeModalOpen(false)
                setDeleteRoomId("")
                setDeleteDateRange(undefined)
                fetchUnavailableRecords()
            } else {
                alert(result.error || "Failed to delete")
            }
        } catch (err) {
            console.error(err)
            alert("Failed to delete")
        } finally {
            setLoading(false)
        }
    }

    const allRooms = useMemo(() => {
        const rooms: { id: string; label: string }[] = []
        properties.forEach(property => {
            property.roomTypes.forEach(roomType => {
                roomType.rooms.forEach(room => {
                    rooms.push({
                        id: room.id,
                        label: `${property.name} - ${roomType.name} - Room ${room.roomNumber}`
                    })
                })
            })
        })
        return rooms
    }, [properties])

    return (
        <div className="pt-4 md:pt-5 px-3 md:px-5 bg-neutral-100 w-full min-h-screen">
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

            <div className="min-h-[60px] md:h-20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-black">Room Availability</h1>
                    <p className="text-sm text-neutral-500 mt-1">Manage room unavailability periods</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setIsDeleteRangeModalOpen(true)}
                        className="group rounded-full justify-center items-center flex bg-rose-500 px-4 md:px-6 py-2 md:py-3 gap-2 text-white hover:cursor-pointer shadow-sm hover:shadow-md transition"
                    >
                        <FaTrash size={14} />
                        <span className="font-semibold text-xs md:text-sm">Delete Range</span>
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="group rounded-full justify-center items-center flex bg-rose-500 px-4 md:px-8 py-2 md:py-3 gap-2 md:gap-3 text-white hover:cursor-pointer shadow-sm hover:shadow-md transition"
                    >
                        <FaPlus size={16} className="md:w-5 md:h-5 group-hover:rotate-90 group-hover:scale-105 transition duration-300" />
                        <span className="font-semibold text-xs md:text-base">Add Unavailability</span>
                    </button>
                </div>
            </div>

            <div className="mb-4 bg-white rounded-xl shadow-sm border border-neutral-200 p-4">
                <div className="flex items-center gap-2 mb-3">
                    <FaFilter size={14} className="text-neutral-500" />
                    <span className="text-sm font-medium text-neutral-700">Filters</span>
                    {hasActiveFilters && (
                        <button
                            onClick={clearFilters}
                            className="ml-auto text-xs text-rose-500 hover:text-rose-600 font-medium flex items-center gap-1"
                        >
                            <FaX size={10} />
                            Clear all
                        </button>
                    )}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div>
                        <label className="block text-xs font-medium text-neutral-500 mb-1">Date</label>
                        <select
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                            className="w-full p-2.5 text-sm border border-neutral-200 rounded-lg bg-white focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none transition"
                        >
                            <option value="">All Dates</option>
                            {filterOptions.dates.map(date => (
                                <option key={date} value={date}>{date}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-neutral-500 mb-1">Property</label>
                        <select
                            value={filterProperty}
                            onChange={(e) => setFilterProperty(e.target.value)}
                            className="w-full p-2.5 text-sm border border-neutral-200 rounded-lg bg-white focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none transition"
                        >
                            <option value="">All Properties</option>
                            {filterOptions.properties.map(prop => (
                                <option key={prop} value={prop}>{prop}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-neutral-500 mb-1">Room Type</label>
                        <select
                            value={filterRoomType}
                            onChange={(e) => setFilterRoomType(e.target.value)}
                            className="w-full p-2.5 text-sm border border-neutral-200 rounded-lg bg-white focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none transition"
                        >
                            <option value="">All Room Types</option>
                            {filterOptions.roomTypes.map(rt => (
                                <option key={rt} value={rt}>{rt}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-neutral-500 mb-1">Room Number</label>
                        <select
                            value={filterRoomNumber}
                            onChange={(e) => setFilterRoomNumber(e.target.value)}
                            className="w-full p-2.5 text-sm border border-neutral-200 rounded-lg bg-white focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none transition"
                        >
                            <option value="">All Rooms</option>
                            {filterOptions.roomNumbers.map(num => (
                                <option key={num} value={num}>Room {num}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {hasActiveFilters && (
                    <p className="text-xs text-neutral-500 mt-3">
                        Showing {filteredRecords.length} of {unavailableRecords.length} record(s)
                    </p>
                )}
            </div>

            {filteredRecords.length > 0 ? (
                <div className="bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden">
                    <div className="hidden md:grid grid-cols-6 gap-4 px-6 py-4 bg-neutral-50 border-b border-neutral-200 font-semibold text-sm text-neutral-600">
                        <span>Date</span>
                        <span>Property</span>
                        <span>Room Type</span>
                        <span>Room</span>
                        <span>Reason</span>
                        <span>Actions</span>
                    </div>

                    <div className="divide-y divide-neutral-100 max-h-[500px] overflow-y-auto">
                        {filteredRecords.map((record) => (
                            <div key={record.id} className="grid grid-cols-1 md:grid-cols-6 gap-2 md:gap-4 px-4 md:px-6 py-4 hover:bg-neutral-50 transition items-center">
                                <div className="flex md:hidden justify-between">
                                    <span className="text-xs text-neutral-500">Date</span>
                                    <span className="font-medium text-sm text-rose-600">
                                        {new Date(record.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </span>
                                </div>
                                <div className="hidden md:flex items-center">
                                    <span className="font-medium text-rose-600">
                                        {new Date(record.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </span>
                                </div>

                                <div className="flex md:hidden justify-between">
                                    <span className="text-xs text-neutral-500">Property</span>
                                    <span className="text-sm">{record.room.roomType.property.name}</span>
                                </div>
                                <div className="hidden md:flex items-center">
                                    <span className="text-neutral-700">{record.room.roomType.property.name}</span>
                                </div>

                                <div className="flex md:hidden justify-between">
                                    <span className="text-xs text-neutral-500">Room Type</span>
                                    <span className="text-sm">{record.room.roomType.name}</span>
                                </div>
                                <div className="hidden md:flex items-center">
                                    <span className="text-neutral-600">{record.room.roomType.name}</span>
                                </div>

                                <div className="flex md:hidden justify-between">
                                    <span className="text-xs text-neutral-500">Room</span>
                                    <span className="bg-rose-100 text-rose-600 px-2 py-1 rounded-full text-xs font-medium">
                                        Room {record.room.roomNumber}
                                    </span>
                                </div>
                                <div className="hidden md:flex items-center">
                                    <span className="bg-rose-100 text-rose-600 px-2 py-1 rounded-full text-xs font-medium">
                                        Room {record.room.roomNumber}
                                    </span>
                                </div>

                                <div className="flex md:hidden justify-between">
                                    <span className="text-xs text-neutral-500">Reason</span>
                                    <span className="text-sm text-neutral-500">{record.reason || '-'}</span>
                                </div>
                                <div className="hidden md:flex items-center">
                                    <span className="text-neutral-500 text-sm truncate">{record.reason || '-'}</span>
                                </div>

                                <div className="flex justify-end md:justify-start">
                                    <button
                                        onClick={() => handleDelete(record.id)}
                                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                                    >
                                        <FaTrash size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-10 text-center">
                    <FaCalendarXmark size={48} className="mx-auto text-neutral-300 mb-4" />
                    <p className="text-lg text-neutral-600 font-medium">
                        {hasActiveFilters ? "No matching records found" : "No unavailability records"}
                    </p>
                    <p className="text-sm text-neutral-400 mt-1">
                        {hasActiveFilters ? "Try adjusting your filters" : "All rooms are currently available"}
                    </p>
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-[600px] max-h-[90vh] bg-white rounded-2xl shadow-xl relative flex flex-col overflow-hidden">
                        <div className="flex justify-between items-center px-5 py-4 border-b border-neutral-200">
                            <h1 className="text-lg md:text-xl font-semibold">Add Room Unavailability</h1>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-neutral-100 rounded-lg transition">
                                <FaX size={14} className="text-neutral-600 hover:text-rose-500 transition" />
                            </button>
                        </div>

                        <form className="flex flex-col gap-4 p-5 overflow-y-auto" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">Select Rooms</label>
                                <div className="border border-neutral-200 rounded-lg max-h-40 overflow-y-auto">
                                    {properties.map((property) => (
                                        <div key={property.id} className="border-b border-neutral-100 last:border-b-0">
                                            <div className="px-3 py-2 bg-neutral-50">
                                                <span className="font-semibold text-sm text-neutral-700">{property.name}</span>
                                            </div>
                                            {property.roomTypes.map((roomType) => (
                                                <div key={roomType.id} className="px-3 py-2">
                                                    <span className="text-xs text-neutral-500 mb-1 block">{roomType.name}</span>
                                                    <div className="flex flex-wrap gap-2">
                                                        {roomType.rooms.map((room) => (
                                                            <label key={room.id} className="flex items-center gap-2 cursor-pointer hover:bg-neutral-50 px-2 py-1 rounded transition border border-neutral-200">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectedRoomIds.includes(room.id)}
                                                                    onChange={(e) => handleRoomSelection(room.id, e.target.checked)}
                                                                    className="w-4 h-4 text-rose-500 border-neutral-300 rounded focus:ring-rose-500"
                                                                />
                                                                <span className="text-sm text-neutral-600">Room {room.roomNumber}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                                {selectedRoomIds.length > 0 && (
                                    <p className="text-xs text-rose-500 mt-1">{selectedRoomIds.length} room(s) selected</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">Select Date Range</label>
                                <div className="border border-neutral-200 rounded-lg p-3 flex justify-center overflow-x-auto">
                                    <Calendar
                                        mode="range"
                                        selected={dateRange}
                                        onSelect={setDateRange}
                                        numberOfMonths={2}
                                        disabled={{ before: new Date() }}
                                    />
                                </div>
                                {dateRange?.from && dateRange?.to && (
                                    <p className="text-xs text-rose-500 mt-2 text-center">
                                        {format(dateRange.from, 'dd MMM yyyy')} - {format(dateRange.to, 'dd MMM yyyy')}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">Reason (Optional)</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Maintenance, Renovation, Private booking"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    className="w-full p-3 text-sm border border-neutral-300 rounded-lg focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none transition"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={selectedRoomIds.length === 0 || !dateRange?.from || !dateRange?.to || loading}
                                className="w-full bg-rose-500 text-white py-3 rounded-lg font-semibold hover:bg-rose-600 transition disabled:bg-neutral-300 disabled:cursor-not-allowed"
                            >
                                {loading ? "Creating..." : "Mark as Unavailable"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {isDeleteRangeModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-[600px] max-h-[90vh] bg-white rounded-2xl shadow-xl relative flex flex-col overflow-hidden">
                        <div className="flex justify-between items-center px-5 py-4 border-b border-neutral-200">
                            <h1 className="text-lg md:text-xl font-semibold text-red-600">Delete Unavailability Range</h1>
                            <button onClick={() => setIsDeleteRangeModalOpen(false)} className="p-2 hover:bg-neutral-100 rounded-lg transition">
                                <FaX size={14} className="text-neutral-600 hover:text-rose-500 transition" />
                            </button>
                        </div>

                        <form className="flex flex-col gap-4 p-5 overflow-y-auto" onSubmit={handleDeleteRange}>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">Select Room</label>
                                <select
                                    value={deleteRoomId}
                                    onChange={(e) => setDeleteRoomId(e.target.value)}
                                    className="w-full p-3 text-sm border border-neutral-300 rounded-lg focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none transition bg-white"
                                >
                                    <option value="">Select a room...</option>
                                    {allRooms.map((room) => (
                                        <option key={room.id} value={room.id}>
                                            {room.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">Select Date Range to Delete</label>
                                <div className="border border-neutral-200 rounded-lg p-3 flex justify-center overflow-x-auto">
                                    <Calendar
                                        mode="range"
                                        selected={deleteDateRange}
                                        onSelect={setDeleteDateRange}
                                        numberOfMonths={2}
                                    />
                                </div>
                                {deleteDateRange?.from && deleteDateRange?.to && (
                                    <p className="text-xs text-red-500 mt-2 text-center">
                                        Will delete: {format(deleteDateRange.from, 'dd MMM yyyy')} - {format(deleteDateRange.to, 'dd MMM yyyy')}
                                    </p>
                                )}
                            </div>

                            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                <p className="text-sm text-red-600">
                                    ⚠️ This will permanently delete all unavailability records for the selected room within the specified date range.
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={!deleteRoomId || !deleteDateRange?.from || !deleteDateRange?.to || loading}
                                className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition disabled:bg-neutral-300 disabled:cursor-not-allowed"
                            >
                                {loading ? "Deleting..." : "Delete Range"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
