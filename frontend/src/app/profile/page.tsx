'use client'
import { useRouter } from "next/navigation";
import { useState } from 'react';
import useAuthStore from "@/stores/authStore";
import ProfileHeader from "@/components/profile/ProfileHeader";
import EditProfileForm from "@/components/profile/EditProfileForm";
import ProfileInfoCard from "@/components/profile/ProfileInfoCard";
import SecurityCard from "@/components/profile/SecurityCard";

export default function Profile() {
    const user = useAuthStore((s) => s.user);
    const updateUser = useAuthStore((s) => s.updateUser);
    const clearUser = useAuthStore((s) => s.clearUser);
    const router = useRouter();
    
    const [isEditing, setIsEditing] = useState(false);

    const handleLogout = async () => {
        try {
            await fetch(`/api/backend/auth/logout`, {
                method: 'POST'
            });
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            clearUser();
            router.push("/login");
            router.refresh();
        }
    }

    const handleResetPassword = async() => {
        try{
            const response = await fetch(`/api/backend/auth/reset-password-send-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: user?.email,
                }),
            });
            const data = await response.json();
            console.log(data);
            alert("Reset password email sent successfully")
        }
        catch(err){
            console.log(err);
            alert("Failed to send reset password email")
        }
    }

    const handleChangeEmail = async() => {
        try{
            const response = await fetch(`/api/backend/auth/change-email-send-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: user?.email,
                }),
            });
            const data = await response.json();
            console.log(data);
            alert("Change email link send successfully")
        }catch(err){
            console.log(err);
            alert("Failed to send change email link")
        }
    }

    return (
        <main className="pt-20 bg-neutral-50 w-full min-h-screen text-neutral-800 font-sans">
            <ProfileHeader 
                user={user} 
                isEditing={isEditing} 
                setIsEditing={setIsEditing} 
                onLogout={handleLogout} 
            />

            <div className="max-w-4xl mx-auto px-4 py-8">
                {isEditing ? (
                    <EditProfileForm 
                        user={user} 
                        onCancel={() => setIsEditing(false)}
                        onSuccess={(updatedUser) => {
                            updateUser(updatedUser);
                            setIsEditing(false);
                        }}
                    />
                ) : (
                    <div className="space-y-6">
                        <ProfileInfoCard user={user} onEdit={() => setIsEditing(true)} />
                        <SecurityCard 
                            user={user} 
                            onResetPassword={handleResetPassword} 
                            onChangeEmail={handleChangeEmail} 
                        />
                    </div>
                )}
            </div>
        </main>
    )
}