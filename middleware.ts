import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from './lib/supabase/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createClient(request)

  const { data: { session }, error } = await supabase.auth.getSession()

  if(error) {
    // TODO: Call sign-out function
    console.error(`[Error] ${error}`)
    return NextResponse.error()
  }

  if(!session && (request.nextUrl.pathname.startsWith('/admin') || request.nextUrl.pathname.startsWith('/visits'))) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
  } else if (!session) {
    return response
  }

  const customUser = await supabase.from("user_staff_roles").select("staff_role").eq("user_id", session.user.id).limit(1).maybeSingle();
  
  if (request.nextUrl.pathname.startsWith('/auth/login')) {
    if(customUser && customUser.data?.staff_role) {
      // TODO: If custom fields not filled out, redirect to setup form

      return NextResponse.redirect(new URL('/admin', request.url))
    }

    return NextResponse.redirect(new URL('/visits', request.url))
  }
  
  return response
}
 
export const config = {
  matcher: ['/:path*'],
}