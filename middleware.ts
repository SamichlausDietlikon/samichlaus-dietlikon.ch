import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from './lib/supabase/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createClient(request)

  const { data: { user }, error } = await supabase.auth.getUser()

  
  if(!user || error) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
  }
  
  const customUser = await supabase.from("users").select("staff_role").eq("id", user.id).limit(1).maybeSingle();

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