import { faq } from "@/content/offer";
import { site } from "@/content/site";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-line py-20 sm:py-24 lg:py-28">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 id="faq-title" className="text-[2.35rem] font-semibold text-forest sm:text-[3rem]">
              Pytania i odpowiedzi
            </h2>
            <p className="mt-4 max-w-[22rem] text-[1.05rem] text-ink-soft">
              Nie ma tu Twojego pytania? Zadzwoń:{" "}
              <a href={site.phone.href} className="whitespace-nowrap font-semibold text-forest underline decoration-forest/30 underline-offset-4 hover:decoration-forest">
                {site.phone.display}
              </a>
            </p>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="border-t border-line">
            {faq.map((item) => (
              <details key={item.q} className="faq-item group border-b border-line">
                <summary className="flex min-h-[4.5rem] cursor-pointer list-none items-center justify-between gap-6 py-4 font-display text-[1.2rem] font-semibold text-ink transition-colors hover:text-forest sm:text-[1.35rem]">
                  {item.q}
                  <span
                    aria-hidden="true"
                    className="relative grid size-9 shrink-0 place-items-center rounded-full border-[1.5px] border-forest/25 text-forest transition-colors group-open:bg-forest group-open:text-paper"
                  >
                    <span className="absolute h-[1.5px] w-3.5 rounded-full bg-current" />
                    <span className="absolute h-3.5 w-[1.5px] rounded-full bg-current transition-transform duration-300 group-open:rotate-90 group-open:scale-y-0" />
                  </span>
                </summary>
                <p className="max-w-[40rem] pb-6 pr-12 text-[1.05rem] text-ink-soft">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
