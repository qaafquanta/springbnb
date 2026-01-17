'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginComplete() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [message, setMessage] = useState('Memproses login...');

    useEffect(() => {
        const completeLogin = async () => {
            if (status === 'loading') return;

            if (status === 'unauthenticated') {
                router.push('/login');
                return;
            }

            try {
                const response = await fetch(`/api/backend/auth/google-login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: session?.user?.email,
                        name: session?.user?.name,
                        profilePicture: session?.user?.image,
                    }),
                });

                const data = await response.json();
                console.log('Login response:', data);

                if (response.ok) {
                    setMessage('Login berhasil! Mengalihkan...');
                    setTimeout(() => {
                        router.push('/');
                    }, 1000);
                } else {
                    setMessage('Gagal login: ' + (data.message || 'Unknown error'));
                }
            } catch (err) {
                console.error(err);
                setMessage('Terjadi kesalahan saat login');
            }
        };

        completeLogin();
    }, [session, status, router]);

    return (
        <main className="bg-white w-full min-h-screen text-black flex flex-col items-center justify-center font-sans">
            <div className="max-w-md w-full mx-auto p-4 flex flex-col gap-4 items-center justify-center text-center">
                <div className="w-8 h-8 border-4 border-rose-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-lg">{message}</p>
            </div>
        </main>
    );
}
