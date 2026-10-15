"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { subjects, type Subject } from "@/content/offer";
import { LeadButton } from "@/components/lead/LeadButton";

export function Subjects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const active = subjects[activeIndex];

  function onKeyDown(event: React.KeyboardEvent) {
    const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let nextIndex: number | null = null;
    if (event.key in keys) nextIndex = (activeIndex + keys[event.key] + subjects.length) % subjects.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = subjects.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    setActiveIndex(nextIndex);
    tabsRef.current[nextIndex]?.focus();
  }

  return (
    <section id="oferta" aria-labelledby="subjects-title" className="relative overflow-x-clip py-20 sm:py-24 lg:py-32">
      <div className="container-page">
        <div className="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-14">
          <h2 id="subjects-title" className="text-[2.35rem] font-semibold text-forest sm:text-[3rem] lg:col-span-6 lg:text-[3.4rem]">
            Języki i matematyka.
          </h2>
          <p className="max-w-[30rem] text-[1.1rem] text-ink-soft lg:col-span-6 lg:pb-2">
            Pięć przedmiotów dla uczniów i dorosłych. Zajęcia indywidualne albo w grupie 2–3 osób.
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-14">
          <div
            role="tablist"
            aria-label="Przedmioty"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="border-t border-line lg:col-span-6"
          >
            {subjects.map((subject, i) => {
              const selected = i === activeIndex;
              return (
                <div key={subject.id} className="border-b border-line">
                  <button
                    ref={(el) => {
                      tabsRef.current[i] = el;
                    }}
                    role="tab"
                    id={`subject-tab-${subject.id}`}
                    aria-selected={selected}
                    aria-controls={`subject-panel subject-panel-${subject.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActiveIndex(i)}
                    className="group flex w-full items-baseline justify-between gap-4 py-4 text-left lg:py-5"
                  >
                    <span
                      className={`font-display text-[2.1rem] font-semibold leading-none tracking-[-0.03em] transition-colors duration-300 sm:text-[2.75rem] lg:text-[clamp(2.6rem,4.2vw,3.75rem)] ${
                        selected ? "text-forest" : "text-ink/30 group-hover:text-ink/60"
                      }`}
                    >
                      {subject.name}
                    </span>
                    <span
                      className={`shrink-0 text-[0.92rem] transition-colors duration-300 ${selected ? "text-leaf" : "text-ink-soft/70"}`}
                    >
                      {subject.kind}
                    </span>
                  </button>
                  {/* On phones the details open right under the chosen subject. */}
                  {selected && (
                    <div id={`subject-panel-${subject.id}`} className="pb-7 lg:hidden">
                      <SubjectNote subject={subject} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="relative hidden lg:col-span-6 lg:block">
            <div className="shape-leaf relative ml-auto aspect-[5/4] w-[92%] overflow-hidden bg-sage-soft">
              <Image
                src="/images/language-learning.jpg"
                alt="Fiszki, dymki rozmowy, słuchawki i zeszyt na biurku do nauki języków"
                fill
                sizes="(min-width: 1024px) 40vw, 0px"
                className="object-cover object-[62%_50%]"
              />
            </div>
            <div
              id="subject-panel"
              role="tabpanel"
              aria-labelledby={`subject-tab-${active.id}`}
              className="ruled-paper relative -mt-36 mr-14 rounded-[1.75rem] p-8 shadow-[0_24px_60px_-30px_rgb(20_44_28/0.45)] xl:p-10"
            >
              <div key={active.id} className="panel-enter">
                <SubjectNote subject={active} large />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SubjectNote({ subject, large = false }: { subject: Subject; large?: boolean }) {
  return (
    <div>
      <p lang={subject.noteLang} className={`font-hand leading-none text-leaf ${large ? "text-[2.75rem]" : "text-[2.2rem]"}`}>
        {subject.note}
      </p>
      <p className={`mt-4 text-ink ${large ? "text-[1.12rem]" : "text-[1.05rem]"}`}>{subject.text}</p>
      <p className="mt-3 text-[0.95rem] text-ink-soft">
        <span className="font-semibold text-ink">Dla kogo:</span> {subject.forWhom.toLowerCase()}
      </p>
      <div className="mt-6">
        <LeadButton prefill={{ needs: [subject.id] }} size={large ? "lg" : "md"}>
          Zapytaj o {subject.askAs}
        </LeadButton>
      </div>
    </div>
  );
}
