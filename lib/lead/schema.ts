import {
  audienceOptions,
  formatOptions,
  goalOptions,
  needOptions,
  type AudienceId,
  type FormatId,
  type GoalId,
  type NeedId,
} from "./options";

export type LeadAnswers = {
  audience: AudienceId | null;
  needs: NeedId[];
  format: FormatId | null;
  goal: GoalId | null;
  name: string;
  phone: string;
  message: string;
};

/** Payload sent from the browser to /api/lead. */
export type LeadPayload = Omit<LeadAnswers, "audience" | "format" | "goal"> & {
  audience: AudienceId;
  format: FormatId;
  goal: GoalId;
  /** Honeypot. Real visitors never see or fill it. */
  company?: string;
};

export type ContactErrors = Partial<Record<"name" | "phone" | "message", string>>;

export const emptyAnswers: LeadAnswers = {
  audience: null,
  needs: [],
  format: null,
  goal: null,
  name: "",
  phone: "",
  message: "",
};

export const MESSAGE_MAX = 800;

/** Polish numbers: 9 digits, optional +48 / 0048 prefix, spaces and dashes allowed. */
export function normalizePhone(raw: string): string | null {
  const compact = raw.replace(/[\s\-().]/g, "");
  const match = compact.match(/^(?:\+48|0048)?(\d{9})$/);
  return match ? `+48${match[1]}` : null;
}

export function validateContact(values: Pick<LeadAnswers, "name" | "phone" | "message">): ContactErrors {
  const errors: ContactErrors = {};
  const name = values.name.trim();
  if (!name) errors.name = "Wpisz swoje imię.";
  else if (name.length < 2) errors.name = "Imię jest za krótkie.";
  else if (name.length > 60) errors.name = "Imię może mieć najwyżej 60 znaków.";

  const phone = values.phone.trim();
  if (!phone) errors.phone = "Wpisz numer telefonu, np. 600 100 200.";
  else if (!normalizePhone(phone)) errors.phone = "Numer telefonu powinien mieć 9 cyfr, np. 600 100 200.";

  if (values.message.length > MESSAGE_MAX) errors.message = `Wiadomość może mieć najwyżej ${MESSAGE_MAX} znaków.`;
  return errors;
}

const ids = <T extends { id: string }>(list: readonly T[]) => new Set(list.map((o) => o.id));
const audienceIds = ids(audienceOptions);
const needIds = ids(needOptions);
const formatIds = ids(formatOptions);
const goalIds = ids(goalOptions);

export type ValidLead = {
  audience: AudienceId;
  needs: NeedId[];
  format: FormatId;
  goal: GoalId;
  name: string;
  phone: string;
  message: string;
};

/** Server-side validation of an untrusted payload. */
export function parseLead(input: unknown): { ok: true; lead: ValidLead; spam: boolean } | { ok: false } {
  if (!input || typeof input !== "object") return { ok: false };
  const v = input as Record<string, unknown>;
  const str = (x: unknown) => (typeof x === "string" ? x : "");

  const audience = str(v.audience);
  const format = str(v.format);
  const goal = str(v.goal);
  const needs = Array.isArray(v.needs) ? v.needs.filter((n): n is string => typeof n === "string") : [];

  if (!audienceIds.has(audience) || !formatIds.has(format) || !goalIds.has(goal)) return { ok: false };
  if (needs.length === 0 || needs.some((n) => !needIds.has(n))) return { ok: false };

  const contact = { name: str(v.name), phone: str(v.phone), message: str(v.message) };
  if (Object.keys(validateContact(contact)).length > 0) return { ok: false };

  return {
    ok: true,
    spam: str(v.company).length > 0,
    lead: {
      audience: audience as AudienceId,
      needs: needs as NeedId[],
      format: format as FormatId,
      goal: goal as GoalId,
      name: contact.name.trim(),
      phone: normalizePhone(contact.phone)!,
      message: contact.message.trim(),
    },
  };
}
