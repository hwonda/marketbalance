"use server";

import koContact from "@/i18n/dictionaries/ko/contact.json";

/**
 * Inquiry form submission.
 *
 * Delivery: the validated inquiry is POSTed as JSON to `CONTACT_WEBHOOK_URL` (see .env.example).
 * Without that variable, or if the webhook does not answer 2xx, the action reports an error so the
 * form never shows a success message for an inquiry nobody received.
 *
 * The action returns error *codes*; the client maps them to dictionary strings.
 */

export type InquiryField = "company" | "name" | "phone" | "email" | "inquiryType" | "message" | "privacy";

export type InquiryErrorCode =
  | "missing_fields"
  | "invalid_email"
  | "invalid_type"
  | "consent_required"
  | "not_configured"
  | "delivery_failed";

export type InquiryState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; code: InquiryErrorCode; fields: InquiryField[] };

type InquiryType = keyof typeof koContact.form.inquiryTypes;

const INQUIRY_TYPES = Object.keys(koContact.form.inquiryTypes) as InquiryType[];

/** Generous caps that still keep a single webhook message reasonable. */
const MAX_LENGTH: Record<Exclude<InquiryField, "inquiryType" | "privacy">, number> = {
  company: 200,
  name: 100,
  phone: 40,
  email: 254,
  message: 5000,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const text = (formData: FormData, key: string) => {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
};

export async function submitInquiry(_previous: InquiryState, formData: FormData): Promise<InquiryState> {
  const values = {
    company: text(formData, "company").slice(0, MAX_LENGTH.company),
    name: text(formData, "name").slice(0, MAX_LENGTH.name),
    phone: text(formData, "phone").slice(0, MAX_LENGTH.phone),
    email: text(formData, "email").slice(0, MAX_LENGTH.email),
    message: text(formData, "message").slice(0, MAX_LENGTH.message),
  };
  const inquiryType = text(formData, "inquiryType");
  const consented = formData.get("privacy") === "on";
  const locale = text(formData, "locale") === "en" ? "en" : "ko";

  const missing = (Object.keys(values) as (keyof typeof values)[]).filter((key) => !values[key]);
  if (missing.length > 0) return { status: "error", code: "missing_fields", fields: missing };
  if (!INQUIRY_TYPES.includes(inquiryType as InquiryType)) {
    return { status: "error", code: "invalid_type", fields: ["inquiryType"] };
  }
  if (!EMAIL_PATTERN.test(values.email)) return { status: "error", code: "invalid_email", fields: ["email"] };
  if (!consented) return { status: "error", code: "consent_required", fields: ["privacy"] };

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("[inquiry] CONTACT_WEBHOOK_URL is not set; inquiry was not delivered.");
    return { status: "error", code: "not_configured", fields: [] };
  }

  const typeLabel = koContact.form.inquiryTypes[inquiryType as InquiryType];
  const submittedAt = new Date().toISOString();
  const payload = {
    // `text` lets Slack-style incoming webhooks render the message as-is.
    text: [
      `[홈페이지 상담 문의] ${typeLabel}`,
      `업체명: ${values.company}`,
      `담당자: ${values.name}`,
      `전화: ${values.phone}`,
      `이메일: ${values.email}`,
      `언어: ${locale}`,
      "",
      values.message,
    ].join("\n"),
    type: "inquiry",
    submittedAt,
    locale,
    inquiryType: { id: inquiryType, label: typeLabel },
    ...values,
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      console.error(`[inquiry] webhook answered ${response.status}; inquiry was not delivered.`);
      return { status: "error", code: "delivery_failed", fields: [] };
    }
  } catch (error) {
    console.error("[inquiry] webhook request failed:", error instanceof Error ? error.message : error);
    return { status: "error", code: "delivery_failed", fields: [] };
  }

  return { status: "success" };
}
