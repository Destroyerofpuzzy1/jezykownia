import Image from "next/image";
import { exams } from "@/content/offer";
import { site } from "@/content/site";
import { LeadButton } from "@/components/lead/LeadButton";
import { PhoneIcon } from "@/components/icons";

export function Exams() {
  return (
    <section
      id="egzaminy"
      aria-labelledby="exams-title"
      className="on-dark relative overflow-x-clip bg-forest py-20 text-paper sm:py-24 lg:py-32"
    >
      <div className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <h2 id="exams-title" className="text-[2.6rem] font-semibold text-paper sm:text-[3.5rem] lg:text-[4.25rem]">
            Egzamin coraz bliżej?
          </h2>
          <p className="mt-5 max-w-[30rem] text-[1.15rem] leading-relaxed text-sage">
            Pomagamy uporządkować materiał i przygotować się do egzaminu krok po kroku.
          </p>

          <ul className="mt-10 border-t border-paper/15">
            {exams.map((exam) => (
              <li key={exam.id} className="border-b border-paper/15 py-6">
                <h3 className="text-[1.9rem] font-semibold text-paper sm:text-[2.25rem]">{exam.name}</h3>
                <p className="mt-1.5 text-[1rem] text-sage/90">{exam.who}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-4 xs:flex-row xs:flex-wrap xs:items-center">
            <LeadButton variant="light" prefill={{ goal: "egzamin" }}>
              Zapytaj o przygotowanie
            </LeadButton>
            <a
              href={site.phone.href}
              className="inline-flex min-h-11 items-center gap-2 font-display font-semibold text-paper/90 underline decoration-paper/30 underline-offset-[6px] hover:decoration-paper"
            >
              <PhoneIcon size={18} />
              albo zadzwoń: {site.phone.display}
            </a>
          </div>
        </div>

        <div className="relative lg:col-span-6 lg:-mr-8 xl:mr-[calc(-1*max(3rem,(100vw-82rem)/2+3rem))]">
          <div className="relative aspect-[4/3] overflow-hidden bg-forest-deep [border-radius:42%_2rem_2rem_2rem/34%_2rem_2rem_2rem] lg:aspect-[5/4] lg:[border-radius:42%_0_0_2.5rem/34%_0_0_2.5rem]">
            <Image
              src="/images/exam-learning.jpg"
              alt="Uczennica robi notatki przy biurku z podręcznikiem, kalkulatorem i zakreślaczami"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-[72%_50%]"
            />
          </div>
          <p aria-hidden="true" className="mt-4 font-hand text-[1.7rem] leading-none text-sage lg:absolute lg:-bottom-12 lg:left-6 lg:mt-0">
            krok po kroku
          </p>
        </div>
      </div>
    </section>
  );
}
