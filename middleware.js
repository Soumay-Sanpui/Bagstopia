import { NextResponse } from 'next/server';

export function middleware(request) {
    const path = request.nextUrl.pathname;
    const protectedRoutes = ['/cart'];
    const isProtectedRoute = protectedRoutes.includes(path);
    
    // Get and parse the user cookie
    const userCookie = request.cookies.get('user');
    const user = userCookie ? JSON.parse(userCookie.value) : null;

    if (isProtectedRoute && !user) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if ((path ===  '/login' || path ===  '/register') && user) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/cart', '/login', '/register']
}; 