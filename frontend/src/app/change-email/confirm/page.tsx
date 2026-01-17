'use client'
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

function ConfirmContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState("")
    const [userData, setUserData] = useState<{email: string, name: string} | null>(null)
    
    const token = searchParams.get('token')
    
    useEffect(()=>{
        const confirmEmail = async()=>{
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/confirm-change-email`,{
                    headers:{"Content-Type":"application/json"},
                    method:"POST",
                    body:JSON.stringify({token})
                })
                const data = await res.json()
                console.log(data)
                
                if (data.success) {
                    setSuccess(true)
                    setUserData(data.user)
                } else {
                    setError(data.message || "Failed to confirm email change")
                }
            } catch (err) {
                console.error(err)
                setError("Failed to confirm email change")
            } finally {
                setLoading(false)
            }
        }
        if (token) {
            confirmEmail()
        } else {
            setError("No token provided")
            setLoading(false)
        }
    },[token])

    if (loading) {
        return (
            <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-neutral-500 text-sm">Confirming your new email...</p>
            </div>
        )
    }

    return (
        <div className="max-w-md w-full mx-auto p-6 flex flex-col gap-4 justify-center text-center">
            {success ? (
                <>
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-semibold text-neutral-900">Email Changed Successfully!</h1>
                    <p className="text-neutral-600">
                        Your email has been changed to <strong className="text-neutral-900">{userData?.email}</strong>
                    </p>
                    <p className="text-sm text-neutral-500">
                        Please login with your new email address.
                    </p>
                    <button
                        onClick={() => router.push('/login')}
                        className="mt-4 bg-gradient-to-r from-rose-500 to-rose-600 text-white py-4 rounded-xl font-semibold text-base hover:from-rose-600 hover:to-rose-700 transition-all duration-200 shadow-lg shadow-rose-500/25"
                    >
                        Go to Login
                    </button>
                </>
            ) : (
                <>
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                        <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-semibold text-neutral-900">Confirmation Failed</h1>
                    <p className="text-neutral-600">{error}</p>
                    <p className="text-sm text-neutral-500">
                        The confirmation link may be invalid or expired. Please try again.
                    </p>
                    <button
                        onClick={() => router.push('/profile')}
                        className="mt-4 bg-neutral-200 text-neutral-700 py-4 rounded-xl font-semibold text-base hover:bg-neutral-300 transition-all duration-200"
                    >
                        Back to Profile
                    </button>
                </>
            )}
        </div>
    )
}

export default function ConfirmChangeEmail() {
    return (
        <main className="bg-white w-full min-h-screen text-black flex flex-col items-center justify-center font-sans">
            <Suspense fallback={
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-neutral-500 text-sm">Loading...</p>
                </div>
            }>
                <ConfirmContent />
            </Suspense>
        </main>
    )
}
