"use client";

import {
  startTransition,
  useActionState,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { Check, ChevronDown } from "lucide-react";
import { useHashScroll } from "@/hooks/useHashScroll";
import { useDictionary, useLocale } from "@/i18n/I18nProvider";
import { cn } from "@/lib/cn";
import Container from "@/components/ui/Container";
import PageIntro from "@/components/ui/PageIntro";
import TextLink from "@/components/ui/TextLink";
import { buttonClass } from "@/components/ui/Button";
import {
  submitInquiry,
  type InquiryErrorCode,
  type InquiryField,
  type InquiryState,
} from "@/app/(v2)/v2/[lang]/contact/actions";

type InquiryTypeId = "exhibition" | "export" | "event" | "buyer" | "trade" | "other";

const INQUIRY_TYPES: InquiryTypeId[] = ["exhibition", "buyer", "export", "event", "trade", "other"];

const INITIAL_STATE: InquiryState = { status: "idle" };

const labelClass = "mb-2 block text-small font-semibold text-ink";
const controlClass =
  "block w-full rounded-md border border-line bg-paper text-body text-ink transition-colors placeholder:text-ink-faint hover:border-ink-faint focus:border-blue focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-blue/25 aria-[invalid=true]:border-orange-deep aria-[invalid=true]:ring-0";

/** Field-level message shown under a control; linked with aria-describedby. */
function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-small text-ink">
      <span aria-hidden className="mt-[7px] size-2 shrink-0 rounded-full bg-orange-deep" />
      {children}
    </p>
  );
}

/** Button + listbox following the ARIA "select-only combobox" pattern; the value is posted via a hidden input. */
function InquiryTypeSelect({
  id,
  labelId,
  value,
  onChange,
  invalid,
  describedBy,
}: {
  id: string;
  labelId: string;
  value: InquiryTypeId | null;
  onChange: (value: InquiryTypeId) => void;
  invalid: boolean;
  describedBy?: string;
}) {
  const { contact } = useDictionary();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = `${id}-listbox`;

  useEffect(() => {
    if (!open) return;
    listRef.current?.focus();
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const openList = () => {
    const selected = value ? INQUIRY_TYPES.indexOf(value) : -1;
    setActive(selected >= 0 ? selected : 0);
    setOpen(true);
  };
  const select = (index: number) => {
    onChange(INQUIRY_TYPES[index]);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const onButtonKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
      event.preventDefault();
      openList();
    }
  };
  const onListKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    const last = INQUIRY_TYPES.length - 1;
    if (event.key === "ArrowDown") setActive((i) => (i === last ? 0 : i + 1));
    else if (event.key === "ArrowUp") setActive((i) => (i === 0 ? last : i - 1));
    else if (event.key === "Home") setActive(0);
    else if (event.key === "End") setActive(last);
    else if (event.key === "Enter" || event.key === " ") select(active);
    else if (event.key === "Escape") {
      setOpen(false);
      buttonRef.current?.focus();
    } else if (event.key === "Tab") {
      setOpen(false);
      return;
    } else return;
    event.preventDefault();
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={labelId}
        aria-required="true"
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onButtonKeyDown}
        className={cn(controlClass, "flex h-12 items-center justify-between gap-3 px-4 text-left")}
      >
        <span className={cn("min-w-0 truncate", !value && "text-ink-faint")}>
          {value ? contact.form.inquiryTypes[value] : contact.form.fields.inquiryType.placeholder}
        </span>
        <ChevronDown
          size={18}
          aria-hidden="true"
          className={cn("shrink-0 text-ink-soft transition-transform duration-150", open && "rotate-180")}
        />
      </button>
      {open && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          tabIndex={-1}
          aria-labelledby={labelId}
          aria-activedescendant={`${id}-option-${active}`}
          onKeyDown={onListKeyDown}
          onMouseDown={(event) => event.preventDefault()}
          className="absolute top-[calc(100%+6px)] left-0 z-50 w-full rounded-lg border border-line bg-paper py-1.5 shadow-[0_12px_32px_rgba(32,24,32,0.12)] focus:outline-none"
        >
          {INQUIRY_TYPES.map((type, index) => (
            <li
              key={type}
              id={`${id}-option-${index}`}
              role="option"
              aria-selected={value === type}
              onMouseEnter={() => setActive(index)}
              onClick={() => select(index)}
              className={cn(
                "flex min-h-11 cursor-pointer items-center justify-between gap-3 px-4 py-2 text-body",
                index === active ? "bg-mist text-ink" : "text-ink-soft",
              )}
            >
              {contact.form.inquiryTypes[type]}
              {value === type && <Check size={16} aria-hidden="true" className="shrink-0 text-blue" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function InquiryForm({ onReset }: { onReset: () => void }) {
  const { contact, footer } = useDictionary();
  const locale = useLocale();
  const [state, dispatch, pending] = useActionState(submitInquiry, INITIAL_STATE);
  const [inquiryType, setInquiryType] = useState<InquiryTypeId | null>(null);
  const [clientError, setClientError] = useState<InquiryErrorCode | null>(null);
  const uid = useId();
  const fieldId = (name: InquiryField) => `${uid}-${name}`;
  const errorFor = (name: InquiryField) => `${uid}-${name}-error`;
  const typeLabelId = `${uid}-inquiryType-label`;
  const alertId = `${uid}-alert`;
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  const serverError = state.status === "error" ? state : null;
  const invalidFields: InquiryField[] =
    clientError === "invalid_type" ? ["inquiryType"] : (serverError?.fields ?? []);
  const isInvalid = (field: InquiryField) => invalidFields.includes(field);
  const deliveryError =
    serverError && (serverError.code === "not_configured" || serverError.code === "delivery_failed")
      ? serverError.code
      : null;

  /** Message under one field: the specific reason when the server gave one, otherwise "required". */
  const fieldMessage = (field: InquiryField) => {
    const code = clientError ?? serverError?.code;
    if (code === "invalid_email" && field === "email") return contact.errors.invalid_email;
    if (code === "invalid_type" && field === "inquiryType") return contact.errors.invalid_type;
    if (code === "consent_required" && field === "privacy") return contact.errors.consent_required;
    return contact.errors.required;
  };
  const describe = (field: InquiryField) =>
    isInvalid(field) ? ({ "aria-invalid": true, "aria-describedby": errorFor(field) } as const) : {};

  // After the server answers, move focus to what needs attention.
  useEffect(() => {
    if (state.status === "success") {
      successRef.current?.focus();
    } else if (state.status === "error") {
      const first = state.fields[0];
      document.getElementById(first ? fieldId(first) : alertId)?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  // Submit manually (not via `action=`) so React does not reset the fields when the server reports an error.
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inquiryType) {
      setClientError("invalid_type");
      document.getElementById(fieldId("inquiryType"))?.focus();
      return;
    }
    setClientError(null);
    const formData = new FormData(event.currentTarget);
    startTransition(() => dispatch(formData));
  };

  if (state.status === "success") {
    return (
      <div role="status" className="border-t border-line pt-8">
        <h2 ref={successRef} tabIndex={-1} className="text-h3 font-bold outline-none">
          {contact.success.title}
        </h2>
        <p className="mt-3 max-w-[40ch] text-ink-soft">{contact.success.body}</p>
        <button type="button" onClick={onReset} className={buttonClass("secondary", "mt-8")}>
          {contact.success.again}
        </button>
      </div>
    );
  }

  const fields = contact.form.fields;
  const textField = (
    name: "company" | "name" | "phone" | "email",
    type: string,
    autoComplete: string,
    maxLength: number,
  ) => (
    <div>
      <label htmlFor={fieldId(name)} className={labelClass}>
        {fields[name].label}
      </label>
      <input
        id={fieldId(name)}
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        maxLength={maxLength}
        placeholder={fields[name].placeholder || undefined}
        className={cn(controlClass, "h-12 px-4")}
        {...describe(name)}
      />
      {isInvalid(name) && <FieldError id={errorFor(name)}>{fieldMessage(name)}</FieldError>}
    </div>
  );

  return (
    <form ref={formRef} onSubmit={onSubmit} aria-label={contact.form.label} className="grid gap-6">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="inquiryType" value={inquiryType ?? ""} />
      <p className="text-small text-ink-soft">{contact.form.requiredNote}</p>

      <div className="grid gap-6 sm:grid-cols-2">
        {textField("company", "text", "organization", 200)}
        {textField("name", "text", "name", 100)}
        {textField("phone", "tel", "tel", 40)}
        {textField("email", "email", "email", 254)}
      </div>

      <div>
        <label id={typeLabelId} htmlFor={fieldId("inquiryType")} className={labelClass}>
          {fields.inquiryType.label}
        </label>
        <InquiryTypeSelect
          id={fieldId("inquiryType")}
          labelId={typeLabelId}
          value={inquiryType}
          onChange={(value) => {
            setInquiryType(value);
            if (clientError === "invalid_type") setClientError(null);
          }}
          invalid={isInvalid("inquiryType")}
          describedBy={isInvalid("inquiryType") ? errorFor("inquiryType") : undefined}
        />
        {isInvalid("inquiryType") && (
          <FieldError id={errorFor("inquiryType")}>{fieldMessage("inquiryType")}</FieldError>
        )}
      </div>

      <div>
        <label htmlFor={fieldId("message")} className={labelClass}>
          {fields.message.label}
        </label>
        <textarea
          id={fieldId("message")}
          name="message"
          required
          maxLength={5000}
          rows={6}
          placeholder={fields.message.placeholder}
          className={cn(controlClass, "resize-y px-4 py-3 leading-relaxed")}
          {...describe("message")}
        />
        {isInvalid("message") && <FieldError id={errorFor("message")}>{fieldMessage("message")}</FieldError>}
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id={fieldId("privacy")}
            name="privacy"
            required
            className="mt-1 size-5 shrink-0 cursor-pointer accent-blue"
            {...describe("privacy")}
          />
          <label htmlFor={fieldId("privacy")} className="cursor-pointer">
            <span className="block font-semibold text-ink">{contact.form.privacy.label}</span>
            <span className="block text-small text-ink-soft">{contact.form.privacy.detail}</span>
          </label>
        </div>
        {isInvalid("privacy") && <FieldError id={errorFor("privacy")}>{fieldMessage("privacy")}</FieldError>}
      </div>

      {deliveryError && (
        <div
          id={alertId}
          tabIndex={-1}
          role="alert"
          className="rounded-lg border border-orange-deep/40 bg-mist p-5 outline-none"
        >
          <p className="font-semibold text-ink">{contact.errors[deliveryError]}</p>
          <dl className="mt-3 grid gap-1 text-small sm:grid-cols-[auto_1fr] sm:gap-x-4">
            <dt className="text-ink-soft">{contact.errors.fallbackPhone}</dt>
            <dd>
              <a
                href={`tel:${footer.phone}`}
                className="tabular font-semibold text-blue underline-offset-4 hover:underline"
              >
                {footer.phone}
              </a>
            </dd>
            <dt className="text-ink-soft">{contact.errors.fallbackEmail}</dt>
            <dd>
              <a
                href={`mailto:${footer.email}`}
                className="font-semibold text-blue underline-offset-4 hover:underline"
              >
                {footer.email}
              </a>
            </dd>
          </dl>
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={pending}
          aria-busy={pending}
          className={buttonClass(
            "primary",
            "w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto sm:px-10",
          )}
        >
          {pending ? contact.form.submitting : contact.form.submit}
        </button>
      </div>
    </form>
  );
}

export default function ContactPage() {
  const { contact, footer } = useDictionary();
  const [formKey, setFormKey] = useState(0);
  useHashScroll({ offset: -96, resetWhenEmpty: true });

  return (
    <>
      <PageIntro title={contact.intro.title} lead={contact.intro.lead} />
      <section id="qna" className="scroll-mt-24 bg-paper py-12 md:py-20">
        <Container className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-8 lg:col-span-7">
            <InquiryForm key={formKey} onReset={() => setFormKey((key) => key + 1)} />
          </div>
          <aside className="md:col-span-4 md:col-start-9 lg:col-start-9">
            <div className="border-t border-line pt-6 md:sticky md:top-28 md:border-t-0 md:pt-0">
              <h2 className="text-h4 font-bold">{contact.aside.title}</h2>
              <dl className="mt-5 grid gap-4">
                <div>
                  <dt className="text-small text-ink-soft">{contact.aside.phoneLabel}</dt>
                  <dd>
                    <a
                      href={`tel:${footer.phone}`}
                      className="tabular text-lead font-semibold hover:text-blue"
                    >
                      {footer.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-small text-ink-soft">{contact.aside.emailLabel}</dt>
                  <dd>
                    <a href={`mailto:${footer.email}`} className="font-semibold break-all hover:text-blue">
                      {footer.email}
                    </a>
                  </dd>
                </div>
              </dl>
              <p className="mt-5 text-small text-ink-soft">{contact.aside.note}</p>
              <TextLink href="/contact-detail#location" className="mt-5 inline-block text-small">
                {contact.aside.directions}
              </TextLink>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
