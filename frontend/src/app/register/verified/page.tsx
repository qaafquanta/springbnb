'use client'
import { useSearchParams, useRouter } from 'next/navigation';
import {useEffect,useState, Suspense} from 'react';

function RegisterVerifiedContent() {
    const searchParams = useSearchParams()
    const router = useRouter();
    const [loading,setLoading] = useState(true)
    const [decoded,setDecoded] = useState<any>(null)
    const [formData,setFormData]= useState({
        name:"",
        password:"",
        confirmPassword:"",
        role: "CUSTOMER" 
    })
    const token = searchParams.get('token')
    
    useEffect(()=>{
        const fetchVerification = async()=>{
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/token-verification`,{
                headers:{"Content-Type":"application/json"},
                method:"POST",
                body:JSON.stringify({token})
            })
            const data = await res.json()
            setDecoded(data.decoded)
            if(data.decoded?.role) {
                setFormData(prev => ({...prev, role: data.decoded.role}))
            }
            setLoading(false)
        }
        fetchVerification()
    },[])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!decoded) return;
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email:decoded.email,
                    role:formData.role,
                    name:formData.name,
                    password:formData.password 
                }),
            });
            const data = await response.json()
            if (!response.ok) {
                throw new Error('Failed to send email cause response');
            }
            alert("Registration successful");
            router.push('/login');
            setFormData({name:"",password:"",confirmPassword:"", role: "CUSTOMER"})
        }catch(err){
            console.error(err)
            alert("Registration failed")
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    return (
            <div className="max-w-3xl w-full mx-auto p-4 flex flex-col gap-4  justify-center">
                <h1 className="text-2xl font-medium">Continue to Register</h1>
                {
                    decoded ? (
                        <p className="text-green-700">Email <span className="font-semibold">{decoded.email}</span> token verified!</p>
                    ) : (
                        <p className="text-red-700">Invalid token</p>
                    )
                }
                <form className="flex flex-col gap-4 items-center w-full justify-center" onSubmit={handleSubmit}>
                    
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">I want to register as:</label>
                        <select 
                            name="role" 
                            value={formData.role} 
                            onChange={handleChange} 
                            className="w-full p-2 border-[1px] border-neutral-300 rounded-lg active:border-rose-600 focus:border-rose-600 transition bg-white"
                        >
                            <option value="CUSTOMER">Customer (Book & Explore)</option>
                            <option value="TENANT">Tenant (List Properties)</option>
                        </select>
                    </div>

                    <input type="text" placeholder="Your name" required  onChange={(e)=>handleChange(e)} name="name" value={formData.name} className='w-full p-2 border-[1px] border-neutral-300 rounded-lg active:border-rose-600 focus:border-rose-600 transition'></input>
                    <input type="password" placeholder="Your password" required  onChange={(e)=>handleChange(e)} name="password" value={formData.password} className='w-full p-2 border-[1px] border-neutral-300 rounded-lg active:border-rose-600 focus:border-rose-600 transition'></input>
                    <input type="password" placeholder="Confirm password" required  onChange={(e)=>handleChange(e)} name="confirmPassword" value={formData.confirmPassword} className='w-full p-2 border-[1px] border-neutral-300 rounded-lg active:border-rose-600 focus:border-rose-600 transition'></input>
                    {
                        formData.password !== formData.confirmPassword ? (
                            <p className="text-red-700">Passwords do not match</p>
                        ) : (
                            <p className="text-green-700">Passwords match</p>
                        )
                    }
                    {
                        formData.password === formData.confirmPassword ? (
                            <button type="submit" className="bg-rose-600 text-white px-4 py-2 rounded-lg font-semibold tracking-wide w-full">Register</button>
                        ) : (
                            <button type="submit" className="bg-rose-600/20 text-white px-4 py-2 rounded-lg font-semibold tracking-wide w-full" disabled>Register</button>
                        )
                    }
                </form>
            </div>
  )
}

export default function RegisterVerified() {
    return (
        <main className="bg-white w-full min-h-screen text-black flex flex-col items-center justify-center font-sans">
            <Suspense fallback={<div>Loading...</div>}>
                <RegisterVerifiedContent />
            </Suspense>
        </main>
    )
}
