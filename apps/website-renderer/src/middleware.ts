import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const tenantSlug = request.headers.get('x-tenant-slug');
  const response = NextResponse.next();

  if (tenantSlug) {
    // Forward tenant slug as a cookie so server components can read it
    response.cookies.set('tenant-slug', tenantSlug, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    });
    response.headers.set('x-tenant-slug', tenantSlug);
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
