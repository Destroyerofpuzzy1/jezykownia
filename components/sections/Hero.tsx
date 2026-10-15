import Image from "next/image";
import { site } from "@/content/site";
import { subjects } from "@/content/offer";
import { LeadButton } from "@/components/lead/LeadButton";
import { buttonClasses } from "@/components/ui/button";
import { GoogleStars, PeopleIcon, PinIcon } from "@/components/icons";
import { PencilUnderline } from "@/components/PencilStroke";

/**
 * Centred hero that fills the screen below the navbar: headline, copy, CTAs and
 * trust line centred on top, the wide photo as a panoramic band growing to fill
 * the remaining height, subjects in one row underneath.
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative overflow-x-clip pb-12 pt-8 sm:pt-10 lg:flex lg:min-h-[calc(100svh-4.75rem)] lg:flex-col lg:pb-6 lg:pt-10"
    >
      <div className="container-wide relative flex flex-col items-center text-center lg:flex-1">
        <h1
          id="hero-title"
          className="font-semibold leading-[0.95] tracking-[-0.022em] text-forest text-[clamp(2.4rem,11.6vw,4.4rem)] sm:text-[clamp(4rem,9.4vw,6rem)] lg:flex lg:items-baseline lg:justify-center lg:gap-x-[0.3em] lg:text-[clamp(4rem,6vw,6.75rem)]"
        >
          <span className="hero-line block whitespace-nowrap" style={{ "--delay": "60ms" } as React.CSSProperties}>
            Małe kroki.
          </span>{" "}
          <span className="hero-line relative mx-auto block w-fit whitespace-nowrap lg:mx-0" style={{ "--delay": "180ms" } as React.CSSProperties}>
            Wielkie postępy.
            <PencilUnderline className="absolute -bottom-[0.13em] left-[0.03em] h-[0.13em] w-[94%] text-pencil/85" />
          </span>
        </h1>

        <p
          className="hero-fade mt-7 max-w-[24rem] text-[1.15rem] leading-relaxed text-ink sm:max-w-[34rem] sm:text-[1.25rem] lg:mt-8 lg:max-w-[44rem] lg:text-[clamp(1.2rem,1.5vw,1.45rem)] lg:leading-[1.5]"
          style={{ "--delay": "300ms" } as React.CSSProperties}
        >
          Języki, matematyka i wsparcie w nauce dla dzieci, młodzieży i dorosłych w Konstantynowie Łódzkim.
        </p>

        <div
          className="hero-fade mt-6 flex w-full flex-col justify-center gap-3 xs:w-auto xs:flex-row xs:flex-wrap"
          style={{ "--delay": "380ms" } as React.CSSProperties}
        >
          <LeadButton />
          <a href="#oferta" className={buttonClasses("secondary", "lg")}>
            Zobacz ofertę
          </a>
        </div>

        {/* Trust line: rating, address and lesson format side by side */}
        <ul
          className="hero-fade mt-7 flex flex-wrap items-center justify-center gap-x-9 gap-y-3 text-[0.98rem] text-ink-soft"
          style={{ "--delay": "460ms" } as React.CSSProperties}
          aria-label="W skrócie"
        >
          <li className="flex items-center gap-3">
            <span className="font-display text-[1.6rem] font-bold leading-none tracking-[-0.02em] text-forest">{site.googleRating}</span>
            <GoogleStars className="gap-[3px] text-[1.4rem] lg:text-[1.45rem]" />
            <span className="text-[1rem]">w Google</span>
          </li>
          <li className="flex items-center gap-2.5">
            <PinIcon size={22} className="shrink-0 text-leaf" />
            <span>
              ul. {site.address.street}, {site.address.city}
            </span>
          </li>
          <li className="flex items-center gap-2.5">
            <PeopleIcon size={22} className="shrink-0 text-leaf" />
            <span>Zajęcia indywidualne i małe grupy</span>
          </li>
        </ul>

        {/* Panoramic photo: grows to fill the rest of the screen on desktop */}
        <div className="hero-media shape-hero relative mt-9 aspect-[5/4] w-full overflow-hidden bg-sage-soft sm:aspect-[16/9] lg:mt-9 lg:aspect-auto lg:min-h-[18rem] lg:flex-1">
          <Image
            src="/images/hero-jezykownia.jpg"
            alt="Biurko do nauki z zeszytami, kalkulatorem, ołówkami i fiszkami językowymi"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[80%_55%] lg:object-[60%_48%]"
          />
        </div>

        <ul
          className="hero-fade mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 font-display text-[1rem] font-medium text-forest sm:text-[1.05rem] lg:gap-x-10 lg:text-[1.15rem]"
          style={{ "--delay": "620ms" } as React.CSSProperties}
          aria-label="Przedmioty"
        >
          {subjects.map((s) => (
            <li key={s.id} className="flex items-center gap-2.5">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-leaf/60" />
              {s.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
