import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Clerk middleware for specific API routes such as Stripe's checkout or webhook routes
    '/((?!api/checkout|api/webhook|_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Apply to other API routes, except the ones we excluded above
    '/(api|trpc)(.*)',
  ],
};
