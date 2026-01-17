'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function Register() {
    const [email, setEmail] = useState('');
    const [showGooglePopup, setShowGooglePopup] = useState(false);

    const handleEmailRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/send-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email,role:"CUSTOMER" }),
            });
            if (!response.ok) {
                throw new Error('Failed to send email cause response');
            }
            alert("Email sent successfully")
            setEmail('')
            const data = await response.json();
            console.log(data)
        }catch(err){
            console.error(err)
            alert("Failed to send email dari awal")
        }
    }

    const handleGoogleRegister = (role: 'CUSTOMER' | 'TENANT') => {
        setShowGooglePopup(false);
        localStorage.setItem('registerRole', role);
        signIn('google', { callbackUrl: '/register/complete' });
    }

    return (
        <main className="bg-white w-full min-h-screen text-black flex flex-col items-center justify-center font-sans relative">
            <div className="max-w-3xl w-full mx-auto p-4 flex flex-col gap-4 justify-center">
                <h1 className="text-2xl font-medium">Welcome to Springbnb</h1>
                
                <form className="flex flex-col gap-4 items-center w-full justify-center" onSubmit={handleEmailRegister}>
                    <div className="w-full">
                         <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email register</label>
                        <input 
                            type="email" 
                            placeholder="Email" 
                            required 
                            onChange={(e) => setEmail(e.target.value)} 
                            value={email} 
                            className='w-full p-2 border-[1px] border-neutral-300 rounded-lg active:border-rose-600 focus:border-rose-600 transition'
                        />
                    </div>
                    <button type="submit" className="bg-rose-600 text-white px-4 py-2 rounded-lg font-semibold tracking-wide w-full hover:bg-rose-700 transition">Continue</button>
                </form>

                <div className="flex items-center gap-4">
                    <div className="flex-1 h-[1px] bg-gray-300"></div>
                    <span className="text-gray-500 text-sm">atau</span>
                    <div className="flex-1 h-[1px] bg-gray-300"></div>
                </div>
                
                <div className="relative w-full">
                    <button 
                        onClick={() => setShowGooglePopup(!showGooglePopup)}
                        className="flex items-center justify-center gap-3 w-full p-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        <span className="font-medium">Register with Google</span>
                    </button>
                    
                    {showGooglePopup && (
                        <>
                            <div 
                                className="fixed inset-0 bg-black/30 z-40"
                                onClick={() => setShowGooglePopup(false)}
                            />
                            
                            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                                <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] p-6 w-full max-w-md animate-in fade-in zoom-in duration-200">
                                    <div className="flex justify-between items-center mb-6">
                                        <div className="flex items-center gap-3">
                                            <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                            </svg>
                                            <h3 className="font-semibold text-lg">Register with Google</h3>
                                        </div>
                                        <button 
                                            onClick={() => setShowGooglePopup(false)}
                                            className="text-gray-400 hover:text-gray-600 transition"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                <div className="flex flex-col gap-3">
                                    <button
                                        onClick={() => handleGoogleRegister('CUSTOMER')}
                                        className="flex items-center gap-3 w-full p-3 rounded-lg border border-gray-200 hover:border-rose-300 hover:bg-rose-50 transition group"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center group-hover:bg-rose-200 transition">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rose-600" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="text-left">
                                            <p className="font-medium text-gray-900">Register as Customer</p>
                                            <p className="text-sm text-gray-500">Book and explore properties</p>
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => handleGoogleRegister('TENANT')}
                                        className="flex items-center gap-3 w-full p-3 rounded-lg border border-gray-200 hover:border-rose-300 hover:bg-rose-50 transition group"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center group-hover:bg-rose-200 transition">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rose-600" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                            </svg>
                                        </div>
                                        <div className="text-left">
                                            <p className="font-medium text-gray-900">Register as Tenant</p>
                                            <p className="text-sm text-gray-500">List and manage your properties</p>
                                        </div>
                                    </button>
                                </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className="mt-2 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link href="/login" className="text-rose-600 hover:underline font-medium">
                        Login
                    </Link>
                </div>
            </div>
        </main>
    )
}