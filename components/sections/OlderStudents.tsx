import { olderFocus } from "@/content/offer";
import { LeadButton } from "@/components/lead/LeadButton";
import { CheckIcon } from "@/components/icons";

export function OlderStudents() {
  return (
    <section id="starsi-uczniowie" aria-labelledby="older-title" className="bg-sage-mist py-20 sm:py-24 lg:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="font-hand text-[1.75rem] leading-none text-leaf">Klasy 4–8 i szkoła średnia</p>
          <h2 id="older-title" className="mt-3 text-[2.35rem] font-semibold text-forest sm:text-[3rem] lg:text-[3.25rem]">
            Kiedy w szkole robi się trudniej.
          </h2>
          <p className="mt-5 max-w-[30rem] text-[1.1rem] text-ink">
            Więcej przedmiotów, szybsze tempo, ważne egzaminy. Pomagamy zrozumieć materiał i nadrobić to, co uciekło.
          </p>
          <p className="mt-6 max-w-[30rem] text-[1rem] text-ink-soft">
            Matematyka, polski, angielski, niemiecki i rosyjski.
          </p>
          <div className="mt-8">
            <LeadButton />
          </div>
        </div>

        {/* A notebook page: ruled lines and a margin, like a school exercise book. */}
        <div className="lg:col-span-7">
          <div className="relative rounded-[1.75rem] bg-[#fffefa] py-3 pl-14 pr-6 sm:pl-20 sm:pr-10">
          <span aria-hidden="true" className="absolute bottom-0 left-9 top-0 w-[1.5px] bg-pencil/45 sm:left-14" />
          <ul>
            {olderFocus.map((item) => (
              <li key={item.title} className="relative border-b border-forest/10 py-6 last:border-b-0 sm:py-7">
                <CheckIcon size={22} strokeWidth={2} className="absolute -left-[2.6rem] top-7 text-leaf sm:-left-[3.35rem] sm:top-8" />
                <h3 className="text-[1.45rem] font-semibold text-forest sm:text-[1.65rem]">{item.title}</h3>
                <p className="mt-1.5 text-[1.04rem] text-ink-soft">{item.text}</p>
              </li>
            ))}
          </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
