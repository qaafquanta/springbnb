import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

async function proxy(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;
  
  const { path } = await params;
  const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/${path.join("/")}`;
  const searchParams = request.nextUrl.searchParams.toString();
  const finalUrl = searchParams ? `${backendUrl}?${searchParams}` : backendUrl;

  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.delete("connection");
  
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  let body: any = undefined;
  if (request.method !== 'GET' && request.method !== 'HEAD') {
      try {
          body = await request.clone().arrayBuffer(); 
      } catch (e) {
      }
  }

  try {
    const res = await fetch(finalUrl, {
      method: request.method,
      headers: headers,
      body: body,
    });

    const data = await res.arrayBuffer();

    return new NextResponse(data, {
      status: res.status,
      headers: res.headers,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Proxy Error", error: String(error) },
      { status: 500 }
    );
  }
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
