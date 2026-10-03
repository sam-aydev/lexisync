import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "./app/lib/util/supabase/server";

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = await createClient();

  // 1. Fetch the user session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isAuthPage = pathname.startsWith("/auth");
  const unProtectedPage = pathname === "/" || pathname.startsWith("/blog");
  const isProtectedApp = pathname.startsWith("/app");
  const isOnboardingPage = pathname === "/app/onboarding";

  // 2. Unauthenticated user trying to access the app
  if (!user && isProtectedApp) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // 3. Authenticated user logic
  if (user) {
    // If they are on the auth page, push them into the app
    if (isAuthPage || unProtectedPage) {
      const url = request.nextUrl.clone();
      url.pathname = "/app";
      return NextResponse.redirect(url);
    }

    // THE ONBOARDING GATE: Check the boolean flag instead of document count
    if (isProtectedApp) {
      // Look up their brand voice settings
      const { data: voice } = await supabase
        .from("brand_voices")
        .select("is_onboarded")
        .eq("user_id", user.id)
        .single();

      // If they don't have a voice record yet, or it's false, they are not onboarded
      const hasFinishedOnboarding = voice?.is_onboarded === true;
      console.log("Is Onboarded:", hasFinishedOnboarding);

      // Scenario A: They haven't finished, but are trying to access the main dashboard
      if (!hasFinishedOnboarding && !isOnboardingPage) {
        const url = request.nextUrl.clone();
        url.pathname = "/app/onboarding";
        return NextResponse.redirect(url);
      }

      // Scenario B: They HAVE finished, but are trying to access the onboarding page
      if (hasFinishedOnboarding && isOnboardingPage) {
        const url = request.nextUrl.clone();
        url.pathname = "/app";
        return NextResponse.redirect(url);
      }
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
