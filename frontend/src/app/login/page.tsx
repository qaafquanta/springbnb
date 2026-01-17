'use client'
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {useEffect,useState, Suspense} from 'react';
import { signIn } from 'next-auth/react';
import useAuthStore from "@/stores/authStore";

function LoginContent() {
    const searchParams = useSearchParams()
    const router = useRouter();
    const login = useAuthStore((state) => state.login);
    const [formData,setFormData]= useState({
        email:"",
        password:"",
    })

    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
    const [isSendingLink, setIsSendingLink] = useState(false);

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSendingLink(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password-send-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: forgotPasswordEmail,
                }),
            });
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to send reset link');
            }
            alert("Reset password email sent successfully. Please check your inbox.");
            setShowForgotPassword(false);
            setForgotPasswordEmail("");
        } catch (err: any) {
            console.error(err);
            alert(err.message || "Failed to send reset password email");
        } finally {
            setIsSendingLink(false);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email:formData.email,
                    password:formData.password 
                }),
            });
            const data = await response.json()
            console.log(data)
            if (!response.ok) {
                throw new Error('Failed to fetch');
            }
            alert("Login successfully");
            
            if(data.result) {
                login(data.result);
                
                if (data.result.role === 'TENANT') {
                    router.push('/dashboard');
                } else {
                    router.push('/profile');
                }
            } else {
                router.push('/');
            }

            setFormData({email:"",password:""})
        }catch(err){
            console.error(err)
            alert("Failed to login")
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleGoogleLogin = () => {
        signIn('google', { callbackUrl: '/login/complete' });
    };

    return (
        <div className="max-w-3xl w-full mx-auto p-4 flex flex-col gap-4 justify-center">
            <h1 className="text-2xl font-medium">Login</h1>
            <form className="flex flex-col gap-4 items-center w-full justify-center" onSubmit={handleSubmit}>
                <input type="email" placeholder="Your email" required onChange={(e)=>handleChange(e)} name="email" value={formData.email} className='w-full p-2 border-[1px] border-neutral-300 rounded-lg active:border-rose-600 focus:border-rose-600 transition'></input>
                <div className="w-full">
                    <input type="password" placeholder="Your password" required onChange={(e)=>handleChange(e)} name="password" value={formData.password} className='w-full p-2 border-[1px] border-neutral-300 rounded-lg active:border-rose-600 focus:border-rose-600 transition'></input>
                    <div className="flex justify-end mt-2">
                            <button type="button" onClick={() => setShowForgotPassword(true)} className="text-sm text-rose-500 hover:underline">
                            Forgot password?
                        </button>
                    </div>
                </div>
                <button type="submit" className="bg-rose-600 text-white px-4 py-2 rounded-lg font-semibold tracking-wide w-full">Login</button>
            </form>

            {showForgotPassword && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl animate-in fade-in zoom-in duration-200">
                        <h2 className="text-xl font-bold mb-2">Reset Password</h2>
                        <p className="text-sm text-gray-500 mb-4">Enter your email address and we'll send you a link to reset your password.</p>
                        
                        <form onSubmit={handleForgotPassword} className="flex flex-col gap-4">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                required 
                                value={forgotPasswordEmail}
                                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                                className="w-full p-3 border border-neutral-300 rounded-xl focus:border-rose-600 focus:ring-1 focus:ring-rose-600 outline-none transition"
                            />
                            
                            <div className="flex gap-3 mt-2">
                                <button 
                                    type="button" 
                                    onClick={() => setShowForgotPassword(false)}
                                    className="flex-1 py-2.5 border border-neutral-300 rounded-xl font-medium hover:bg-neutral-50 transition"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={isSendingLink}
                                    className="flex-1 py-2.5 bg-rose-600 text-white rounded-xl font-medium hover:bg-rose-700 transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {isSendingLink ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        "Send Reset Link"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="flex items-center gap-4">
                <div className="flex-1 h-[1px] bg-gray-300"></div>
                <span className="text-gray-500 text-sm">atau</span>
                <div className="flex-1 h-[1px] bg-gray-300"></div>
            </div>

            <button 
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-3 w-full p-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="font-medium">Login with Google</span>
            </button>

            <div className="mt-2 text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/register" className="text-rose-600 hover:underline font-medium">
                    Register
                </Link>
            </div>
        </div>
    )
}

export default function Login() {
    return (
        <main className="bg-white w-full min-h-screen text-black flex flex-col items-center justify-center font-sans relative">
            <Suspense fallback={<div>Loading...</div>}>
                <LoginContent />
            </Suspense>
        </main>
    )
}
