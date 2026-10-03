import { NextResponse } from "next/server";
import { createClient } from "@/app/lib/util/supabase/server";
import {
  lemonSqueezySetup,
  createCheckout,
} from "@lemonsqueezy/lemonsqueezy.js";

lemonSqueezySetup({ apiKey: process.env.LEMON_SQUEEZY_API_KEY });

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log(user);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { variantId } = await req.json();

    console.log(variantId, process.env.LEMON_SQUEEZY_STORE_ID);

    const checkout = await createCheckout(
      process.env.LEMON_SQUEEZY_STORE_ID!,
      variantId,
      {
        checkoutData: {
          email: user.email,
          custom: {
            user_id: user.id,
          },
        },
        productOptions: {
          redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/app/billing?success=true`,
        },
      },
    );

    if (checkout.error) {
      throw new Error(checkout.error.message);
    }

    return NextResponse.json({ url: checkout.data?.data.attributes.url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
