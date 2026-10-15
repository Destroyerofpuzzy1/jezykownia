import { site } from "@/content/site";
import { LeadButton } from "@/components/lead/LeadButton";
import { HeartDoodle } from "@/components/icons";

export function SecondCta() {
  return (
    <section aria-labelledby="cta-title" className="pb-20 sm:pb-24 lg:pb-28">
      <div className="container-page">
        <div className="relative overflow-hidden bg-sage px-6 py-14 [border-radius:2rem_2rem_2rem_2rem] sm:px-12 sm:py-16 lg:px-20 lg:py-20 lg:[border-radius:2.5rem_38%_2.5rem_2.5rem/2.5rem_60%_2.5rem_2.5rem]">
          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h2 id="cta-title" className="text-[2.2rem] font-semibold text-forest-deep sm:text-[3rem] lg:text-[3.4rem]">
                Nie wiesz, które zajęcia wybrać?
              </h2>
              <p className="mt-5 max-w-[32rem] text-[1.12rem] text-forest-deep/85">
                Powiedz nam, czego potrzebujesz. Pomożemy dobrać odpowiednią formę zajęć.
              </p>
            </div>
            <div className="lg:col-span-5 lg:justify-self-end">
              <div className="flex flex-col gap-4 xs:flex-row xs:flex-wrap xs:items-center lg:flex-col lg:items-end">
                <LeadButton />
                <a
                  href={site.phone.href}
                  className="inline-flex min-h-11 items-center font-display font-semibold text-forest-deep underline decoration-forest-deep/30 underline-offset-[6px] hover:decoration-forest-deep"
                >
                  albo zadzwoń: {site.phone.display}
                </a>
              </div>
            </div>
          </div>
          <p aria-hidden="true" className="relative mt-10 flex items-center gap-2 font-hand text-[1.6rem] leading-none text-forest lg:mt-12">
            Małe kroki do wielkich osiągnięć!
            <HeartDoodle size={26} />
          </p>
        </div>
      </div>
    </section>
  );
}
