'use client'
import { useState, useEffect } from "react"
import { FaPlus, FaX, FaTag, FaPencil, FaTrash } from "react-icons/fa6"
import Link from "next/link"
import { usePathname } from "next/navigation"

type PropertyCategory = {
    id: string
    name: string
    description: string | null
    createdAt: string
    otherTenantsCount: number
    _count: {
        properties: number
    }
}

export default function PropertyCategories() {
    const pathname = usePathname()
    const segments = pathname.split("/").filter(Boolean)

    const [categories, setCategories] = useState<PropertyCategory[]>([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [formData, setFormData] = useState({ name: "", description: "" })
    const [submitting, setSubmitting] = useState(false)

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/property-category/my-categories`, {
                method: 'GET',
                credentials: 'include'
            })
            const result = await response.json()
            setCategories(result.categories || [])
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    const openCreateModal = () => {
        setIsEditing(false)
        setEditingId(null)
        setFormData({ name: "", description: "" })
        setIsModalOpen(true)
    }

    const openEditModal = (category: PropertyCategory) => {
        setIsEditing(true)
        setEditingId(category.id)
        setFormData({ name: category.name, description: category.description || "" })
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setIsEditing(false)
        setEditingId(null)
        setFormData({ name: "", description: "" })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.name.trim()) {
            alert("Name is required")
            return
        }

        setSubmitting(true)
        try {
            const url = isEditing 
                ? `${process.env.NEXT_PUBLIC_API_URL}/property-category/update/${editingId}`
                : `${process.env.NEXT_PUBLIC_API_URL}/property-category/create`
            
            const response = await fetch(url, {
                method: isEditing ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include'
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error || 'Failed to save category')
            }

            alert(result.message)
            closeModal()
            fetchCategories()
        } catch (err: any) {
            alert(err.message || 'Failed to save category')
        } finally {
            setSubmitting(false)
        }
    }

    const handleDelete = async (category: PropertyCategory) => {
        if (category._count.properties > 0) {
            alert(`Cannot delete "${category.name}". It has ${category._count.properties} properties attached.`)
            return
        }

        if (!confirm(`Are you sure you want to delete "${category.name}"?`)) {
            return
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/property-category/delete/${category.id}`, {
                method: 'DELETE',
                credentials: 'include'
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error || 'Failed to delete category')
            }

            alert(result.message)
            fetchCategories()
        } catch (err: any) {
            alert(err.message || 'Failed to delete category')
        }
    }

    if (loading) {
        return (
            <div className="mt-16 md:mt-20 pt-4 md:pt-5 px-3 md:px-5 bg-neutral-100 w-full min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-neutral-500 text-sm">Loading categories...</p>
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

            <div className="min-h-[60px] md:h-20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-black">Property Categories</h1>
                    <p className="text-sm text-neutral-500 mt-1">Manage property types for your listings</p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="group rounded-full justify-center items-center flex bg-rose-500 px-4 md:px-8 py-2 md:py-3 gap-2 md:gap-3 text-white hover:cursor-pointer shadow-sm hover:shadow-md transition"
                >
                    <FaPlus size={16} className="md:w-5 md:h-5 group-hover:rotate-90 group-hover:scale-105 transition duration-300" />
                    <span className="font-semibold text-xs md:text-base">Add Category</span>
                </button>
            </div>

            {categories.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {categories.map((category) => {
                        const isUsedByOthers = category.otherTenantsCount > 0
                        const hasProperties = category._count.properties > 0
                        const canEdit = !isUsedByOthers
                        const canDelete = !isUsedByOthers && !hasProperties

                        return (
                            <div
                                key={category.id}
                                className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-all group"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center mb-4">
                                        <FaTag size={20} className="text-rose-500" />
                                    </div>
                                    {isUsedByOthers ? (
                                        <span className="text-[10px] text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                                            Used by others
                                        </span>
                                    ) : (
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => openEditModal(category)}
                                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition"
                                            >
                                                <FaPencil size={12} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(category)}
                                                disabled={!canDelete}
                                                title={hasProperties ? `Cannot delete: ${category._count.properties} properties attached` : 'Delete category'}
                                                className={`w-8 h-8 flex items-center justify-center rounded-lg transition ${
                                                    canDelete 
                                                        ? 'bg-red-50 hover:bg-red-100 text-red-500' 
                                                        : 'bg-neutral-100 text-neutral-300 cursor-not-allowed'
                                                }`}
                                            >
                                                <FaTrash size={12} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <h3 className="font-semibold text-lg text-neutral-800 mb-1">{category.name}</h3>
                                {category.description && (
                                    <p className="text-sm text-neutral-500 mb-3 line-clamp-2">{category.description}</p>
                                )}
                                <div className="flex items-center gap-2 text-xs text-neutral-400">
                                    <span className="bg-neutral-100 px-2 py-1 rounded-full">
                                        {category._count.properties} {category._count.properties === 1 ? 'property' : 'properties'}
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-10 text-center">
                    <FaTag size={48} className="mx-auto text-neutral-300 mb-4" />
                    <p className="text-lg text-neutral-600 font-medium">No categories yet</p>
                    <p className="text-sm text-neutral-400 mt-1">Create your first property category</p>
                    <button
                        onClick={openCreateModal}
                        className="mt-4 text-rose-500 font-medium hover:underline"
                    >
                        Add Category
                    </button>
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
                            <h2 className="text-lg font-semibold text-neutral-800">
                                {isEditing ? 'Edit Category' : 'Add New Category'}
                            </h2>
                            <button
                                onClick={closeModal}
                                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-neutral-100 transition"
                            >
                                <FaX size={14} className="text-neutral-500" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Category Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        placeholder="e.g. Villa, Apartment, Hotel"
                                        className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none transition"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Description <span className="text-neutral-400">(optional)</span>
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                        placeholder="Brief description of this category..."
                                        rows={3}
                                        className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none transition resize-none"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 py-3 border border-neutral-200 rounded-xl font-medium text-neutral-600 hover:bg-neutral-50 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 py-3 bg-rose-500 text-white rounded-xl font-medium hover:bg-rose-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {submitting ? 'Saving...' : isEditing ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
