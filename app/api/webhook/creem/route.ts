// app/api/webhooks/creem/route.ts
import { orderTable } from "@/db/schema";
import { drizzle } from "drizzle-orm/neon-http";

import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

const db = drizzle(process.env.DATABASE_URL!);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("creem-signature");

  // Verify webhook signature
  const expectedSignature = crypto
    .createHmac("sha256", process.env.CREEM_WEBHOOK_SECRET!)
    .update(body)
    .digest("hex");

  if (signature !== expectedSignature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(body);

  console.log("Received Creem webhook:", event);

  // Handle different event types
  switch (event.eventType) {
    case "checkout.completed":
      console.log("Payment successful!", {
        checkoutId: event.id,
        customerId: event.object.customer.id,
        productId: event.object.product.id,
      });
      // Grant access, send email, update database, etc.
      break;

    case "subscription.paid":
      console.log("New subscription:", event);
      await db.insert(orderTable).values({
        customerId: event.object.customer.id,
        productId: event.object.product.id,
        amount: event.object.product.price,
        status: event.object.product.status,
      });
      break;

    case "subscription.canceled":
      console.log("Subscription canceled:", event);
      // Revoke access
      break;
  }

  return NextResponse.json({ received: true });
}
