'use client';

import { FaCamera, FaSignOutAlt } from 'react-icons/fa';

interface ProfileHeaderProps {
    user: any;
    isEditing: boolean;
    setIsEditing: (value: boolean) => void;
    onLogout: () => void;
}

const ProfileHeader = ({ user, isEditing, setIsEditing, onLogout }: ProfileHeaderProps) => {
    return (
        <div className="bg-white border-b border-neutral-200">
            <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="relative">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-neutral-200 border-4 border-white shadow-lg">
                            {user.profilePicture ? (
                                <img 
                                    src={user.profilePicture} 
                                    alt="Profile" 
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-rose-400 to-rose-600">
                                    <span className="text-4xl md:text-5xl font-bold text-white">
                                        {user.name?.charAt(0)?.toUpperCase() || "U"}
                                    </span>
                                </div>
                            )}
                        </div>
                        {!isEditing && (
                            <button 
                                onClick={() => setIsEditing(true)}
                                className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-neutral-100 transition border border-neutral-200"
                            >
                                <FaCamera className="text-neutral-600" size={16} />
                            </button>
                        )}
                    </div>
                    
                    <div className="text-center md:text-left">
                        <h1 className="text-2xl md:text-3xl font-semibold text-neutral-900">
                            {user.name || "User"}
                        </h1>
                        <p className="text-neutral-500 mt-1">{user.email}</p>
                        <span className="inline-block mt-2 px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-sm font-medium">
                            {user.role}
                        </span>
                    </div>

                    <div className="md:ml-auto mt-4 md:mt-0">
                            <button 
                            onClick={onLogout}
                            className="flex items-center gap-2 px-4 py-2 border border-neutral-200 text-neutral-600 rounded-xl hover:bg-neutral-50 hover:text-red-500 hover:border-red-200 transition-all group"
                        >
                            <FaSignOutAlt className="group-hover:text-red-500 transition-colors" />
                            <span className="font-medium">Sign Out</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
