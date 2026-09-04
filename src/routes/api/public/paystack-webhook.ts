import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/paystack-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env.PAYSTACK_SECRET_KEY;
        if (!secret) return new Response("Payment secret is not configured", { status: 500 });

        const signature = request.headers.get("x-paystack-signature") || "";
        const rawBody = await request.text();
        const { createHmac, timingSafeEqual } = await import("crypto");
        const expected = createHmac("sha512", secret).update(rawBody).digest("hex");
        const signatureBuffer = Buffer.from(signature, "hex");
        const expectedBuffer = Buffer.from(expected, "hex");

        if (
          !signature ||
          signatureBuffer.length !== expectedBuffer.length ||
          !timingSafeEqual(signatureBuffer, expectedBuffer)
        ) {
          return new Response("Invalid signature", { status: 401 });
        }

        let payload: {
          event?: string;
          data?: {
            reference?: string;
            status?: string;
            amount?: number;
            currency?: string;
            channel?: string | null;
            paid_at?: string | null;
            gateway_response?: string;
            customer?: { email?: string; first_name?: string | null; last_name?: string | null };
          };
        };

        try {
          payload = JSON.parse(rawBody) as typeof payload;
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }

        if (payload.event !== "charge.success") {
          return Response.json({ received: true, ignored: true });
        }

        const d = payload.data;
        if (!d?.reference || d.status !== "success" || !d.amount || !d.customer?.email) {
          return new Response("Invalid payment payload", { status: 400 });
        }

        const customerName =
          [d.customer.first_name, d.customer.last_name].filter(Boolean).join(" ").trim() || null;
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { error } = await supabaseAdmin.from("payments").upsert(
          {
            reference: d.reference,
            email: d.customer.email,
            customer_name: customerName,
            amount_kobo: d.amount,
            currency: d.currency || "NGN",
            status: d.status,
            channel: d.channel || null,
            paid_at: d.paid_at || null,
            gateway_response: d.gateway_response || null,
            raw: payload.data,
          },
          { onConflict: "reference" },
        );

        if (error) {
          console.error("[paystack:webhook] failed to save payment", error);
          return new Response("Failed to record payment", { status: 500 });
        }

        console.info("[paystack:webhook] payment recorded", { reference: d.reference });
        return Response.json({ received: true });
      },
    },
  },
});
