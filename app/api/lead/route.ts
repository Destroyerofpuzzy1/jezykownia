import { NextResponse } from "next/server";
import { parseLead } from "@/lib/lead/schema";
import { audienceOptions, formatOptions, goalOptions, labelOf, needOptions } from "@/lib/lead/options";

/**
 * Receives "Dobierz zajęcia" leads.
 *
 * Delivery: set LEAD_WEBHOOK_URL to any endpoint that accepts a JSON POST
 * (Make / Zapier webhook, Google Apps Script writing to Sheets, a mail service).
 * Without it the route answers { status: "not_configured" } and the form tells the
 * visitor that nothing was sent and shows the phone number instead.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = parseLead(body);
  if (!parsed.ok) {
    return NextResponse.json({ status: "invalid" }, { status: 400 });
  }

  // Bots that fill the hidden field get a quiet success and nothing is forwarded.
  if (parsed.spam) {
    return NextResponse.json({ status: "sent" });
  }

  const target = process.env.LEAD_WEBHOOK_URL;
  if (!target) {
    // 200 with an explicit status keeps the browser console clean; the client reads the body.
    return NextResponse.json({ status: "not_configured" });
  }

  const { lead } = parsed;
  const record = {
    ...lead,
    labels: {
      audience: labelOf(audienceOptions, lead.audience),
      needs: lead.needs.map((n) => labelOf(needOptions, n)),
      format: labelOf(formatOptions, lead.format),
      goal: labelOf(goalOptions, lead.goal),
    },
    source: "strona: Dobierz zajęcia",
    receivedAt: new Date().toISOString(),
  };

  try {
    const res = await fetch(target, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return NextResponse.json({ status: "sent" });
  } catch (error) {
    console.error("[lead] delivery failed", error);
    return NextResponse.json({ status: "error" }, { status: 502 });
  }
}
