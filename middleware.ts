import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { supabase } from './lib/supabase'
 
export async function middleware(request: NextRequest) {
  const { data: { session }, error } = await supabase.auth.getSession()

  if(!session || error) {
    
    if (request.nextUrl.pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    if (request.nextUrl.pathname.startsWith('/visits')) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
}
 
export const config = {
  matcher: ['/admin/((?!login))*', '/visits/:path*'],
}