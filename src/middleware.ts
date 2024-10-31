import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { NextResponse } from 'next/server';

const protectedRoutes = ['/middleware'];

const { auth } = NextAuth(authConfig);

export default auth(function middleware(req) {
  const isProtected = protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route));

  if (!req.auth && isProtected) {
    return NextResponse.redirect(new URL('/', req.nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
};
