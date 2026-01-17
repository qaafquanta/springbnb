import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req:NextRequest){
    const {pathname} = req.nextUrl;

    if(!pathname.startsWith("/dashboard")&&!pathname.startsWith("/profile")){
        return NextResponse.next();
    }
    
    const token = req.cookies.get("authToken")?.value
    
    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if(pathname.startsWith("/profile")){
        return NextResponse.next()
    }

    try {
        const decoded: any = jwt.decode(token)
        const { role} = decoded;

        if (role !== "TENANT") {
            return NextResponse.redirect(new URL("/unauthorized", req.url));
        }

    return NextResponse.next();
    } catch (err) {
    console.log('middleware error',err)
    return NextResponse.redirect(new URL("/login", req.url));
    }
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile']
}