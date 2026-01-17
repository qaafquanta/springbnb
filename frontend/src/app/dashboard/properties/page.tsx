'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaHotel, FaLocationDot, FaBook, FaPlus, FaDoorOpen, FaPen, FaTrash, FaXmark, FaTriangleExclamation } from "react-icons/fa6";
import { HiOutlineHome } from "react-icons/hi";

export default function PropertiesPage() {
    const [properties, setProperties] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    
    const [deleteModal, setDeleteModal] = useState<{isOpen: boolean, property: any}>({
        isOpen: false,
        property: null
    })
    const [deleteConfirmText, setDeleteConfirmText] = useState("")
    const [isDeleting, setIsDeleting] = useState(false)

    const fetchProperties = async () => {
        try {
            // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/property/dashboard-properties`, {
            const response = await fetch(`/api/backend/property/dashboard-properties`, {
                method: 'GET',
                credentials: 'include'
            })
            const data = await response.json()
            console.log(data)
            setProperties(data.result)
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchProperties()
    }, [])

    const openDeleteModal = (property: any) => {
        setDeleteModal({ isOpen: true, property })
        setDeleteConfirmText("")
    }

    const closeDeleteModal = () => {
        setDeleteModal({ isOpen: false, property: null })
        setDeleteConfirmText("")
    }

    const handleDelete = async () => {
        if (!deleteModal.property) return
        const expectedText = `DELETE ${deleteModal.property.name.toUpperCase()}`
        if (deleteConfirmText !== expectedText) return
        
        setIsDeleting(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/property/delete/${deleteModal.property.id}`, {
                method: 'DELETE',
                credentials: 'include'
            })
            const data = await response.json()
            
            if (response.ok) {
                closeDeleteModal()
                fetchProperties()
            } else {
                alert(data.message || "Failed to delete property")
            }
        } catch (err) {
            console.error(err)
            alert("Failed to delete property")
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <div className="bg-neutral-50 w-full min-h-screen">
            <div className="bg-white border-b border-neutral-200">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-semibold text-neutral-900">My Properties</h1>
                            <p className="text-sm md:text-base text-neutral-500 mt-1">
                                Manage your listings and track their performance
                            </p>
                        </div>
                        <Link
                            className="group inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-rose-600 text-white px-5 md:px-6 py-3 rounded-xl font-medium text-sm md:text-base shadow-lg shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/30 hover:from-rose-600 hover:to-rose-700 transition-all duration-200"
                            href="/dashboard/create-property"
                        >
                            <FaPlus size={14} className="group-hover:rotate-90 transition-transform duration-300" />
                            <span>Add Property</span>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
                {isLoading ? (
                    <div className="grid gap-4 md:gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-2xl p-4 md:p-6 animate-pulse">
                                <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                                    <div className="w-full md:w-48 h-36 md:h-36 bg-neutral-200 rounded-xl" />
                                    <div className="flex-1 space-y-3">
                                        <div className="h-6 bg-neutral-200 rounded w-1/3" />
                                        <div className="h-4 bg-neutral-200 rounded w-1/4" />
                                        <div className="h-4 bg-neutral-200 rounded w-2/3" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : properties?.length > 0 ? (
                    <div className="grid gap-4 md:gap-6">
                        {properties.map((property: any) => (
                            <div
                                key={property.id}
                                className="group bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all duration-300 overflow-hidden"
                            >
                                <div className="flex flex-col md:flex-row">
                                    <div className="relative w-full md:w-64 lg:w-80 h-48 md:h-auto md:aspect-[4/3] flex-shrink-0">
                                        <Image
                                            fill
                                            src={property.images[0]}
                                            alt={property.name}
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-neutral-700 flex items-center gap-1.5">
                                            <FaHotel size={12} className="text-rose-500" />
                                            {property.category.name}
                                        </div>
                                    </div>

                                    <div className="flex-1 p-4 md:p-6 flex flex-col">
                                        <div className="flex-1">
                                            <h2 className="text-lg md:text-xl font-semibold text-neutral-900 mb-1 group-hover:text-rose-600 transition-colors">
                                                {property.name}
                                            </h2>
                                            <div className="flex items-center gap-1.5 text-neutral-500 text-sm mb-3">
                                                <FaLocationDot size={12} className="text-rose-500" />
                                                <span>{property.city[0].toUpperCase() + property.city.slice(1).toLowerCase()}</span>
                                            </div>

                                            <p className="text-sm text-neutral-600 line-clamp-2 mb-4 hidden md:block">
                                                {property.description}
                                            </p>

                                            <div className="flex flex-wrap gap-3 mb-4">
                                                <div className="inline-flex items-center gap-1.5 bg-neutral-100 px-3 py-1.5 rounded-lg text-sm">
                                                    <FaDoorOpen size={14} className="text-neutral-500" />
                                                    <span className="text-neutral-600">
                                                        <strong className="text-neutral-900">{property.roomTypes?.length || 0}</strong> Room Types
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 pt-4 border-t border-neutral-100">
                                            <Link
                                                href={`/dashboard/properties/${property.id}`}
                                                className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                            >
                                                <FaBook size={14} />
                                                <span>Manage Rooms</span>
                                            </Link>
                                            <Link
                                                href={`/dashboard/edit-property/${property.id}`}
                                                className="inline-flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                            >
                                                <FaPen size={12} />
                                                <span>Edit</span>
                                            </Link>
                                            <button
                                                onClick={() => openDeleteModal(property)}
                                                className="inline-flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                            >
                                                <FaTrash size={12} />
                                                <span>Delete</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm p-8 md:p-16 text-center">
                        <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <HiOutlineHome size={36} className="text-neutral-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-neutral-900 mb-2">No properties yet</h3>
                        <p className="text-neutral-500 mb-6 max-w-md mx-auto">
                            Start listing your properties to reach travelers from around the world.
                        </p>
                        <Link
                            href="/dashboard/create-property"
                            className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                        >
                            <FaPlus size={14} />
                            <span>Add Your First Property</span>
                        </Link>
                    </div>
                )}
            </div>

            {deleteModal.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div 
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={closeDeleteModal}
                    />
                    
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                                    <FaTriangleExclamation className="text-red-500" size={18} />
                                </div>
                                <h3 className="text-lg font-semibold text-neutral-900">Delete Property</h3>
                            </div>
                            <button 
                                onClick={closeDeleteModal}
                                className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-colors"
                            >
                                <FaXmark size={16} className="text-neutral-500" />
                            </button>
                        </div>
                        
                        <div className="px-6 py-5">
                            <p className="text-neutral-600 mb-4">
                                You are about to delete <strong className="text-neutral-900">{deleteModal.property?.name}</strong>. This action cannot be undone and will also delete all associated room types and rooms.
                            </p>
                            
                            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-5">
                                <p className="text-sm text-red-700">
                                    To confirm, type <strong className="font-mono bg-red-100 px-1.5 py-0.5 rounded">DELETE {deleteModal.property?.name.toUpperCase()}</strong> below:
                                </p>
                            </div>
                            
                            <input
                                type="text"
                                value={deleteConfirmText}
                                onChange={(e) => setDeleteConfirmText(e.target.value)}
                                placeholder="Type here to confirm..."
                                className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:border-red-500 focus:ring-0 outline-none transition text-base"
                            />
                        </div>
                        
                        <div className="flex gap-3 px-6 py-4 bg-neutral-50 border-t border-neutral-100">
                            <button
                                onClick={closeDeleteModal}
                                className="flex-1 px-4 py-3 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 rounded-xl font-medium transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={deleteConfirmText !== `DELETE ${deleteModal.property?.name.toUpperCase()}` || isDeleting}
                                className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-500"
                            >
                                {isDeleting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Deleting...
                                    </span>
                                ) : (
                                    'Delete Property'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}