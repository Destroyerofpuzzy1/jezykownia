import type { LeadPayload } from "./schema";

export type SubmitResult =
  /** The endpoint accepted the lead. */
  | { status: "sent" }
  /** No delivery target is configured yet (demo mode). Nothing was sent. */
  | { status: "not_configured" }
  | { status: "error" };

/**
 * The only place the browser talks to the lead backend.
 * Delivery itself (webhook, Make, Google Sheets, e-mail) lives in app/api/lead/route.ts.
 */
export async function submitLead(payload: LeadPayload): Promise<SubmitResult> {
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const body = (await res.json().catch(() => null)) as { status?: string } | null;
    if (res.ok && body?.status === "sent") return { status: "sent" };
    if (body?.status === "not_configured") return { status: "not_configured" };
    return { status: "error" };
  } catch {
    return { status: "error" };
  }
}
