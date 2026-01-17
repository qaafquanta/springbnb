'use client';

import { FaUser, FaEnvelope } from 'react-icons/fa';

interface ProfileInfoCardProps {
    user: any;
    onEdit: () => void;
}

const ProfileInfoCard = ({ user, onEdit }: ProfileInfoCardProps) => {
    return (
        <section className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                        <FaUser className="text-rose-500" size={16} />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-neutral-900">Personal Info</h2>
                        <p className="text-sm text-neutral-500">Your account information</p>
                    </div>
                </div>
                <button 
                    onClick={onEdit}
                    className="text-rose-500 font-medium text-sm hover:underline"
                >
                    Edit
                </button>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                    <div>
                        <p className="text-sm text-neutral-500">Full Name</p>
                        <p className="text-neutral-900 font-medium">{user.name || "-"}</p>
                    </div>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                    <div>
                        <p className="text-sm text-neutral-500">Email Address</p>
                        <p className="text-neutral-900 font-medium">{user.email || "-"}</p>
                    </div>
                    <FaEnvelope className="text-neutral-400" size={16} />
                </div>
                <div className="flex items-center justify-between py-3">
                    <div>
                        <p className="text-sm text-neutral-500">Account Type</p>
                        <p className="text-neutral-900 font-medium">{user.role || "-"}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfileInfoCard;
