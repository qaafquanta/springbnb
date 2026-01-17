'use client'
import { useSearchParams, useRouter } from 'next/navigation';
import {useEffect,useState, Suspense} from 'react';

function ChangeEmailVerifiedContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [loading,setLoading] = useState(true)
    const [decoded,setDecoded] = useState<{userId: string, currentEmail: string} | null>(null)
    const [newEmail, setNewEmail] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    
    const token = searchParams.get('token')
    
    useEffect(()=>{
        const fetchVerification = async()=>{
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-change-email-token`,{
                    headers:{"Content-Type":"application/json"},
                    method:"POST",
                    body:JSON.stringify({token})
                })
                const data = await res.json()
                if (data.decoded) {
                    setDecoded(data.decoded)
                }
                console.log(data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        if (token) {
            fetchVerification()
        } else {
            setLoading(false)
        }
    },[token])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!decoded) return;
        
        setIsSubmitting(true)
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/change-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    userId: decoded.userId,
                    newEmail: newEmail 
                }),
            });
            const data = await response.json()
            console.log(data)
            if (!response.ok) {
                throw new Error(data.message || 'Failed to send confirmation email');
            }
            alert("Confirmation email sent to your new email address. Please check your inbox and click the confirmation link.")
        }catch(err: any){
            console.error(err)
            alert(err.message || "Failed to send confirmation email")
        } finally {
            setIsSubmitting(false)
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-neutral-500 text-sm">Verifying token...</p>
            </div>
        )
    }

    return (
        <div className="max-w-md w-full mx-auto p-6 flex flex-col gap-4 justify-center">
            <h1 className="text-2xl font-semibold text-center">Change Your Email</h1>
            {
                decoded ? (
                    <>
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                            <p className="text-green-700 text-sm">
                                Token verified! Current email: <span className="font-semibold">{decoded.currentEmail}</span>
                            </p>
                        </div>
                        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                            <div className="relative">
                                <input 
                                    type="email" 
                                    placeholder=" " 
                                    required  
                                    onChange={(e) => setNewEmail(e.target.value)} 
                                    value={newEmail} 
                                    className='peer w-full px-4 py-4 border border-neutral-300 rounded-xl focus:border-neutral-900 focus:ring-0 outline-none transition text-base placeholder-transparent'
                                />
                                <label className="absolute left-4 top-4 text-neutral-500 text-base transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-neutral-700 peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs bg-white px-1 -ml-1">
                                    New email address
                                </label>
                            </div>
                            <button 
                                type="submit" 
                                disabled={isSubmitting || !newEmail}
                                className="bg-gradient-to-r from-rose-500 to-rose-600 text-white py-4 rounded-xl font-semibold text-base hover:from-rose-600 hover:to-rose-700 transition-all duration-200 shadow-lg shadow-rose-500/25 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Changing...
                                    </span>
                                ) : (
                                    'Change Email'
                                )}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                        <p className="text-red-700">Invalid or expired token. Please request a new email change link.</p>
                    </div>
                )
            }
        </div>
    )
}

export default function ChangeEmailVerified() {
    return (
        <main className="bg-white w-full min-h-screen text-black flex flex-col items-center justify-center font-sans">
            <Suspense fallback={
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-neutral-500 text-sm">Loading...</p>
                </div>
            }>
                <ChangeEmailVerifiedContent />
            </Suspense>
        </main>
    )
}
