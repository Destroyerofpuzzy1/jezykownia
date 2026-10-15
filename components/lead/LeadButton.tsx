"use client";

import { buttonClasses, type ButtonSize, type ButtonVariant } from "@/components/ui/button";
import { useLeadForm, type LeadPrefill } from "./LeadFormProvider";

type Props = {
  children?: React.ReactNode;
  prefill?: LeadPrefill;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

/** Every "Dobierz zajęcia" entry point uses this one trigger and the one shared form. */
export function LeadButton({ children = "Dobierz zajęcia", prefill, variant = "primary", size = "lg", className = "" }: Props) {
  const { openLeadForm } = useLeadForm();
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => openLeadForm(prefill)}
      className={buttonClasses(variant, size, className)}
    >
      {children}
    </button>
  );
}
