'use client';

import { useState } from 'react';
import { HiOutlinePencil, HiOutlineCheck, HiOutlineX } from 'react-icons/hi';
import { FaCloudUploadAlt } from 'react-icons/fa';

interface EditProfileFormProps {
    user: any;
    onCancel: () => void;
    onSuccess: (updatedUser: any) => void;
}

const EditProfileForm = ({ user, onCancel, onSuccess }: EditProfileFormProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: user.name || "",
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const form = new FormData();
        form.append("name", formData.name);
        if (imageFile) {
            form.append("profilePicture", imageFile);
        }
        
        try {
            const response = await fetch(`/api/backend/auth/update-profile`, {
                method: "PUT",
                body: form
            });
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error('Failed to update profile');
            }
            
            alert("Profile updated successfully");
            onSuccess(data.user);
        } catch (err) {
            console.error(err);
            alert("Failed to update profile");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <section className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                            <HiOutlinePencil className="text-rose-500" size={18} />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-neutral-900">Edit Profile</h2>
                            <p className="text-sm text-neutral-500">Update your profile information</p>
                        </div>
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
                            Full Name
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Profile Picture
                        </label>
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
                                <div className="relative aspect-square max-w-[200px] mx-auto rounded-xl overflow-hidden">
                                    <img
                                        src={preview}
                                        alt="Preview"
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
                                <label className="flex flex-col items-center justify-center py-8 cursor-pointer">
                                    <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center mb-3">
                                        <FaCloudUploadAlt className="text-neutral-400" size={24} />
                                    </div>
                                    <p className="text-sm font-medium text-neutral-900 mb-1">
                                        Drag and drop your photo here
                                    </p>
                                    <p className="text-xs text-neutral-500">
                                        or click to browse
                                    </p>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 mt-6">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 px-4 py-3 border border-neutral-300 rounded-xl font-medium text-neutral-700 hover:bg-neutral-50 transition flex items-center justify-center gap-2"
                    >
                        <HiOutlineX size={18} />
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-gradient-to-r from-rose-500 to-rose-600 text-white px-4 py-3 rounded-xl font-medium hover:from-rose-600 hover:to-rose-700 transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Saving...
                            </span>
                        ) : (
                            <>
                                <HiOutlineCheck size={18} />
                                Save Changes
                            </>
                        )}
                    </button>
                </div>
            </section>
        </form>
    );
};

export default EditProfileForm;
