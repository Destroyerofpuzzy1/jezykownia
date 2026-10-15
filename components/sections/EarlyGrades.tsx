import Image from "next/image";
import { earlyGrades } from "@/content/offer";
import { LeadButton } from "@/components/lead/LeadButton";
import { PeopleIcon, PersonIcon, iconByName } from "@/components/icons";

export function EarlyGrades() {
  return (
    <section id="klasy-1-3" aria-labelledby="early-title" className="relative overflow-x-clip py-20 sm:py-24 lg:py-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="relative lg:col-span-6 lg:-ml-8 xl:ml-[calc(-1*max(3rem,(100vw-82rem)/2+3rem))]">
          <div
            aria-hidden="true"
            className="shape-leaf absolute -bottom-8 right-6 h-[70%] w-[70%] bg-sage-soft lg:-bottom-10 lg:-right-8"
          />
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-sage-soft [border-radius:2rem_42%_2rem_2rem/2rem_34%_2rem_2rem] lg:aspect-[6/5] lg:[border-radius:0_42%_2.5rem_0/0_34%_2.5rem_0]">
            <Image
              src="/images/kids-learning.jpg"
              alt="Dziecko ćwiczy pisanie w zeszycie, obok liczydło, kartoniki z cyframi i książeczka z zadaniami"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-[62%_60%]"
            />
          </div>
        </div>

        <div className="lg:col-span-6">
          <p className="font-hand text-[1.75rem] leading-none text-leaf">Klasy 1–3</p>
          <h2 id="early-title" className="mt-3 text-[2.35rem] font-semibold text-forest sm:text-[3rem] lg:text-[3.25rem]">
            Wsparcie w pierwszych latach szkoły.
          </h2>
          <p className="mt-5 max-w-[34rem] text-[1.1rem] text-ink">
            Pomagamy dzieciom w nauce i w pokonywaniu szkolnych trudności. Pracujemy nad tym, co jest dla dziecka teraz najtrudniejsze.
          </p>

          <ul className="mt-9 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {earlyGrades.map((item) => {
              const Icon = iconByName[item.icon];
              return (
                <li key={item.label} className="flex items-center gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-sage-soft text-forest">
                    <Icon size={24} />
                  </span>
                  <span className="text-[1.04rem] leading-snug text-ink">{item.label}</span>
                </li>
              );
            })}
          </ul>

          <div className="mt-10 grid gap-3 border-t border-line pt-7 xs:grid-cols-2">
            <p className="flex items-center gap-3 text-[1rem] text-ink">
              <PersonIcon size={24} className="shrink-0 text-leaf" />
              Zajęcia indywidualne
            </p>
            <p className="flex items-center gap-3 text-[1rem] text-ink">
              <PeopleIcon size={24} className="shrink-0 text-leaf" />
              Grupy 2–3 osobowe
            </p>
          </div>

          <div className="mt-8">
            <LeadButton prefill={{ audience: "klasy-1-3" }}>Zapytaj o zajęcia dla dziecka</LeadButton>
          </div>
        </div>
      </div>
    </section>
  );
}
