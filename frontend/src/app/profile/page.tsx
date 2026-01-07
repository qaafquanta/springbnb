'use client'
import useAuthStore from "@/stores/authStore";
export default function Profile() {
    const user = useAuthStore((s) => s.user);

    const handleResetPassword = async() => {
        try{
            const response = await fetch('http://localhost:8000/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: user.email,
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
    
    return (
        <main className="bg-white w-full min-h-screen text-black flex flex-col items-center justify-center font-sans">
            <h1>Profile</h1>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <p>Profile Picture: {user.profilePicture}</p>
            <div className="flex flex-row items-center gap-3 mt-10">
                <button className="bg-rose-500 text-white px-4 py-2 rounded-xl" onClick={handleResetPassword}>Reset Password</button>
                <button className="bg-rose-500 text-white px-4 py-2 rounded-xl">Logout</button>
            </div>
        </main>
    )
}