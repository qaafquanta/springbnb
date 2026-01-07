'use client'
import { useSearchParams } from 'next/navigation';
import {useEffect,useState} from 'react';

export default function RegisterVerified() {
    const searchParams = useSearchParams()
    const [loading,setLoading] = useState(true)
    const [decoded,setDecoded] = useState(null)
    const [formData,setFormData]= useState({
        password:"",
        confirmPassword:""
    })
    const token = searchParams.get('token')
    useEffect(()=>{
        const fetchVerification = async()=>{
            const res = await fetch('http://localhost:8000/auth/verify-reset-password-token',{
                headers:{"Content-Type":"application/json"},
                method:"POST",
                body:JSON.stringify({token})
            })
            const data = await res.json()
            setDecoded(data.decoded)
            setLoading(false)
            console.log(data)
        }
        fetchVerification()
    },[])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("EMAIL",decoded.email)
        try{
            const response = await fetch('http://localhost:8000/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email:decoded.email,
                    password:formData.password 
                }),
            });
            const data = await response.json()
            console.log(data)
            if (!response.ok) {
                throw new Error('Failed to send email cause response');
            }
            alert("Password reset successfully")
            setFormData({password:"",confirmPassword:""})
            console.log(data)
        }catch(err){
            console.error(err)
            alert("Failed to send email dari awal")
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    return (
    <main className="bg-white w-full min-h-screen text-black flex flex-col items-center justify-center font-sans">
            <div className="max-w-3xl w-full mx-auto p-4 flex flex-col gap-4  justify-center">
                <h1 className="text-2xl font-medium">Reset Your Password</h1>
                {
                    decoded ? (
                        <p className="text-green-700"><span className="font-semibold">{decoded.email}</span> Reset password token verified!</p>
                    ) : (
                        <p className="text-red-700">Invalid token</p>
                    )
                }
                <form className="flex flex-col gap-4 items-center w-full justify-center" onSubmit={handleSubmit}>
                    <input type="password" placeholder="Enter new password" required  onChange={(e)=>handleChange(e)} name="password" value={formData.password} className='w-full p-2 border-[1px] border-neutral-300 rounded-lg active:border-rose-600 focus:border-rose-600 transition'></input>
                    <input type="password" placeholder="Confirm new password" required  onChange={(e)=>handleChange(e)} name="confirmPassword" value={formData.confirmPassword} className='w-full p-2 border-[1px] border-neutral-300 rounded-lg active:border-rose-600 focus:border-rose-600 transition'></input>
                    {
                        formData.password !== formData.confirmPassword ? (
                            <p className="text-red-700">Passwords do not match</p>
                        ) : (
                            <p className="text-green-700">Passwords match</p>
                        )
                    }
                    {
                        formData.password === formData.confirmPassword ? (
                            <button type="submit" className="bg-rose-600 text-white px-4 py-2 rounded-lg font-semibold tracking-wide w-full">Reset Password</button>
                        ) : (
                            <button type="submit" className="bg-rose-600/20 text-white px-4 py-2 rounded-lg font-semibold tracking-wide w-full" disabled>Reset Password</button>
                        )
                    }
                </form>
            </div>
        </main>
  )
}
