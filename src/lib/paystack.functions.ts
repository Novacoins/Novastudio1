import { createServerFn } from "@tanstack/react-start";

type VerifyInput = { reference: string };
type PaystackVerifyResponse = {
  status: boolean;
  message: string;
  data?: {
    reference: string;
    status: string;
    amount: number;
    currency: string;
    channel: string | null;
    paid_at: string | null;
    gateway_response: string;
    customer: { email: string; first_name?: string | null; last_name?: string | null };
  };
};

export const getPaystackPublicKey = createServerFn({ method: "GET" }).handler(async () => {
  const key = process.env.PAYSTACK_PUBLIC_KEY;
  if (!key) throw new Error("PAYSTACK_PUBLIC_KEY is not configured");
  return { publicKey: key };
});

export const verifyPaystackPayment = createServerFn({ method: "POST" })
  .inputValidator((data: VerifyInput) => {
    if (!data || typeof data.reference !== "string" || data.reference.length < 4) {
      throw new Error("Invalid reference");
    }
    return { reference: data.reference.trim() };
  })
  .handler(async ({ data }) => {
    const secret = process.env.PAYSTACK_SECRET_KEY;
    if (!secret) throw new Error("PAYSTACK_SECRET_KEY is not configured");

    let body: PaystackVerifyResponse | null = null;
    let lastError = "";

    for (let attempt = 1; attempt <= 5; attempt += 1) {
      const res = await fetch(
        `https://api.paystack.co/transaction/verify/${encodeURIComponent(data.reference)}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${secret}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (res.ok) {
        body = (await res.json()) as PaystackVerifyResponse;
        if (body?.status && body.data?.status === "success") break;
        lastError = body?.data?.gateway_response || body?.message || "Payment not successful";
      } else {
        const text = await res.text().catch(() => "");
        lastError = `Payment verification service returned ${res.status}${text ? `: ${text}` : ""}`;
      }

      if (attempt < 5) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 900));
      }
    }

    if (!body?.status || !body.data || body.data.status !== "success") {
      return {
        success: false as const,
        message:
          lastError || "Payment failed verification. Please confirm the transaction and try again.",
      };
    }

    const d = body.data;
    const customerName =
      [d.customer?.first_name, d.customer?.last_name].filter(Boolean).join(" ").trim() || null;

    // Persist (dedup by reference)
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { error } = await supabaseAdmin.from("payments").upsert(
        {
          reference: d.reference,
          email: d.customer.email,
          customer_name: customerName,
          amount_kobo: d.amount,
          currency: d.currency,
          status: d.status,
          channel: d.channel,
          paid_at: d.paid_at,
          gateway_response: d.gateway_response,
          raw: JSON.parse(JSON.stringify(d)),
        },
        { onConflict: "reference" },
      );
      if (error) console.error("[paystack] failed to save payment", error);
    } catch (err) {
      console.error("[paystack] failed to save payment", err);
    }

    return {
      success: true as const,
      reference: d.reference,
      amount: d.amount, // kobo
      currency: d.currency,
      channel: d.channel,
      paidAt: d.paid_at,
      email: d.customer.email,
      customerName,
      gatewayResponse: d.gateway_response,
    };
  });
