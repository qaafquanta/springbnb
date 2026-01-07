'use client';
import { useState } from 'react';
export default function Register() {
    const [email, setEmail] = useState('');
    const handleEmailRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:8000/auth/send-email', {
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
    return (
        <main className="bg-white w-full min-h-screen text-black flex flex-col items-center justify-center font-sans">
            <div className="max-w-3xl w-full mx-auto p-4 flex flex-col gap-4  justify-center">
                <h1 className="text-2xl font-medium">Welcome to Springbnb</h1>
                <form className="flex flex-col gap-4 items-center w-full justify-center" onSubmit={handleEmailRegister}>
                    <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} value={email} className='w-full p-2 border-[1px] border-neutral-300 rounded-lg active:border-rose-600 focus:border-rose-600 transition'></input>
                    <button type="submit" className="bg-rose-600 text-white px-4 py-2 rounded-lg font-semibold tracking-wide w-full">Continue</button>
                </form>
            </div>
        </main>
    )
}