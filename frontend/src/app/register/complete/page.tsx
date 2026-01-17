'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function RegisterComplete() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('Memproses pendaftaran...');

    useEffect(() => {
        const completeRegistration = async () => {
            if (status === 'loading') return;

            if (status === 'unauthenticated') {
                router.push('/register');
                return;
            }

            const role = localStorage.getItem('registerRole') || 'CUSTOMER';
            localStorage.removeItem('registerRole');

            try {
                const response = await fetch(`/api/backend/auth/google-register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: session?.user?.email,
                        name: session?.user?.name,
                        profilePicture: session?.user?.image,
                        role: role,
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    setMessage('Pendaftaran berhasil! Mengalihkan...');
                    setTimeout(() => {
                        router.push('/');
                    }, 1500);
                } else {
                    setMessage('Gagal mendaftar: ' + (data.message || 'Unknown error'));
                    setLoading(false);
                }
            } catch (err) {
                console.error(err);
                setMessage('Terjadi kesalahan saat mendaftar');
                setLoading(false);
            }
        };

        completeRegistration();
    }, [session, status, router]);

    return (
        <main className="bg-white w-full min-h-screen text-black flex flex-col items-center justify-center font-sans">
            <div className="max-w-md w-full mx-auto p-4 flex flex-col gap-4 items-center justify-center text-center">
                {loading && (
                    <div className="w-8 h-8 border-4 border-rose-600 border-t-transparent rounded-full animate-spin"></div>
                )}
                <p className="text-lg">{message}</p>
            </div>
        </main>
    );
}
