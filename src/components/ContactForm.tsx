"use client";

import { useState, useCallback, useMemo } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Turnstile } from "react-turnstile";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ContactFormProps {
  formspreeId: string;
  turnstileSiteKey: string;
  labels: {
    name: string;
    company: string;
    designation: string;
    email: string;
    phone: string;
    message: string;
    namePlaceholder: string;
    companyPlaceholder: string;
    designationPlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    successHeading: string;
    successMessage: string;
    errorHeading: string;
    errorMessage: string;
    sendAnother: string;
    required: string;
    invalidEmail: string;
    captchaLabel: string;
  };
}

/* ------------------------------------------------------------------ */
/*  Validation                                                         */
/* ------------------------------------------------------------------ */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateMandatory(f: {
  name: string;
  company: string;
  designation: string;
  email: string;
}) {
  return (
    f.name.trim().length > 0 &&
    f.company.trim().length > 0 &&
    f.designation.trim().length > 0 &&
    EMAIL_RE.test(f.email)
  );
}

/* ------------------------------------------------------------------ */
/*  Grid background                                                    */
/* ------------------------------------------------------------------ */

function GridBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[#202f63]" />
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)]"
        style={{ backgroundSize: "3.5rem 3.5rem" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,#92b35318,transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_110%,#92b35310,transparent)]" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Compact input field                                                */
/* ------------------------------------------------------------------ */

function Field({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-medium text-white/70 mb-1.5"
      >
        {label}
        {required && <span className="text-[#92b353] ml-0.5">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        autoComplete={
          id === "email" ? "email" : id === "name" ? "name" : undefined
        }
        className={`w-full bg-white/[0.07] border rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/30
          focus:outline-none focus:ring-2 focus:ring-[#92b353]/50 focus:border-[#92b353]/60 transition-all
          ${error ? "border-red-400/60" : "border-white/10 hover:border-white/20"}`}
      />
      {error && <p className="text-red-400 text-[11px] mt-1 pl-0.5">{error}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main form                                                          */
/* ------------------------------------------------------------------ */

export default function ContactForm({
  formspreeId,
  turnstileSiteKey,
  labels,
}: ContactFormProps) {
  const [state, handleSubmit] = useForm(formspreeId);

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [designation, setDesignation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const mandatoryValid = useMemo(
    () => validateMandatory({ name, company, designation, email }),
    [name, company, designation, email],
  );

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    const show = (f: string) => submitAttempted || touched[f];
    if (show("name") && !name.trim()) e.name = labels.required;
    if (show("company") && !company.trim()) e.company = labels.required;
    if (show("designation") && !designation.trim())
      e.designation = labels.required;
    if (show("email") && !email.trim()) e.email = labels.required;
    else if (show("email") && !EMAIL_RE.test(email))
      e.email = labels.invalidEmail;
    return e;
  }, [name, company, designation, email, touched, submitAttempted, labels]);

  const touch = useCallback(
    (f: string) => setTouched((p) => ({ ...p, [f]: true })),
    [],
  );

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSubmitAttempted(true);
      if (!mandatoryValid || !turnstileToken) return;
      const fd = new FormData(e.currentTarget);
      fd.set("cf-turnstile-response", turnstileToken);
      handleSubmit(fd);
    },
    [mandatoryValid, turnstileToken, handleSubmit],
  );

  const resetForm = useCallback(() => {
    setName("");
    setCompany("");
    setDesignation("");
    setEmail("");
    setPhone("");
    setMessage("");
    setTurnstileToken(null);
    setTouched({});
    setSubmitAttempted(false);
  }, []);

  /* ── Success ────────────────────────────────────────────── */
  if (state.succeeded) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative rounded-2xl overflow-hidden py-16 px-8"
      >
        <GridBackground />
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.15 }}
            className="w-16 h-16 rounded-full bg-[#92b353]/20 border-2 border-[#92b353] flex items-center justify-center mb-5"
          >
            <svg
              className="w-8 h-8 text-[#92b353]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </motion.div>
          <h3 className="text-2xl font-bold text-white mb-2">
            {labels.successHeading}
          </h3>
          <p className="text-white/60 max-w-sm mb-6 text-sm">
            {labels.successMessage}
          </p>
          <button
            type="button"
            onClick={resetForm}
            className="text-[#92b353] hover:text-[#a5c466] font-semibold text-sm transition-colors underline underline-offset-4"
          >
            {labels.sendAnother}
          </button>
        </div>
      </motion.div>
    );
  }

  /* ── Form ───────────────────────────────────────────────── */
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative rounded-2xl overflow-hidden"
    >
      <GridBackground />

      <form
        onSubmit={onSubmit}
        noValidate
        className="relative px-5 sm:px-8 py-8 sm:py-10"
      >
        <ValidationError
          prefix="Form"
          field="email"
          errors={state.errors}
          className="text-red-400 text-sm mb-3"
        />

        <div className="grid grid-cols-2 gap-x-4 gap-y-4 lg:gap-y-8 mb-6">
          {/* Row 1 */}
          <Field
            id="name"
            label={labels.name}
            placeholder={labels.namePlaceholder}
            value={name}
            onChange={(v) => {
              setName(v);
              touch("name");
            }}
            error={errors.name}
            required
          />
          <Field
            id="company"
            label={labels.company}
            placeholder={labels.companyPlaceholder}
            value={company}
            onChange={(v) => {
              setCompany(v);
              touch("company");
            }}
            error={errors.company}
            required
          />

          {/* Row 2 */}
          <Field
            id="designation"
            label={labels.designation}
            placeholder={labels.designationPlaceholder}
            value={designation}
            onChange={(v) => {
              setDesignation(v);
              touch("designation");
            }}
            error={errors.designation}
            required
          />
          <Field
            id="email"
            label={labels.email}
            type="email"
            placeholder={labels.emailPlaceholder}
            value={email}
            onChange={(v) => {
              setEmail(v);
              touch("email");
            }}
            error={errors.email}
            required
          />
        </div>
        {/* Row 3: Phone + Message side by side */}
        <div className="lg:space-y-8 space-y-4">
          <div>
            <label
              htmlFor="phone"
              className="block text-xs font-medium text-white/70 mb-1.5"
            >
              {labels.phone}
            </label>
            <div className="contact-phone-wrapper">
              <PhoneInput
                country="in"
                value={phone}
                onChange={(val) => setPhone(val)}
                inputProps={{ id: "phone", name: "phone" }}
                // inputClass="!w-full !bg-white/[0.07] !border !border-white/10 hover:!border-white/20 !rounded-lg !pl-12 !pr-3 !py-2.5 !text-white !placeholder-white/30 focus:!outline-none focus:!ring-2 focus:!ring-[#92b353]/50 focus:!border-[#92b353]/60 !transition-all !text-sm !h-auto"
                // containerClass="!w-full"
                // buttonClass="!bg-white/[0.07] !border !border-white/10 !border-r-0 !rounded-l-lg !px-2 hover:!bg-white/[0.12] !transition-all !h-auto"
                // dropdownClass="!bg-[#1a2550] !border !border-white/15 !text-white !rounded-lg !shadow-2xl !z-50 !max-h-48 !w-64 !left-0"
                // searchClass="!bg-white/10 !text-white !rounded !border-white/10 !text-sm !mx-2 !my-2 !p-1.5"
                inputClass="!w-full !bg-white/[0.07] !border !py-2.5 !border-white/10 hover:!border-white/20 !rounded-lg !text-white !placeholder-white/30 focus:!outline-none focus:!ring-2 focus:!ring-[#92b353]/50 focus:!border-[#92b353]/60 !transition-all !text-sm"
                containerClass="!w-full"
                buttonClass="!bg-white/[0.07] !border !border-white/10 !rounded-l-lg"
                enableSearch
                disableSearchIcon
                placeholder={labels.phonePlaceholder}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-xs font-medium text-white/70 mb-1.5"
            >
              {labels.message}
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              placeholder={labels.messagePlaceholder}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-white/[0.07] border border-white/10 hover:border-white/20 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/30
                focus:outline-none focus:ring-2 focus:ring-[#92b353]/50 focus:border-[#92b353]/60 transition-all resize-none"
            />
          </div>
        </div>

        {/* ── Turnstile + Submit ──────────────────────────────── */}
        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <AnimatePresence>
            {mandatoryValid && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="sr-only">{labels.captchaLabel}</p>
                <Turnstile
                  sitekey={turnstileSiteKey}
                  onSuccess={(token) => setTurnstileToken(token)}
                  onExpire={() => setTurnstileToken(null)}
                  theme="dark"
                  size="compact"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            disabled={state.submitting || !mandatoryValid || !turnstileToken}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative bg-[#92b353] hover:bg-[#a5c466] disabled:opacity-40 disabled:cursor-not-allowed
              text-[#202f63] font-bold px-8 py-3 rounded-full transition-all
              text-xs uppercase tracking-[0.15em] sm:ml-auto"
          >
            {state.submitting ? (
              <span className="flex items-center gap-2">
                <svg
                  className="w-3.5 h-3.5 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="opacity-25"
                  />
                  <path
                    d="M4 12a8 8 0 018-8"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="opacity-75"
                  />
                </svg>
                {labels.submitting}
              </span>
            ) : (
              labels.submit
            )}
          </motion.button>
        </div>

        {/* Server error */}
        <AnimatePresence>
          {state.errors && Object.keys(state.errors).length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-400/20"
            >
              <p className="text-red-400 font-semibold text-xs">
                {labels.errorHeading}
              </p>
              <p className="text-red-400/70 text-[11px] mt-0.5">
                {labels.errorMessage}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
}
