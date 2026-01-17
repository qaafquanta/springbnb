'use client'
import { useEffect, useState } from 'react';
import { FaCloudUploadAlt, FaMapMarkerAlt, FaHome, FaBuilding } from 'react-icons/fa';
import { FaPlus, FaChevronDown, FaCheck, FaMagnifyingGlass } from 'react-icons/fa6';
import { HiOutlinePhotograph } from 'react-icons/hi';
import Link from 'next/link';

export default function CreateProperty() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        city: "",
        address: "",
        categoryId: "",
    })

    const [propertyCategories, setPropertyCategories] = useState<{id: string, name: string}[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false)
    const [categorySearch, setCategorySearch] = useState('')

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/property-category`, {
                credentials: 'include'
            })
            const data = await response.json()
            console.log(data)
            setPropertyCategories(data.categories || [])
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true)
        const form = new FormData();
        console.log(formData)
        form.append("name", formData.name)
        form.append("description", formData.description)
        form.append("city", formData.city)
        form.append("address", formData.address)
        form.append("categoryId", formData.categoryId)
        if (imageFile) {
            form.append("imageUrl", imageFile)
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/property/create-property`, {
                method: "POST",
                body: form,
                credentials: "include"
            });
            const data = await response.json()
            console.log(data)
            if (!response.ok) {
                throw new Error('Failed to create property cause response');
            }
            alert("Property created successfully")
            setFormData({ name: "", description: "", city: "", address: "", categoryId: "" })
            setPreview(null)
            setImageFile(null)
            console.log(data)
        } catch (err) {
            console.error(err)
            alert("Failed to create property")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImageFile(file)
            setPreview(URL.createObjectURL(file))
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        const file = e.dataTransfer.files?.[0]
        if (file && file.type.startsWith('image/')) {
            setImageFile(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    return (
        <main className="bg-neutral-50 w-full min-h-screen text-neutral-800 font-sans">
            <div className="max-w-3xl mx-auto px-4 py-6 md:py-10">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <section className="bg-white rounded-2xl p-4 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                                <FaHome className="text-rose-500" size={18} />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-neutral-900">Property Details</h2>
                                <p className="text-sm text-neutral-500">Tell us about your place</p>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div className="relative">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder=" "
                                    className="peer w-full px-4 py-4 border border-neutral-300 rounded-xl focus:border-neutral-900 focus:ring-0 outline-none transition text-base placeholder-transparent"
                                />
                                <label className="absolute left-4 top-4 text-neutral-500 text-base transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-neutral-700 peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs bg-white px-1 -ml-1">
                                    Property name
                                </label>
                            </div>

                            <div className="relative">
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    placeholder=" "
                                    rows={4}
                                    className="peer w-full px-4 py-4 border border-neutral-300 rounded-xl focus:border-neutral-900 focus:ring-0 outline-none transition text-base placeholder-transparent resize-none"
                                />
                                <label className="absolute left-4 top-4 text-neutral-500 text-base transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-neutral-700 peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs bg-white px-1 -ml-1">
                                    Property description
                                </label>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    Property type
                                </label>
                                
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                                        className={`w-full flex items-center justify-between px-4 py-4 border rounded-xl transition text-left ${
                                            formData.categoryId 
                                                ? 'border-neutral-900 bg-neutral-50' 
                                                : 'border-neutral-300 hover:border-neutral-400'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <FaBuilding className={formData.categoryId ? 'text-neutral-900' : 'text-neutral-400'} size={18} />
                                            <span className={formData.categoryId ? 'text-neutral-900' : 'text-neutral-500'}>
                                                {formData.categoryId 
                                                    ? propertyCategories.find(c => c.id === formData.categoryId)?.name || 'Select type'
                                                    : 'Select property type'
                                                }
                                            </span>
                                        </div>
                                        <FaChevronDown size={14} className={`text-neutral-400 transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {isCategoryDropdownOpen && (
                                        <div className="absolute z-50 w-full mt-2 bg-white border border-neutral-200 rounded-xl shadow-lg overflow-hidden">
                                            <div className="p-3 border-b border-neutral-100">
                                                <div className="relative">
                                                    <FaMagnifyingGlass size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                                                    <input
                                                        type="text"
                                                        value={categorySearch}
                                                        onChange={(e) => setCategorySearch(e.target.value)}
                                                        placeholder="Search categories..."
                                                        className="w-full pl-9 pr-4 py-2 text-sm border border-neutral-200 rounded-lg focus:border-neutral-400 outline-none"
                                                    />
                                                </div>
                                            </div>

                                            <div className="max-h-48 overflow-y-auto">
                                                {propertyCategories
                                                    .filter(c => c.name.toLowerCase().includes(categorySearch.toLowerCase()))
                                                    .map((option) => (
                                                        <button
                                                            key={option.id}
                                                            type="button"
                                                            onClick={() => {
                                                                setFormData(prev => ({ ...prev, categoryId: option.id }))
                                                                setIsCategoryDropdownOpen(false)
                                                                setCategorySearch('')
                                                            }}
                                                            className={`w-full flex items-center justify-between px-4 py-3 hover:bg-neutral-50 transition text-left ${
                                                                formData.categoryId === option.id ? 'bg-neutral-50' : ''
                                                            }`}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <FaBuilding className="text-neutral-400" size={16} />
                                                                <span className="text-sm text-neutral-700">{option.name}</span>
                                                            </div>
                                                            {formData.categoryId === option.id && (
                                                                <FaCheck size={14} className="text-rose-500" />
                                                            )}
                                                        </button>
                                                    ))
                                                }
                                                {propertyCategories.filter(c => c.name.toLowerCase().includes(categorySearch.toLowerCase())).length === 0 && (
                                                    <p className="px-4 py-3 text-sm text-neutral-500 text-center">No categories found</p>
                                                )}
                                            </div>

                                            <div className="p-3 border-t border-neutral-100">
                                                <Link
                                                    href="/dashboard/property-categories"
                                                    className="w-full flex items-center justify-center gap-2 py-2.5 text-rose-500 font-medium text-sm hover:bg-rose-50 rounded-lg transition"
                                                >
                                                    <FaPlus size={12} />
                                                    <span>Manage categories</span>
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {isCategoryDropdownOpen && (
                                    <div 
                                        className="fixed inset-0 z-40" 
                                        onClick={() => {
                                            setIsCategoryDropdownOpen(false)
                                            setCategorySearch('')
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </section>

                    <section className="bg-white rounded-2xl p-4 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                                <FaMapMarkerAlt className="text-rose-500" size={18} />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-neutral-900">Location</h2>
                                <p className="text-sm text-neutral-500">Where is your property located?</p>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div className="relative">
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                    placeholder=" "
                                    className="peer w-full px-4 py-4 border border-neutral-300 rounded-xl focus:border-neutral-900 focus:ring-0 outline-none transition text-base placeholder-transparent"
                                />
                                <label className="absolute left-4 top-4 text-neutral-500 text-base transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-neutral-700 peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs bg-white px-1 -ml-1">
                                    City
                                </label>
                            </div>

                            <div className="relative">
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    placeholder=" "
                                    className="peer w-full px-4 py-4 border border-neutral-300 rounded-xl focus:border-neutral-900 focus:ring-0 outline-none transition text-base placeholder-transparent"
                                />
                                <label className="absolute left-4 top-4 text-neutral-500 text-base transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-neutral-700 peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs bg-white px-1 -ml-1">
                                    Full address
                                </label>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white rounded-2xl p-4 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                                <HiOutlinePhotograph className="text-rose-500" size={20} />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-neutral-900">Photos</h2>
                                <p className="text-sm text-neutral-500">Add a cover photo of your property</p>
                            </div>
                        </div>

                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`relative border-2 border-dashed rounded-2xl transition-all duration-200 ${
                                isDragging
                                    ? 'border-rose-500 bg-rose-50'
                                    : preview
                                    ? 'border-transparent'
                                    : 'border-neutral-300 hover:border-neutral-400'
                            }`}
                        >
                            {preview ? (
                                <div className="relative aspect-video rounded-xl overflow-hidden">
                                    <img
                                        src={preview}
                                        alt="Property preview"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <label className="cursor-pointer bg-white text-neutral-900 px-4 py-2 rounded-lg font-medium text-sm hover:bg-neutral-100 transition">
                                            Change photo
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                </div>
                            ) : (
                                <label className="flex flex-col items-center justify-center py-12 md:py-16 cursor-pointer">
                                    <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
                                        <FaCloudUploadAlt className="text-neutral-400" size={28} />
                                    </div>
                                    <p className="text-base font-medium text-neutral-900 mb-1">
                                        Drag and drop your photo here
                                    </p>
                                    <p className="text-sm text-neutral-500 mb-4">
                                        or click to browse
                                    </p>
                                    <span className="text-xs text-neutral-400">
                                        JPG, PNG, GIF up to 10MB
                                    </span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                            )}
                        </div>
                    </section>

                    <div className="sticky bottom-0 bg-neutral-50 pt-4 pb-6 -mx-4 px-4 md:static md:bg-transparent md:pt-0 md:pb-0 md:mx-0 md:px-0">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-rose-500 to-rose-600 text-white py-4 rounded-xl font-semibold text-base hover:from-rose-600 hover:to-rose-700 transition-all duration-200 shadow-lg shadow-rose-500/25 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Creating...
                                </span>
                            ) : (
                                'Create Property'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}
