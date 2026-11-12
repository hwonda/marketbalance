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
import Link from "@/v3/i18n/Link";
import { useHashScroll } from "@/v3/hooks/useHashScroll";
import { useDictionary, useLocale } from "@/v3/i18n/I18nProvider";
import { cn } from "@/v3/lib/cn";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Check,
  Send,
  Flag,
  Users,
  Ship,
  ChevronDown,
  ChartBar,
  Phone,
  Mail,
  CircleAlert,
} from "lucide-react";
import CtaSection from "@/v3/components/CtaSection";
import {
  submitInquiry,
  type InquiryErrorCode,
  type InquiryField,
  type InquiryState,
} from "@/app/(v3)/v3/[lang]/contact/actions";

type InquiryTypeId = "exhibition" | "export" | "event" | "buyer" | "trade";

const INQUIRY_TYPES: { id: InquiryTypeId; icon: ReactNode }[] = [
  { id: "event", icon: <Users size={14} /> },
  { id: "export", icon: <ChartBar size={14} /> },
  { id: "exhibition", icon: <Flag size={14} /> },
  { id: "buyer", icon: <ArrowRight size={14} /> },
  { id: "trade", icon: <Ship size={14} /> },
];

const CONTACT_PHONE = "031-425-9281";
const CONTACT_EMAIL = "marketbalancekorea@gmail.com";

const INITIAL_STATE: InquiryState = { status: "idle" };

const labelClass =
  "flex items-center gap-2 font-display font-black text-[#14213D] uppercase tracking-[0.1em] text-[0.85rem]";
const inputClass =
  "w-full h-12 bg-gray-50/50 border-2 border-gray-100 rounded-[16px] px-4 sm:px-5 font-sans font-bold text-[#14213D] focus:outline-none focus:border-[#1F5FE0] focus:bg-white transition-all placeholder:text-gray-400 placeholder:font-semibold placeholder:text-[0.9rem] shadow-sm aria-[invalid=true]:border-[#1F5FE0]/60";

function RequiredMark() {
  return (
    <span className="text-[#1F5FE0]" aria-hidden="true">
      *
    </span>
  );
}

/** Button + listbox following the ARIA "select-only combobox" pattern; the value is posted via a hidden input. */
function InquiryTypeSelect({
  id,
  labelId,
  value,
  onChange,
  invalid,
}: {
  id: string;
  labelId: string;
  value: InquiryTypeId | null;
  onChange: (value: InquiryTypeId) => void;
  invalid: boolean;
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
    const selected = INQUIRY_TYPES.findIndex((type) => type.id === value);
    setActive(selected >= 0 ? selected : 0);
    setOpen(true);
  };
  const select = (index: number) => {
    onChange(INQUIRY_TYPES[index].id);
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
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onButtonKeyDown}
        className={cn(
          "w-full h-14 bg-gray-50/50 border-2 border-gray-100 rounded-[16px] px-4 sm:px-5 flex items-center justify-between gap-3 font-sans font-bold text-[#14213D] focus:outline-none focus-visible:border-[#1F5FE0] hover:bg-white hover:border-gray-200 transition-all shadow-sm",
          invalid && "border-[#1F5FE0]/60",
        )}
      >
        <span
          className={cn(
            "min-w-0 truncate text-left",
            value ? "text-[#14213D]" : "text-gray-400 font-semibold text-[0.9rem]",
          )}
        >
          {value ? contact.form.inquiryTypes[value] : contact.form.fields.inquiryType.placeholder}
        </span>
        <ChevronDown
          size={18}
          aria-hidden="true"
          className={cn("shrink-0 text-gray-400 transition-transform duration-500", open && "rotate-180")}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            ref={listRef}
            id={listId}
            role="listbox"
            tabIndex={-1}
            aria-labelledby={labelId}
            aria-activedescendant={`${id}-option-${active}`}
            onKeyDown={onListKeyDown}
            onMouseDown={(event) => event.preventDefault()}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-50 top-[calc(100%+8px)] left-0 w-full bg-white rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden p-1.5 list-none m-0 focus:outline-none"
          >
            {INQUIRY_TYPES.map((type, index) => (
              <li
                key={type.id}
                id={`${id}-option-${index}`}
                role="option"
                aria-selected={value === type.id}
                onMouseEnter={() => setActive(index)}
                onClick={() => select(index)}
                className={cn(
                  "flex min-h-11 items-center gap-3 px-4 py-2.5 rounded-[12px] cursor-pointer transition-colors font-sans font-bold",
                  index === active ? "bg-[#1F5FE0] text-white" : "text-[#14213D]",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "w-8 h-8 shrink-0 rounded-[8px] flex items-center justify-center transition-colors shadow-sm",
                    index === active ? "bg-white/20 text-white" : "bg-gray-50 text-gray-400",
                  )}
                >
                  {type.icon}
                </span>
                <span className="text-sm">{contact.form.inquiryTypes[type.id]}</span>
                {value === type.id && <Check size={16} aria-hidden="true" className="ml-auto shrink-0" />}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

function InquiryForm({ onReset }: { onReset: () => void }) {
  const { contact } = useDictionary();
  const locale = useLocale();
  const [state, dispatch, pending] = useActionState(submitInquiry, INITIAL_STATE);
  const [inquiryType, setInquiryType] = useState<InquiryTypeId | null>(null);
  const [clientError, setClientError] = useState<InquiryErrorCode | null>(null);
  const uid = useId();
  const fieldId = (name: InquiryField) => `${uid}-${name}`;
  const typeLabelId = `${uid}-inquiryType-label`;
  const errorId = `${uid}-error`;

  const serverError = state.status === "error" ? state : null;
  const errorCode = clientError ?? serverError?.code ?? null;
  const invalid = (field: InquiryField) =>
    (clientError === "invalid_type" && field === "inquiryType") || !!serverError?.fields.includes(field);
  const invalidProps = (field: InquiryField) =>
    invalid(field) ? ({ "aria-invalid": true, "aria-describedby": errorId } as const) : {};

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

  const fields = contact.form.fields;

  return (
    <AnimatePresence mode="wait">
      {state.status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          role="status"
          className="flex flex-col items-center justify-center py-16 text-center"
        >
          <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-10 border border-green-100 shadow-lg">
            <Check size={40} strokeWidth={3} aria-hidden="true" />
          </div>
          <h3 className="font-display font-black text-[#14213D] text-3xl md:text-4xl mb-6 tracking-tighter">
            {contact.success.titleLine1}
            <br />
            {contact.success.titleLine2}
          </h3>
          <p className="font-sans font-medium text-gray-500 mb-10 leading-relaxed text-lg max-w-md">
            {contact.success.bodyLine1}
            <br />
            {contact.success.bodyLine2}
          </p>
          <button
            type="button"
            onClick={onReset}
            className="px-12 py-6 bg-[#14213D] text-white font-display font-black rounded-2xl tracking-widest hover:bg-[#1F5FE0] transition-all duration-500 shadow-2xl hover:-translate-y-1"
          >
            {contact.success.again}
          </button>
        </motion.div>
      ) : (
        <motion.div
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-8"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-gray-100 pb-6">
            <div className="space-y-1">
              <h3 className="font-display font-black text-[#14213D] text-2xl tracking-tighter">
                {contact.form.title}
              </h3>
              <p className="font-sans font-semibold text-gray-500 text-sm">{contact.form.subtitle}</p>
            </div>
            <div className="md:text-right">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-50 rounded-full border border-gray-100 font-sans font-bold text-gray-500 text-[0.75rem]">
                <span className="text-[#1F5FE0] font-black">*</span> {contact.form.requiredNote}
              </span>
            </div>
          </div>
          <form onSubmit={onSubmit} className="space-y-6">
            <input type="hidden" name="locale" value={locale} />
            <input type="hidden" name="inquiryType" value={inquiryType ?? ""} />
            <div className="grid md:grid-cols-2 gap-6">
              {(["company", "name"] as const).map((name) => (
                <div key={name} className="space-y-3">
                  <label htmlFor={fieldId(name)} className={labelClass}>
                    {fields[name].label} <RequiredMark />
                  </label>
                  <input
                    id={fieldId(name)}
                    name={name}
                    required
                    type="text"
                    autoComplete={name === "company" ? "organization" : "name"}
                    maxLength={name === "company" ? 200 : 100}
                    placeholder={fields[name].placeholder}
                    className={inputClass}
                    {...invalidProps(name)}
                  />
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label htmlFor={fieldId("phone")} className={labelClass}>
                  {fields.phone.label} <RequiredMark />
                </label>
                <input
                  id={fieldId("phone")}
                  name="phone"
                  required
                  type="tel"
                  autoComplete="tel"
                  maxLength={40}
                  placeholder={fields.phone.placeholder}
                  className={inputClass}
                  {...invalidProps("phone")}
                />
              </div>
              <div className="space-y-3">
                <label htmlFor={fieldId("email")} className={labelClass}>
                  {fields.email.label} <RequiredMark />
                </label>
                <input
                  id={fieldId("email")}
                  name="email"
                  required
                  type="email"
                  autoComplete="email"
                  maxLength={254}
                  placeholder={fields.email.placeholder}
                  className={inputClass}
                  {...invalidProps("email")}
                />
              </div>
            </div>
            <div className="space-y-3">
              <label id={typeLabelId} htmlFor={fieldId("inquiryType")} className={labelClass}>
                {fields.inquiryType.label} <RequiredMark />
              </label>
              <InquiryTypeSelect
                id={fieldId("inquiryType")}
                labelId={typeLabelId}
                value={inquiryType}
                onChange={(value) => {
                  setInquiryType(value);
                  if (clientError === "invalid_type") setClientError(null);
                }}
                invalid={invalid("inquiryType")}
              />
            </div>
            <div className="space-y-3">
              <label htmlFor={fieldId("message")} className={labelClass}>
                {fields.message.label} <RequiredMark />
              </label>
              <textarea
                id={fieldId("message")}
                name="message"
                required
                maxLength={5000}
                placeholder={fields.message.placeholder}
                rows={4}
                className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-[20px] p-4 sm:p-5 font-sans font-bold text-[#14213D] focus:outline-none focus:border-[#1F5FE0] focus:bg-white transition-all placeholder:text-gray-400 placeholder:font-semibold placeholder:text-[0.9rem] resize-none leading-relaxed text-base shadow-sm aria-[invalid=true]:border-[#1F5FE0]/60"
                {...invalidProps("message")}
              />
            </div>
            <div className="p-5 sm:p-6 bg-gray-50/50 rounded-[24px] border border-gray-100">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id={fieldId("privacy")}
                  name="privacy"
                  required
                  className="accent-[#1F5FE0] w-5 h-5 shrink-0 cursor-pointer"
                  {...invalidProps("privacy")}
                />
                <label
                  htmlFor={fieldId("privacy")}
                  className="py-2 font-sans font-bold text-gray-500 text-sm cursor-pointer select-none"
                >
                  {contact.form.privacy.label}{" "}
                  <span className="text-[#1F5FE0]">{contact.form.privacy.required}</span>
                </label>
              </div>
            </div>
            {errorCode && (
              <div
                id={errorId}
                role="alert"
                className="rounded-[20px] border border-[#1F5FE0]/20 bg-[#1F5FE0]/5 p-5 sm:p-6 font-sans"
              >
                <p className="flex items-start gap-2 font-bold text-[#B42318] m-0">
                  <CircleAlert size={18} aria-hidden="true" className="mt-0.5 shrink-0" />
                  {contact.errors[errorCode]}
                </p>
                {(errorCode === "not_configured" || errorCode === "delivery_failed") && (
                  <div className="mt-3 pl-[26px] space-y-1.5 text-sm font-semibold text-gray-600">
                    <p className="m-0">{contact.errors.fallback}</p>
                    <p className="m-0 flex flex-wrap gap-x-5 gap-y-1">
                      <a
                        href={`tel:${CONTACT_PHONE}`}
                        className="inline-flex min-h-10 items-center gap-1.5 text-[#14213D] hover:text-[#1F5FE0] no-underline"
                      >
                        <Phone size={14} aria-hidden="true" />
                        {contact.errors.fallbackPhone} {CONTACT_PHONE}
                      </a>
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="inline-flex min-h-10 items-center gap-1.5 text-[#14213D] hover:text-[#1F5FE0] no-underline break-all"
                      >
                        <Mail size={14} aria-hidden="true" />
                        {contact.errors.fallbackEmail} {CONTACT_EMAIL}
                      </a>
                    </p>
                  </div>
                )}
              </div>
            )}
            <button
              type="submit"
              disabled={pending}
              aria-busy={pending}
              className="group w-full h-16 bg-[#14213D] text-white rounded-[20px] font-display font-black text-lg tracking-tighter hover:bg-[#1F5FE0] hover:shadow-[0_20px_50px_rgba(31,95,224,0.3)] transition-all duration-700 overflow-hidden relative shadow-xl disabled:cursor-wait disabled:opacity-70 disabled:hover:bg-[#14213D] disabled:hover:shadow-xl"
            >
              <span className="relative z-10 flex items-center justify-center gap-4">
                {pending ? contact.form.submitting : contact.form.submit}
                <Send
                  size={18}
                  aria-hidden="true"
                  className={cn(
                    "transition-transform",
                    pending ? "animate-pulse" : "group-hover:translate-x-1 group-hover:-translate-y-1",
                  )}
                />
              </span>
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ContactPage() {
  const { contact, common } = useDictionary();
  const [formKey, setFormKey] = useState(0);
  useHashScroll({ offset: -100, resetWhenEmpty: true });
  return (
    <main
      className="font-sans break-keep"
      style={{
        backgroundColor: "#ffffff",
        overflowX: "hidden",
      }}
    >
      {/* Page header: plain section ground, no photo behind the text, no glass card or decorative circles (§2). */}
      <section aria-label={contact.hero.ariaLabel} className="relative border-b border-[#E3E8F0] bg-[#F6F8FC]">
        <div className="relative mx-auto w-full max-w-[1440px] px-5 pt-[132px] pb-14 sm:px-8 md:px-12 md:pt-[164px] md:pb-20">
          <div className="mb-6 flex items-center gap-[15px]">
            <div className="h-[2px] w-10 bg-[#1F5FE0]" />
            <span className="font-display text-[0.8rem] font-bold tracking-[0.3em] text-[#14213D] uppercase">
              {contact.hero.eyebrow}
            </span>
          </div>
          <h1
            className="mb-6 font-display leading-[1.05] font-extrabold text-[#14213D]"
            style={{ fontSize: "clamp(2.6rem, 6vw, 4.25rem)", letterSpacing: "-0.04em" }}
          >
            {contact.hero.titleLine1}
            <br />
            <span className="text-[#1F5FE0]">{contact.hero.titleLine2}</span>
          </h1>
          <p className="max-w-[560px] font-sans text-[1.1rem] leading-[1.8] font-medium text-[#4A5873]">
            {contact.hero.introLine1} <br className="hidden sm:block" />
            {contact.hero.introLine2}
          </p>
          <nav
            aria-label={contact.breadcrumb.ariaLabel}
            className="mt-8 flex items-center gap-3 font-display text-[0.75rem] font-bold tracking-[0.15em] text-[#6b7280] uppercase md:absolute md:right-12 md:bottom-8 md:mt-0"
          >
            <Link href="/" className="inline-flex min-h-11 items-center hover:text-[#14213D]">
              {common.home}
            </Link>
            <span aria-hidden="true" className="text-[#d1d5db]">
              /
            </span>
            <span aria-current="page" className="text-[#14213D]">
              {contact.breadcrumb.current}
            </span>
          </nav>
        </div>
      </section>
      <section className="py-12 relative">
        <div
          className="mx-auto px-4 sm:px-8 w-full"
          style={{
            maxWidth: "1000px",
          }}
        >
          <div className="flex flex-col gap-10">
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.98,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
              className="space-y-6 text-center"
            >
              <div className="space-y-3">
                <div className="inline-flex items-center gap-3 justify-center">
                  <div className="w-10 h-[2px] bg-[#1F5FE0] shrink-0" />
                  <span className="font-display font-black text-[#1F5FE0] uppercase tracking-[0.25em] sm:tracking-[0.4em] text-[0.75rem]">
                    {contact.intro.eyebrow}
                  </span>
                  <div className="w-10 h-[2px] bg-[#1F5FE0] shrink-0" />
                </div>
                <h2
                  className="font-display font-black text-[#14213D] leading-[1.2] tracking-tighter"
                  style={{
                    fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                  }}
                >
                  {contact.intro.title}
                  <span className="text-[#1F5FE0]">.</span>
                </h2>
                <p className="font-sans font-medium text-gray-500 leading-relaxed text-lg md:text-xl lg:text-2xl mx-auto break-keep text-balance max-w-[960px]">
                  {contact.intro.subtitle}
                </p>
              </div>
            </motion.div>
            <motion.div
              id="qna"
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              className="relative group"
            >
              <div className="relative bg-white rounded-[32px] sm:rounded-[40px] p-6 sm:p-8 md:px-16 md:py-12 border border-[#E3E8F0] shadow-[0_24px_60px_rgba(20,33,61,0.06)] overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-[#1F5FE0]" />
                <InquiryForm key={formKey} onReset={() => setFormKey((key) => key + 1)} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <CtaSection
        highlight={contact.cta.highlight}
        title={
          <>
            {contact.cta.titleLead}{" "}
            <span className="text-[#1F5FE0] font-bold underline underline-offset-8 decoration-2 underline-[#1F5FE0]/40">
              {contact.cta.titleHighlight}
            </span>
            {contact.cta.titleAfterHighlight}
            <br className="hidden md:block" />
            {contact.cta.titleTail}
          </>
        }
        description={contact.cta.description}
      />
    </main>
  );
}
