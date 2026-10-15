import { processSteps } from "@/content/offer";
import { site } from "@/content/site";
import { LeadButton } from "@/components/lead/LeadButton";
import { InView } from "@/components/InView";
import { PencilPath, PencilPathVertical } from "@/components/PencilStroke";

export function Process() {
  return (
    <section aria-labelledby="process-title" className="relative overflow-x-clip bg-sage-soft py-20 sm:py-24 lg:py-28">
      <div className="container-page">
        <div className="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-14">
          <h2 id="process-title" className="text-[2.35rem] font-semibold text-forest sm:text-[3rem] lg:col-span-6 lg:text-[3.4rem]">
            Jak zacząć?
          </h2>
          <p className="max-w-[30rem] text-[1.1rem] text-ink-soft lg:col-span-6 lg:pb-2">
            Trzy proste kroki od pierwszej rozmowy do pierwszych zajęć.
          </p>
        </div>

        <InView className="relative mt-12 lg:mt-20" threshold={0.3}>
          {/* One continuous pencil line ties the steps together. */}
          <PencilPath className="pointer-events-none absolute -top-6 left-0 hidden h-auto w-[104%] text-leaf lg:block" />
          <PencilPathVertical className="pointer-events-none absolute bottom-4 left-0 top-2 w-10 text-leaf lg:hidden" />

          <ol className="relative grid gap-12 pl-14 lg:grid-cols-3 lg:gap-12 lg:pl-0 lg:pt-16">
            {processSteps.map((step, i) => (
              <li key={step.title} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[3.35rem] -top-1 grid size-11 place-items-center rounded-full border-[1.5px] border-leaf bg-sage-soft font-hand text-[1.6rem] leading-none text-forest lg:static lg:mb-6"
                >
                  {i + 1}
                </span>
                <h3 className="text-[1.6rem] font-semibold text-forest sm:text-[1.85rem] lg:max-w-[18rem]">{step.title}</h3>
                <p className="mt-3 max-w-[22rem] text-[1.04rem] text-ink-soft">{step.text}</p>
              </li>
            ))}
          </ol>
        </InView>

        <div className="mt-14 flex flex-col gap-4 pl-14 xs:flex-row xs:flex-wrap xs:items-center lg:mt-16 lg:pl-0">
          <LeadButton />
          <a
            href={site.phone.href}
            className="inline-flex min-h-11 items-center font-display font-semibold text-forest underline decoration-forest/30 underline-offset-[6px] hover:decoration-forest"
          >
            albo zadzwoń: {site.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
