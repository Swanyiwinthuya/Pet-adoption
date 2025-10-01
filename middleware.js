import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      const { pathname } = req.nextUrl;

      // Admin-only area
      if (pathname.startsWith('/admin')) {
        return !!token && token.role === 'admin';
      }

      // Logged-in users area
      if (pathname.startsWith('/dashboard')) {
        return !!token;
      }

      return true;
    },
  },
  pages: { signIn: '/login' },
});

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
};
