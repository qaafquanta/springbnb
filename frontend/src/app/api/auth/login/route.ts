// src/app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json(); // Ambil email/pass dari form login

  // 1. Server Next.js nembak ke Backend Railway
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  // Kalau login di Railway gagal, balikin error ke frontend
  if (!res.ok) {
    return NextResponse.json(data, { status: res.status });
  }

  // 2. DISINI KITA SET COOKIE NYA (Pengganti res.cookie backend)
  (await cookies()).set("authToken", data.token, {
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60,
  });

  return NextResponse.json({ success: true, user: data.user });
}