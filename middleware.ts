import { NextResponse, NextRequest } from 'next/server'
import { createClient } from './lib/supabase/server'

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  const supabase = createClient(request)

  const { data: { session }, error } = await supabase.auth.getSession()

  if(error) {
    supabase.auth.signOut()
    console.error(`[Error] ${error}`)
    return NextResponse.error()
  }

  if(!session && (request.nextUrl.pathname.startsWith('/admin') || request.nextUrl.pathname.startsWith('/visits'))) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
  } else if (!session) {
    return NextResponse.next()
  }

  const { data: userRole} = await supabase.from("user_staff_roles").select("staff_role").eq("id", session.user.id).limit(1).maybeSingle();
  const { data: customUser} = await supabase.from("users").select("id").eq("id", session.user.id).limit(1).maybeSingle();
  
  if(!request.nextUrl.pathname.startsWith("/admin/setup") && !customUser) {
    return NextResponse.redirect(new URL("/admin/setup", request.url))  
  }
  
  if(request.nextUrl.pathname.startsWith("/admin/setup") && customUser) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  if (request.nextUrl.pathname.startsWith('/auth/login')) {
    if(userRole?.staff_role) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }

    return NextResponse.redirect(new URL('/visits', request.url))
  }

  return NextResponse.next()
}
 
export const config = {
  matcher: ['/:path*'],
}