'use client'
import { useSearchParams } from 'next/navigation';
import {useEffect,useState} from 'react';

export default function RegisterVerified() {
    const searchParams = useSearchParams()
    const [loading,setLoading] = useState(true)
    const [decoded,setDecoded] = useState(null)
    const [formData,setFormData]= useState({
        email:"",
        password:"",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:8000/auth/login', {
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
            alert("Login successfully")
            setFormData({email:"",password:""})
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
                <h1 className="text-2xl font-medium">Login</h1>
                <form className="flex flex-col gap-4 items-center w-full justify-center" onSubmit={handleSubmit}>
                    <input type="email" placeholder="Your email" required  onChange={(e)=>handleChange(e)} name="email" value={formData.email} className='w-full p-2 border-[1px] border-neutral-300 rounded-lg active:border-rose-600 focus:border-rose-600 transition'></input>
                    <input type="password" placeholder="Your password" required  onChange={(e)=>handleChange(e)} name="password" value={formData.password} className='w-full p-2 border-[1px] border-neutral-300 rounded-lg active:border-rose-600 focus:border-rose-600 transition'></input>
                    <button type="submit" className="bg-rose-600 text-white px-4 py-2 rounded-lg font-semibold tracking-wide w-full" >Login</button>
                </form>
            </div>
        </main>
  )
}
