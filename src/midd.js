import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const path =request.nextUrl.pathname
    const isPublicPath = path === '/Login'

    request.cookies.get('token')?.value || ''
    if(isPublicPath && token){
        return NextResponse.redirect(new URL('Dashboard/Home', request.nextUrl))
    }
    if (!isPublicPath && !token){
        return NextResponse.redirect(new URL("/Login" ,request.nextUrl))
    }
  return NextResponse.redirect(new URL('/home', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/Dashboard/Home",
    "/Login",
    "/Dashboard/Magazine",
    "/Dashboard/Carasoul",
    "/Dashboard/Subscribers",
    "/SignUp",
  ],
}