"use client";

import { useRef, useState } from "react";
import { audiences } from "@/content/offer";
import { LeadButton } from "@/components/lead/LeadButton";
import { CheckIcon, PeopleIcon } from "@/components/icons";

export function GoalSelector() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const active = audiences[activeIndex];

  function onKeyDown(event: React.KeyboardEvent) {
    const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let nextIndex: number | null = null;
    if (event.key in keys) nextIndex = (activeIndex + keys[event.key] + audiences.length) % audiences.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = audiences.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    setActiveIndex(nextIndex);
    tabsRef.current[nextIndex]?.focus();
  }

  return (
    <section id="dla-kogo" aria-labelledby="selector-title" className="relative bg-sage-soft py-20 sm:py-24 lg:py-28">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <h2 id="selector-title" className="text-[2.35rem] font-semibold text-forest sm:text-[3rem] lg:text-[3.4rem]">
            Znajdź zajęcia dla siebie.
          </h2>
          <p className="mt-4 max-w-[28rem] text-[1.1rem] text-ink-soft">
            Wybierz, dla kogo szukasz zajęć. Pokażemy, w czym możemy pomóc.
          </p>

          <div
            role="tablist"
            aria-label="Dla kogo są zajęcia"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="relative mt-8 grid grid-cols-2 gap-2.5 lg:mt-12 lg:grid-cols-1 lg:gap-0"
          >
            {/* The growth line: dots get larger from the youngest group to adults. */}
            <span aria-hidden="true" className="absolute bottom-7 left-[0.9rem] top-7 hidden w-px bg-forest/20 lg:block" />
            {audiences.map((audience, i) => {
              const selected = i === activeIndex;
              return (
                <button
                  key={audience.id}
                  ref={(el) => {
                    tabsRef.current[i] = el;
                  }}
                  role="tab"
                  id={`tab-${audience.id}`}
                  aria-selected={selected}
                  aria-controls="selector-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveIndex(i)}
                  className={`group relative flex min-h-14 items-center gap-3 rounded-2xl px-4 text-left font-display font-semibold transition-colors duration-300 lg:min-h-[4.5rem] lg:rounded-none lg:bg-transparent lg:px-0 lg:text-[1.9rem] ${
                    selected
                      ? "bg-forest text-paper lg:text-forest"
                      : "bg-paper/70 text-ink-soft hover:text-forest lg:text-ink-soft/70"
                  }`}
                >
                  <span aria-hidden="true" className="relative hidden w-[1.8rem] shrink-0 justify-center lg:flex">
                    <span
                      className={`rounded-full transition-all duration-300 ${
                        selected ? "bg-pencil ring-4 ring-pencil/20" : "bg-forest/30 group-hover:bg-forest/60"
                      }`}
                      style={{ width: 8 + i * 3, height: 8 + i * 3 }}
                    />
                  </span>
                  <span className="text-[1.08rem] lg:pl-3 lg:text-[length:inherit]">{audience.label}</span>
                  <span
                    aria-hidden="true"
                    className={`ml-auto hidden h-[2px] origin-left rounded-full bg-forest transition-all duration-500 ease-[var(--ease-out-quint)] lg:block ${
                      selected ? "w-16 opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-7 lg:pt-3">
          <div
            role="tabpanel"
            id="selector-panel"
            aria-labelledby={`tab-${active.id}`}
            className="ruled-paper shape-soft relative h-full px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12"
          >
            <div key={active.id} className="panel-enter flex h-full flex-col">
              <p className="font-hand text-[1.6rem] leading-none text-leaf">{active.label}</p>
              <h3 className="mt-2 text-[2rem] font-semibold text-forest sm:text-[2.5rem]">{active.title}</h3>
              <p className="mt-4 max-w-[34rem] text-[1.08rem] text-ink">{active.text}</p>

              <p className="mt-8 font-display text-[1rem] font-semibold text-ink-soft">W czym pomagamy</p>
              <ul className="mt-3 grid gap-x-8 sm:grid-cols-2">
                {active.directions.map((d) => (
                  <li key={d} className="flex min-h-[2.15rem] items-center gap-3 text-[1.06rem] text-ink">
                    <CheckIcon size={18} className="shrink-0 text-leaf" strokeWidth={2.2} />
                    {d}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-10">
                <p className="flex items-center gap-3 text-[1rem] text-ink-soft">
                  <PeopleIcon size={22} className="shrink-0 text-leaf" />
                  Indywidualnie albo w grupie 2–3 osób.
                </p>
                <div className="mt-6 flex flex-col gap-4 xs:flex-row xs:flex-wrap xs:items-center">
                  <LeadButton prefill={{ audience: active.id }} />
                  <a
                    href={active.more.href}
                    className="inline-flex min-h-11 items-center font-display font-semibold text-forest underline decoration-forest/30 underline-offset-[6px] transition-colors hover:decoration-forest"
                  >
                    {active.more.label}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
