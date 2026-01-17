'use client';

import { FaShieldAlt, FaGoogle, FaEnvelope } from 'react-icons/fa';

interface SecurityCardProps {
    user: any;
    onResetPassword: () => void;
    onChangeEmail: () => void;
}

const SecurityCard = ({ user, onResetPassword, onChangeEmail }: SecurityCardProps) => {
    return (
        <section className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                    <FaShieldAlt className="text-rose-500" size={16} />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-neutral-900">Login & Security</h2>
                    <p className="text-sm text-neutral-500">Manage your security preferences</p>
                </div>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                <div>
                    <p className="text-neutral-900 font-medium">Login Method</p>
                    <p className="text-sm text-neutral-500">How you log in to your account</p>
                </div>
                <div className="flex items-center gap-2 text-neutral-600 font-medium">
                    {user.provider === "GOOGLE" ? (
                        <>
                            <FaGoogle className="text-blue-500" />
                            <span>Google</span>
                        </>
                    ) : (
                        <>
                            <FaEnvelope className="text-neutral-400" />
                            <span>Email</span>
                        </>
                    )}
                </div>
            </div>

            {user.provider !== "GOOGLE" && (
                <>
                    <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                        <div>
                            <p className="text-neutral-900 font-medium">Password</p>
                            <p className="text-sm text-neutral-500">Reset your password via email</p>
                        </div>
                        <button 
                            onClick={onResetPassword}
                            className="px-4 py-2 border border-neutral-300 rounded-xl font-medium text-sm text-neutral-700 hover:bg-neutral-50 transition"
                        >
                            Reset Password
                        </button>
                    </div>
                    <div className="flex items-center justify-between py-3">
                        <div>
                            <p className="text-neutral-900 font-medium">Email</p>
                            <p className="text-sm text-neutral-500">Change your email address</p>
                        </div>
                        <button 
                            onClick={onChangeEmail}
                            className="px-4 py-2 border border-neutral-300 rounded-xl font-medium text-sm text-neutral-700 hover:bg-neutral-50 transition"
                        >
                            Change Email
                        </button>
                    </div>
                </>
            )}
        </section>
    );
};

export default SecurityCard;
