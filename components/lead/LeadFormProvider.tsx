"use client";

import { createContext, useCallback, useContext, useMemo, useReducer, useRef } from "react";
import { emptyAnswers, type LeadAnswers } from "@/lib/lead/schema";
import { needsForAudience } from "@/lib/lead/options";
import type { SubmitResult } from "@/lib/lead/submit";
import { LeadDialog } from "./LeadDialog";

export type LeadPrefill = Partial<Pick<LeadAnswers, "audience" | "needs" | "format" | "goal">>;

export const STEP_COUNT = 5; // 4 questions + contact details

export type LeadStatus = "idle" | "submitting" | SubmitResult["status"];

export type LeadState = {
  open: boolean;
  step: number;
  answers: LeadAnswers;
  status: LeadStatus;
};

export type LeadAction =
  | { type: "open"; prefill?: LeadPrefill }
  | { type: "closed" }
  | { type: "set"; field: keyof LeadAnswers; value: string | null }
  | { type: "toggleNeed"; id: LeadAnswers["needs"][number] }
  | { type: "go"; step: number }
  | { type: "status"; status: LeadStatus };

const initialState: LeadState = { open: false, step: 0, answers: emptyAnswers, status: "idle" };

export function isStepAnswered(step: number, a: LeadAnswers) {
  switch (step) {
    case 0:
      return a.audience !== null;
    case 1:
      return a.needs.length > 0;
    case 2:
      return a.format !== null;
    case 3:
      return a.goal !== null;
    default:
      return true;
  }
}

function pruneNeeds(answers: LeadAnswers): LeadAnswers {
  const allowed = new Set<string>(needsForAudience(answers.audience).map((n) => n.id));
  return { ...answers, needs: answers.needs.filter((n) => allowed.has(n)) };
}

function reducer(state: LeadState, action: LeadAction): LeadState {
  switch (action.type) {
    case "open": {
      // A finished conversation starts fresh; an unfinished one keeps its answers.
      const base = state.status === "sent" ? emptyAnswers : state.answers;
      const p = action.prefill ?? {};
      const answers = pruneNeeds({
        ...base,
        audience: p.audience ?? base.audience,
        format: p.format ?? base.format,
        goal: p.goal ?? base.goal,
        needs: p.needs ? [...new Set([...base.needs.filter((n) => n !== "nie-wiem"), ...p.needs])] : base.needs,
      });
      let step = 0;
      while (step < 4 && isStepAnswered(step, answers)) step++;
      // Prefilled answers should be visible, so never skip past the first unanswered question.
      return { open: true, step: action.prefill ? step : state.status === "sent" ? 0 : state.step, answers, status: "idle" };
    }
    case "closed":
      return { ...state, open: false, step: state.status === "sent" ? 0 : state.step };
    case "set": {
      const answers = { ...state.answers, [action.field]: action.value } as LeadAnswers;
      return { ...state, answers: action.field === "audience" ? pruneNeeds(answers) : answers };
    }
    case "toggleNeed": {
      const { needs } = state.answers;
      let next: LeadAnswers["needs"];
      if (action.id === "nie-wiem") next = needs.includes("nie-wiem") ? [] : ["nie-wiem"];
      else if (needs.includes(action.id)) next = needs.filter((n) => n !== action.id);
      else next = [...needs.filter((n) => n !== "nie-wiem"), action.id];
      return { ...state, answers: { ...state.answers, needs: next } };
    }
    case "go":
      return { ...state, step: Math.max(0, Math.min(STEP_COUNT - 1, action.step)), status: "idle" };
    case "status":
      return { ...state, status: action.status };
  }
}

type LeadContextValue = {
  openLeadForm: (prefill?: LeadPrefill) => void;
};

const LeadContext = createContext<LeadContextValue | null>(null);

export function useLeadForm() {
  const ctx = useContext(LeadContext);
  if (!ctx) throw new Error("useLeadForm must be used inside <LeadFormProvider>");
  return ctx;
}

export function LeadFormProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const openerRef = useRef<HTMLElement | null>(null);

  const openLeadForm = useCallback((prefill?: LeadPrefill) => {
    openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dispatch({ type: "open", prefill });
  }, []);

  const value = useMemo(() => ({ openLeadForm }), [openLeadForm]);

  return (
    <LeadContext.Provider value={value}>
      {children}
      <LeadDialog state={state} dispatch={dispatch} openerRef={openerRef} />
    </LeadContext.Provider>
  );
}
