"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type Dispatch, type RefObject } from "react";
import {
  audienceOptions,
  formatOptions,
  goalOptions,
  labelOf,
  needOptions,
  needsForAudience,
  type AudienceId,
  type FormatId,
  type GoalId,
} from "@/lib/lead/options";
import { MESSAGE_MAX, validateContact, type ContactErrors } from "@/lib/lead/schema";
import { submitLead } from "@/lib/lead/submit";
import { site } from "@/content/site";
import { buttonClasses } from "@/components/ui/button";
import { ArrowLeftIcon, CheckIcon, CloseIcon, PhoneIcon } from "@/components/icons";
import { STEP_COUNT, isStepAnswered, type LeadAction, type LeadState } from "./LeadFormProvider";

const QUESTIONS = [
  { title: "Dla kogo są zajęcia?", hint: "Wybierz jedną odpowiedź." },
  { title: "Czego potrzebujesz?", hint: "Możesz zaznaczyć kilka odpowiedzi." },
  { title: "Jaka forma Cię interesuje?", hint: "Wybierz jedną odpowiedź." },
  { title: "Co jest teraz najważniejsze?", hint: "Wybierz jedną odpowiedź." },
  { title: "Zostaw swój kontakt", hint: "Wystarczy imię i numer telefonu." },
];

const CLOSE_MS = 220;

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type Props = {
  state: LeadState;
  dispatch: Dispatch<LeadAction>;
  openerRef: RefObject<HTMLElement | null>;
};

export function LeadDialog({ state, dispatch, openerRef }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const advanceTimer = useRef<number | undefined>(undefined);
  const [closing, setClosing] = useState(false);
  const [stepError, setStepError] = useState<string | null>(null);
  const [contactErrors, setContactErrors] = useState<ContactErrors>({});
  const [showContactErrors, setShowContactErrors] = useState(false);
  const titleId = useId();
  const { open, step, answers, status } = state;
  const isResult = status === "sent" || status === "not_configured" || status === "error";

  // Open / close the native modal dialog (gives us top layer, inert page and Esc).
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
    }
  }, [open]);

  // Move focus to the question heading whenever the step or result changes.
  useEffect(() => {
    if (!open) return;
    const id = window.requestAnimationFrame(() => headingRef.current?.focus({ preventScroll: true }));
    return () => window.cancelAnimationFrame(id);
  }, [open, step, isResult]);

  useEffect(() => () => window.clearTimeout(advanceTimer.current), []);

  function requestClose() {
    const dialog = dialogRef.current;
    if (!dialog || closing) return;
    window.clearTimeout(advanceTimer.current);
    if (prefersReducedMotion()) {
      dialog.close();
      return;
    }
    setClosing(true);
    window.setTimeout(() => {
      dialog.close();
      setClosing(false);
    }, CLOSE_MS);
  }

  function handleClosed() {
    setStepError(null);
    setShowContactErrors(false);
    dispatch({ type: "closed" });
    const opener = openerRef.current;
    if (opener && document.contains(opener)) opener.focus();
  }

  function goTo(next: number) {
    window.clearTimeout(advanceTimer.current);
    setStepError(null);
    dispatch({ type: "go", step: next });
  }

  function next() {
    if (!isStepAnswered(step, answers)) {
      setStepError(step === 1 ? "Zaznacz co najmniej jedną odpowiedź." : "Wybierz jedną odpowiedź, aby przejść dalej.");
      return;
    }
    goTo(step + 1);
  }

  /** Pointer selection on single-choice steps moves on automatically. Keyboard users press "Dalej". */
  function autoAdvance(event: React.MouseEvent) {
    if (event.detail === 0) return;
    window.clearTimeout(advanceTimer.current);
    advanceTimer.current = window.setTimeout(() => {
      setStepError(null);
      dispatch({ type: "go", step: step + 1 });
    }, 260);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (step < 4) {
      next();
      return;
    }
    const errors = validateContact(answers);
    setContactErrors(errors);
    setShowContactErrors(true);
    if (Object.keys(errors).length > 0) {
      const firstInvalid = (["name", "phone", "message"] as const).find((f) => errors[f]);
      if (firstInvalid) document.getElementById(`lead-${firstInvalid}`)?.focus();
      return;
    }
    const firstUnanswered = [0, 1, 2, 3].find((s) => !isStepAnswered(s, answers));
    if (firstUnanswered !== undefined) {
      goTo(firstUnanswered);
      setStepError("Uzupełnij tę odpowiedź, zanim wyślesz formularz.");
      return;
    }
    dispatch({ type: "status", status: "submitting" });
    const honeypot = (event.currentTarget as HTMLFormElement).elements.namedItem("company") as HTMLInputElement | null;
    const result = await submitLead({
      audience: answers.audience as AudienceId,
      needs: answers.needs,
      format: answers.format as FormatId,
      goal: answers.goal as GoalId,
      name: answers.name.trim(),
      phone: answers.phone.trim(),
      message: answers.message.trim(),
      company: honeypot?.value ?? "",
    });
    dispatch({ type: "status", status: result.status });
  }

  function setContact(field: "name" | "phone" | "message", value: string) {
    dispatch({ type: "set", field, value });
    if (showContactErrors) setContactErrors(validateContact({ ...answers, [field]: value }));
  }

  const progress = isResult ? 1 : (step + 1) / STEP_COUNT;
  const question = QUESTIONS[step];

  return (
    <dialog
      ref={dialogRef}
      className="lead-dialog"
      aria-labelledby={titleId}
      data-closing={closing ? "true" : undefined}
      onCancel={(e) => {
        e.preventDefault();
        requestClose();
      }}
      onClose={handleClosed}
    >
      <div
        className="flex h-full w-full items-end justify-center sm:items-center sm:p-6"
        onClick={(e) => {
          if (e.target === e.currentTarget) requestClose();
        }}
      >
        <div className="lead-panel relative flex max-h-[94dvh] w-full flex-col overflow-hidden rounded-t-[1.75rem] bg-paper text-ink shadow-[0_-12px_40px_rgb(20_44_28/0.18)] sm:max-h-[min(46rem,92dvh)] sm:max-w-[40rem] sm:rounded-[1.75rem] sm:shadow-[0_30px_80px_rgb(20_44_28/0.28)]">
          {/* Header */}
          <div className="shrink-0 px-5 pt-3 sm:px-8 sm:pt-6">
            <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-ink/15 sm:hidden" aria-hidden="true" />
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Image src="/images/logo-mark.png" alt="" width={26} height={32} className="h-8 w-auto" />
                <p id={titleId} className="font-display text-lg font-semibold text-forest">
                  Dobierz zajęcia
                </p>
              </div>
              <button
                type="button"
                onClick={requestClose}
                className="-mr-2 grid size-11 place-items-center rounded-full text-ink-soft transition-colors hover:bg-sage-soft hover:text-forest"
                aria-label="Zamknij formularz"
              >
                <CloseIcon size={22} />
              </button>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <ProgressLine value={progress} />
              <p className="shrink-0 text-sm tabular-nums text-ink-soft" aria-live="polite">
                {isResult ? "Gotowe" : `Krok ${step + 1} z ${STEP_COUNT}`}
              </p>
            </div>
          </div>

          {isResult ? (
            <ResultView
              status={status}
              name={answers.name.trim()}
              answers={answers}
              headingRef={headingRef}
              onBack={() => goTo(4)}
              onClose={requestClose}
            />
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex min-h-0 flex-1 flex-col">
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-6 pt-6 sm:px-8">
                <fieldset key={step} className="panel-enter min-w-0">
                  <legend className="contents">
                    <h2 ref={headingRef} tabIndex={-1} className="text-[1.7rem] font-semibold text-forest outline-none sm:text-[2rem]">
                      {question.title}
                    </h2>
                  </legend>
                  <p className="mt-2 text-[0.95rem] text-ink-soft">{question.hint}</p>

                  <div className="mt-6">
                    {step === 0 && (
                      <ChoiceList
                        name="audience"
                        options={audienceOptions}
                        value={answers.audience}
                        onChange={(v) => {
                          dispatch({ type: "set", field: "audience", value: v });
                          setStepError(null);
                        }}
                        onPointerChoose={autoAdvance}
                        columns
                      />
                    )}
                    {step === 1 && (
                      <div className="flex flex-wrap gap-2.5">
                        {needsForAudience(answers.audience).map((option) => {
                          const checked = answers.needs.includes(option.id);
                          return (
                            <label
                              key={option.id}
                              className={`group relative inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full border-[1.5px] px-4 text-[1rem] font-medium transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-pencil ${
                                checked ? "border-forest bg-forest text-paper" : "border-line bg-white hover:border-forest/50"
                              } ${"exclusive" in option ? "border-dashed" : ""}`}
                            >
                              <input
                                type="checkbox"
                                className="sr-only"
                                name="needs"
                                value={option.id}
                                checked={checked}
                                onChange={() => {
                                  dispatch({ type: "toggleNeed", id: option.id });
                                  setStepError(null);
                                }}
                              />
                              <span
                                className={`grid size-5 place-items-center rounded-full border-[1.5px] transition-colors ${
                                  checked ? "border-paper bg-paper text-forest" : "border-ink/25"
                                }`}
                                aria-hidden="true"
                              >
                                {checked && <CheckIcon size={13} strokeWidth={2.6} />}
                              </span>
                              {option.label}
                            </label>
                          );
                        })}
                      </div>
                    )}
                    {step === 2 && (
                      <ChoiceList
                        name="format"
                        options={formatOptions}
                        value={answers.format}
                        onChange={(v) => {
                          dispatch({ type: "set", field: "format", value: v });
                          setStepError(null);
                        }}
                        onPointerChoose={autoAdvance}
                      />
                    )}
                    {step === 3 && (
                      <ChoiceList
                        name="goal"
                        options={goalOptions}
                        value={answers.goal}
                        onChange={(v) => {
                          dispatch({ type: "set", field: "goal", value: v });
                          setStepError(null);
                        }}
                        onPointerChoose={autoAdvance}
                      />
                    )}
                    {step === 4 && (
                      <ContactStep
                        answers={answers}
                        errors={showContactErrors ? contactErrors : {}}
                        onChange={setContact}
                        onEdit={goTo}
                      />
                    )}
                  </div>

                  {stepError && (
                    <p role="alert" className="mt-4 text-[0.95rem] font-medium text-[#a6420e]">
                      {stepError}
                    </p>
                  )}
                </fieldset>
              </div>

              {/* Footer */}
              <div className="shrink-0 border-t border-line/80 bg-paper px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:px-8 sm:pb-6 sm:pt-4">
                <div className="flex items-center justify-between gap-3">
                  {step > 0 ? (
                    <button type="button" onClick={() => goTo(step - 1)} className={buttonClasses("secondary", "md", "px-4")}>
                      <ArrowLeftIcon size={18} />
                      Wstecz
                    </button>
                  ) : (
                    <a href={site.phone.href} className="inline-flex min-h-11 items-center gap-2 text-[0.95rem] font-medium text-forest">
                      <PhoneIcon size={18} />
                      <span>
                        <span className="hidden xs:inline">Wolisz zadzwonić? </span>
                        {site.phone.display}
                      </span>
                    </a>
                  )}
                  {step < 4 ? (
                    <button type="submit" className={buttonClasses("primary", "md", "min-w-32")}>
                      Dalej
                    </button>
                  ) : (
                    <button type="submit" className={buttonClasses("primary", "md", "min-w-44")} disabled={status === "submitting"}>
                      {status === "submitting" ? "Wysyłanie…" : "Zapytaj o zajęcia"}
                    </button>
                  )}
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </dialog>
  );
}

function ProgressLine({ value }: { value: number }) {
  return (
    <div className="relative h-3 flex-1" aria-hidden="true">
      <div className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-sage-soft" />
      <div
        className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-leaf transition-[width] duration-500 ease-[var(--ease-out-quint)]"
        style={{ width: `${value * 100}%` }}
      />
      <svg
        className="absolute top-1/2 -translate-y-1/2 transition-[left] duration-500 ease-[var(--ease-out-quint)]"
        style={{ left: `calc(${value * 100}% - ${value * 14}px)` }}
        width="14"
        height="12"
        viewBox="0 0 14 12"
      >
        <path d="M0 0.5 L13 6 L0 11.5 Z" fill="#f3d9b0" />
        <path d="M8 3.9 L13 6 L8 8.1 Z" fill="var(--color-pencil)" />
      </svg>
    </div>
  );
}

type Option = { id: string; label: string; hint?: string };

function ChoiceList<T extends string>({
  name,
  options,
  value,
  onChange,
  onPointerChoose,
  columns = false,
}: {
  name: string;
  options: readonly Option[];
  value: T | null;
  onChange: (value: T) => void;
  onPointerChoose: (event: React.MouseEvent) => void;
  columns?: boolean;
}) {
  return (
    <div className={`grid gap-2.5 ${columns ? "sm:grid-cols-2" : ""}`}>
      {options.map((option) => {
        const checked = value === option.id;
        return (
          <label
            key={option.id}
            onClick={onPointerChoose}
            className={`relative flex min-h-[3.75rem] cursor-pointer items-center gap-4 rounded-2xl border-[1.5px] px-4 py-3 transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-pencil ${
              checked ? "border-forest bg-sage-soft" : "border-line bg-white hover:border-forest/45"
            }`}
          >
            <input
              type="radio"
              className="sr-only"
              name={name}
              value={option.id}
              checked={checked}
              onChange={() => onChange(option.id as T)}
            />
            <span
              className={`grid size-6 shrink-0 place-items-center rounded-full border-[1.5px] transition-colors ${
                checked ? "border-forest bg-forest text-paper" : "border-ink/25 bg-white"
              }`}
              aria-hidden="true"
            >
              {checked && <CheckIcon size={14} strokeWidth={2.6} />}
            </span>
            <span className="min-w-0">
              <span className="block font-display text-[1.08rem] font-semibold leading-tight text-ink">{option.label}</span>
              {option.hint && <span className="mt-0.5 block text-[0.9rem] leading-snug text-ink-soft">{option.hint}</span>}
            </span>
          </label>
        );
      })}
    </div>
  );
}

function ContactStep({
  answers,
  errors,
  onChange,
  onEdit,
}: {
  answers: LeadState["answers"];
  errors: ContactErrors;
  onChange: (field: "name" | "phone" | "message", value: string) => void;
  onEdit: (step: number) => void;
}) {
  const field =
    "mt-1.5 block w-full rounded-xl border-[1.5px] bg-white px-4 text-[1.05rem] text-ink placeholder:text-ink/40 transition-colors focus:border-forest focus:outline-none focus-visible:outline-3 focus-visible:outline-offset-1 focus-visible:outline-pencil";
  return (
    <div className="space-y-5">
      <Summary answers={answers} onEdit={onEdit} />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="lead-name" className="text-[0.95rem] font-semibold text-ink">
            Imię
          </label>
          <input
            id="lead-name"
            name="name"
            type="text"
            autoComplete="given-name"
            value={answers.name}
            onChange={(e) => onChange("name", e.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "lead-name-error" : undefined}
            className={`${field} h-13 ${errors.name ? "border-[#a6420e]" : "border-line"}`}
          />
          {errors.name && (
            <p id="lead-name-error" className="mt-1.5 text-[0.9rem] text-[#a6420e]">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="lead-phone" className="text-[0.95rem] font-semibold text-ink">
            Telefon
          </label>
          <input
            id="lead-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="600 100 200"
            value={answers.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? "lead-phone-error" : undefined}
            className={`${field} h-13 ${errors.phone ? "border-[#a6420e]" : "border-line"}`}
          />
          {errors.phone && (
            <p id="lead-phone-error" className="mt-1.5 text-[0.9rem] text-[#a6420e]">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="lead-message" className="text-[0.95rem] font-semibold text-ink">
          Wiadomość <span className="font-normal text-ink-soft">(opcjonalnie)</span>
        </label>
        <textarea
          id="lead-message"
          name="message"
          rows={3}
          maxLength={MESSAGE_MAX}
          placeholder="Np. klasa dziecka, z czym jest trudność, preferowane dni."
          value={answers.message}
          onChange={(e) => onChange("message", e.target.value)}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "lead-message-error" : undefined}
          className={`${field} resize-none py-3 ${errors.message ? "border-[#a6420e]" : "border-line"}`}
        />
        {errors.message && (
          <p id="lead-message-error" className="mt-1.5 text-[0.9rem] text-[#a6420e]">
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot for bots, hidden from people and assistive tech. */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="lead-company">Firma</label>
        <input id="lead-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="text-[0.85rem] leading-relaxed text-ink-soft">
        Dane z formularza służą tylko do kontaktu w sprawie zajęć.
      </p>
    </div>
  );
}

function Summary({ answers, onEdit }: { answers: LeadState["answers"]; onEdit?: (step: number) => void }) {
  const rows = [
    { step: 0, label: "Dla kogo", value: labelOf(audienceOptions, answers.audience) },
    { step: 1, label: "Potrzeba", value: answers.needs.map((n) => labelOf(needOptions, n)).join(", ") },
    { step: 2, label: "Forma", value: labelOf(formatOptions, answers.format) },
    { step: 3, label: "Cel", value: labelOf(goalOptions, answers.goal) },
  ];
  return (
    <dl className="divide-y divide-line/70 rounded-2xl bg-sage-mist px-4">
      {rows.map((row) => (
        <div key={row.step} className="flex items-center gap-3 py-2.5">
          <dt className="w-20 shrink-0 text-[0.85rem] text-ink-soft">{row.label}</dt>
          <dd className="min-w-0 flex-1 text-[0.98rem] font-medium text-ink">{row.value || "–"}</dd>
          {onEdit && (
            <button
              type="button"
              onClick={() => onEdit(row.step)}
              className="-my-1 min-h-10 shrink-0 rounded-lg px-2 text-[0.88rem] font-semibold text-leaf underline decoration-leaf/30 underline-offset-4 hover:decoration-leaf"
            >
              Zmień<span className="sr-only">: {row.label}</span>
            </button>
          )}
        </div>
      ))}
    </dl>
  );
}

function ResultView({
  status,
  name,
  answers,
  headingRef,
  onBack,
  onClose,
}: {
  status: LeadState["status"];
  name: string;
  answers: LeadState["answers"];
  headingRef: RefObject<HTMLHeadingElement | null>;
  onBack: () => void;
  onClose: () => void;
}) {
  const heading = "text-[1.7rem] font-semibold text-forest outline-none sm:text-[2rem]";
  return (
    <div className="panel-enter min-h-0 flex-1 overflow-y-auto px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6 sm:px-8 sm:pb-8">
      {status === "sent" && (
        <>
          <h2 ref={headingRef} tabIndex={-1} className={heading}>
            Dziękujemy{name ? `, ${name}` : ""}.
          </h2>
          <p className="mt-3 max-w-[34rem] text-ink-soft">
            Wiadomość dotarła do Językowni. Odezwiemy się pod podany numer, żeby porozmawiać o zajęciach.
          </p>
          <div className="mt-8">
            <button type="button" onClick={onClose} className={buttonClasses("primary", "md")}>
              Zamknij
            </button>
          </div>
        </>
      )}

      {status === "not_configured" && (
        <>
          <h2 ref={headingRef} tabIndex={-1} className={heading}>
            Ta wiadomość nie została wysłana.
          </h2>
          <p className="mt-3 max-w-[34rem] text-ink-soft">
            To wersja demonstracyjna strony i formularz nie jest jeszcze podłączony. Zadzwoń do Językowni i podaj swoje odpowiedzi:
          </p>
          <div className="mt-5">
            <Summary answers={answers} />
          </div>
          <div className="mt-6 flex flex-col gap-3 xs:flex-row">
            <a href={site.phone.href} className={buttonClasses("primary", "lg")}>
              <PhoneIcon size={20} />
              Zadzwoń: {site.phone.display}
            </a>
            <button type="button" onClick={onBack} className={buttonClasses("secondary", "lg")}>
              Wróć do formularza
            </button>
          </div>
        </>
      )}

      {status === "error" && (
        <>
          <h2 ref={headingRef} tabIndex={-1} className={heading}>
            Nie udało się wysłać wiadomości.
          </h2>
          <p className="mt-3 max-w-[34rem] text-ink-soft">
            Sprawdź połączenie z internetem i spróbuj jeszcze raz. Możesz też od razu zadzwonić.
          </p>
          <div className="mt-6 flex flex-col gap-3 xs:flex-row">
            <button type="button" onClick={onBack} className={buttonClasses("primary", "lg")}>
              Spróbuj ponownie
            </button>
            <a href={site.phone.href} className={buttonClasses("secondary", "lg")}>
              <PhoneIcon size={20} />
              {site.phone.display}
            </a>
          </div>
        </>
      )}
    </div>
  );
}
