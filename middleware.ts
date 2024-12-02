import { clerkMiddleware, getAuth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { adminEmails } from './utils/roles'; // Ensure this file exists and contains admin emails

// Middleware to protect admin routes
export default clerkMiddleware(async (auth, req) => {
  

  // Check if the requested path starts with "/admin"
  const isProtectedRoute = req.nextUrl.pathname.startsWith('/admin');
  

  if (isProtectedRoute) {
    const { userId } = auth(); // Get auth data
    
    // If the user is not authenticated, redirect to sign-in
    if (!userId) {
      
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    // Fetch user details from Clerk
    const user = await clerkClient.users.getUser(userId);
    const userEmail = user.emailAddresses?.[0]?.emailAddress || ''; // Access user's primary email
    


    // Check if the user is an admin
    const isAdmin = adminEmails.includes(userEmail);


    // Redirect non-admin users trying to access /admin routes
    if (!isAdmin) {
      
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  
  return NextResponse.next();
});

// Configuration for middleware to match specific routes
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
    '/admin/:path*', // This should still match all admin routes
  ],
};
