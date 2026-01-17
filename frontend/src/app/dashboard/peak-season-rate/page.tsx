'use client'
import { useState, useEffect } from "react"
import { FaPlus, FaX, FaCalendarDays, FaPercent, FaMoneyBill, FaTrash } from "react-icons/fa6"
import { DatePicker } from "antd"
import Link from "next/link"
import { usePathname } from "next/navigation"
import dayjs from "dayjs"

const { RangePicker } = DatePicker;

export default function PeakSeasonRate() {
    const pathname = usePathname()
    const segments = pathname.split("/").filter(Boolean)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState({
        reason: "",
        adjustmentType: "PERCENTAGE",
        adjustmentValue: "",
        startDate: "",
        endDate: "",
        roomTypeIds: [] as string[]
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/peak-season-rate/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                alert("Peak season rate created successfully")
                setIsModalOpen(false)
                setFormData({
                    reason: "",
                    adjustmentType: "PERCENTAGE",
                    adjustmentValue: "",
                    startDate: "",
                    endDate: "",
                    roomTypeIds: []
                })
                fetchPeakSeasonRates()
            } else {
                alert("Failed to create peak season rate")
            }
        } catch (err) {
            console.error(err)
            alert("An error occurred")
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this rate?")) return

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/peak-season-rate/delete/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            })

            if (response.ok) {
                alert("Peak season rate deleted successfully")
                fetchPeakSeasonRates()
            } else {
                alert("Failed to delete peak season rate")
            }
        } catch (error) {
            console.error(error)
            alert("An error occurred")
        }
    }


    const openCreateModal = () => {
        setFormData({
            reason: "",
            adjustmentType: "PERCENTAGE",
            adjustmentValue: "",
            startDate: "",
            endDate: "",
            roomTypeIds: []
        })
        setIsModalOpen(true)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRoomTypeChange = (roomTypeId: string, checked: boolean) => {
        setFormData((prev) => {
            const ids = prev.roomTypeIds
            if (checked) {
                return { ...prev, roomTypeIds: [...ids, roomTypeId] }
            } else {
                return { ...prev, roomTypeIds: ids.filter((id) => id !== roomTypeId) }
            }
        })
    }

    const [properties, setProperties] = useState<any>(null)
    const [peakSeasonRates, setPeakSeasonRates] = useState<any>(null)

    const fetchPeakSeasonRates = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/peak-season-rate`, {
            method: 'GET',
            credentials: 'include'
        })
        const peakSeasonRates = await response.json()
        console.log(peakSeasonRates)
        setPeakSeasonRates(peakSeasonRates)
    }

    useEffect(() => {
        const fetchRoomTypes = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/room-type`, {
                method: 'GET',
                credentials: 'include'
            })
            const properties = await response.json()
            console.log(properties)
            setProperties(properties)
        }
        fetchRoomTypes()
        fetchPeakSeasonRates()
    }, [])

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
                    <h1 className="text-xl md:text-2xl font-bold text-black">Peak Season Rate</h1>
                    <p className="text-sm text-neutral-500 mt-1">Manage pricing adjustments for peak seasons</p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="group rounded-full justify-center items-center flex bg-rose-500 px-4 md:px-8 py-2 md:py-3 gap-2 md:gap-3 text-white hover:cursor-pointer shadow-sm hover:shadow-md transition"
                >
                    <FaPlus size={16} className="md:w-5 md:h-5 group-hover:rotate-90 group-hover:scale-105 transition duration-300" />
                    <span className="font-semibold text-xs md:text-base">Create New Rate</span>
                </button>
            </div>

            {peakSeasonRates?.length > 0 ? (
                <div className="bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden">
                    <div className="hidden md:grid grid-cols-8 gap-4 px-6 py-4 bg-neutral-50 border-b border-neutral-200 font-semibold text-sm text-neutral-600">
                        <span>Property</span>
                        <span>Room Type</span>
                        <span>Reason</span>
                        <span>Type</span>
                        <span>Value</span>
                        <span>Start Date</span>
                        <span>End Date</span>
                        <span>Delete</span>
                    </div>

                    <div className="divide-y divide-neutral-100">
                        {peakSeasonRates?.map((rate: any) => (
                            <div key={rate.id} className="grid grid-cols-1 md:grid-cols-8 gap-2 md:gap-4 px-4 md:px-6 py-4 hover:bg-neutral-50 transition">
                                <div className="flex md:hidden justify-between">
                                    <span className="text-xs text-neutral-500">Property</span>
                                    <span className="font-medium text-sm">{rate.roomType.property.name}</span>
                                </div>
                                <div className="hidden md:flex items-center">
                                    <span className="font-medium text-neutral-800">{rate.roomType.property.name}</span>
                                </div>

                                <div className="flex md:hidden justify-between">
                                    <span className="text-xs text-neutral-500">Room Type</span>
                                    <span className="text-sm">{rate.roomType.name}</span>
                                </div>
                                <div className="hidden md:flex items-center">
                                    <span className="text-neutral-700">{rate.roomType.name}</span>
                                </div>

                                <div className="flex md:hidden justify-between">
                                    <span className="text-xs text-neutral-500">Reason</span>
                                    <span className="text-sm">{rate.reason || '-'}</span>
                                </div>
                                <div className="hidden md:flex items-center">
                                    <span className="text-neutral-600 text-sm">{rate.reason || '-'}</span>
                                </div>

                                <div className="flex md:hidden justify-between">
                                    <span className="text-xs text-neutral-500">Type</span>
                                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${rate.adjustmentType === 'PERCENTAGE'
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'bg-green-100 text-green-700'
                                        }`}>
                                        {rate.adjustmentType === 'PERCENTAGE' ? <FaPercent size={10} /> : <FaMoneyBill size={10} />}
                                        {rate.adjustmentType}
                                    </span>
                                </div>
                                <div className="hidden md:flex items-center">
                                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${rate.adjustmentType === 'PERCENTAGE'
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'bg-green-100 text-green-700'
                                        }`}>
                                        {rate.adjustmentType === 'PERCENTAGE' ? <FaPercent size={10} /> : <FaMoneyBill size={10} />}
                                        {rate.adjustmentType}
                                    </span>
                                </div>

                                <div className="flex md:hidden justify-between">
                                    <span className="text-xs text-neutral-500">Value</span>
                                    <span className="font-semibold text-rose-600 text-sm">
                                        {rate.adjustmentType === 'PERCENTAGE' ? `+${rate.adjustmentValue}%` : `+Rp${Number(rate.adjustmentValue).toLocaleString()}`}
                                    </span>
                                </div>
                                <div className="hidden md:flex items-center">
                                    <span className="font-semibold text-rose-600">
                                        {rate.adjustmentType === 'PERCENTAGE' ? `+${rate.adjustmentValue}%` : `+Rp${Number(rate.adjustmentValue).toLocaleString()}`}
                                    </span>
                                </div>

                                <div className="flex md:hidden justify-between">
                                    <span className="text-xs text-neutral-500">Period</span>
                                    <span className="text-sm">
                                        {new Date(rate.startDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })} - {new Date(rate.endDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </span>
                                </div>
                                <div className="flex md:hidden justify-center mt-2 pt-2 border-t border-neutral-100">
                                    <button onClick={() => handleDelete(rate.id)} className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 flex items-center justify-center gap-2 text-xs font-medium">
                                        <FaTrash size={12} /> Delete
                                    </button>
                                </div>
                                <div className="hidden md:flex items-center">
                                    <span className="text-sm text-neutral-600">
                                        {new Date(rate.startDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </span>
                                </div>
                                <div className="hidden md:flex items-center">
                                    <span className="text-sm text-neutral-600">
                                        {new Date(rate.endDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </span>
                                </div>
                                <div className="hidden md:flex items-center justify-center">
                                    <button onClick={() => handleDelete(rate.id)} className="p-2 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition" title="Delete">
                                        <FaTrash size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-10 text-center">
                    <FaCalendarDays size={48} className="mx-auto text-neutral-300 mb-4" />
                    <p className="text-lg text-neutral-600 font-medium">No peak season rates yet</p>
                    <p className="text-sm text-neutral-400 mt-1">Click "Create New Rate" to add pricing adjustments</p>
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-[420px] max-h-[90vh] bg-white rounded-2xl shadow-xl relative flex flex-col overflow-hidden">
                        <div className="flex justify-between items-center px-5 py-4 border-b border-neutral-200">
                            <h1 className="text-lg md:text-xl font-semibold">Create Peak Season Rate</h1>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-neutral-100 rounded-lg transition">
                                <FaX size={14} className="text-neutral-600 hover:text-rose-500 transition" />
                            </button>
                        </div>

                        <form className="flex flex-col gap-4 p-5 overflow-y-auto" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">Select Room Types</label>
                                <div className="border border-neutral-200 rounded-lg max-h-40 overflow-y-auto">
                                    {properties?.map((property: any) => (
                                        <div key={property.name} className="border-b border-neutral-100 last:border-b-0">
                                            <div className="px-3 py-2 bg-neutral-50">
                                                <span className="font-semibold text-sm text-neutral-700">{property.name}</span>
                                            </div>
                                            <div className="px-3 py-2 space-y-2">
                                                {property.roomTypes?.map((roomType: any) => (
                                                    <label key={roomType.id} className="flex items-center gap-3 cursor-pointer hover:bg-neutral-50 px-2 py-1 rounded transition">
                                                        <input
                                                            type="checkbox"
                                                            value={roomType.id}
                                                            checked={formData.roomTypeIds.includes(roomType.id)}
                                                            onChange={(e) => handleRoomTypeChange(roomType.id, e.target.checked)}
                                                            className="w-4 h-4 text-rose-500 border-neutral-300 rounded focus:ring-rose-500"
                                                        />
                                                        <span className="text-sm text-neutral-600">{roomType.name}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {formData.roomTypeIds.length > 0 && (
                                    <p className="text-xs text-rose-500 mt-1">{formData.roomTypeIds.length} room type(s) selected</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">Reason</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Christmas Holiday, New Year"
                                    required
                                    onChange={handleChange}
                                    name="reason"
                                    value={formData.reason}
                                    className="w-full p-3 text-sm border border-neutral-300 rounded-lg focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none transition"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">Adjustment Type</label>
                                    <select
                                        value={formData.adjustmentType}
                                        onChange={handleChange}
                                        name="adjustmentType"
                                        className="w-full p-3 text-sm border border-neutral-300 rounded-lg focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none transition bg-white"
                                    >
                                        <option value="PERCENTAGE">Percentage (%)</option>
                                        <option value="NOMINAL">Nominal (Rp)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">Value</label>
                                    <input
                                        type="number"
                                        placeholder={formData.adjustmentType === 'PERCENTAGE' ? 'e.g., 20' : 'e.g., 100000'}
                                        required
                                        onChange={handleChange}
                                        name="adjustmentValue"
                                        value={formData.adjustmentValue}
                                        className="w-full p-3 text-sm border border-neutral-300 rounded-lg focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none transition"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">Date Range</label>
                                <RangePicker
                                    format="YYYY-MM-DD"
                                    value={formData.startDate && formData.endDate ? [dayjs(formData.startDate), dayjs(formData.endDate)] : null}
                                    onChange={(dates, strings) => {
                                        setFormData((prev) => ({
                                            ...prev,
                                            startDate: strings[0],
                                            endDate: strings[1]
                                        }))
                                    }}
                                    className="w-full p-3 text-sm border border-neutral-300 rounded-lg hover:border-rose-500 focus:border-rose-500 transition"
                                    style={{ borderRadius: '0.5rem' }}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={formData.roomTypeIds.length === 0}
                                className="w-full bg-rose-500 text-white py-3 rounded-lg font-semibold hover:bg-rose-600 transition disabled:bg-neutral-300 disabled:cursor-not-allowed"
                            >
                                Create Peak Season Rate
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}