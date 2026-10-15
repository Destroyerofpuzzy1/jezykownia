import { site } from "@/content/site";
import { LeadButton } from "@/components/lead/LeadButton";
import { buttonClasses } from "@/components/ui/button";
import { ClockIcon, FacebookIcon, PhoneIcon, PinIcon } from "@/components/icons";
import { MapFacade } from "./MapFacade";

export function Contact() {
  return (
    <section id="kontakt" aria-labelledby="contact-title" className="on-dark bg-forest py-20 text-paper sm:py-24 lg:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <h2 id="contact-title" className="text-[2.6rem] font-semibold text-paper sm:text-[3.5rem] lg:text-[4rem]">
            Odwiedź nas albo zadzwoń.
          </h2>

          <a
            href={site.phone.href}
            className="mt-8 inline-flex items-center gap-4 font-display text-[2.3rem] font-semibold tracking-[-0.02em] text-paper decoration-pencil decoration-2 underline-offset-8 hover:underline sm:text-[3rem]"
          >
            <PhoneIcon size={34} className="shrink-0 text-sage" />
            {site.phone.display}
          </a>

          <dl className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <dt className="flex items-center gap-2.5 font-display text-[1rem] font-semibold text-sage">
                <PinIcon size={20} />
                Adres
              </dt>
              <dd className="mt-3 text-[1.1rem] leading-relaxed text-paper">
                <address className="not-italic">
                  {site.name}
                  <br />
                  ul. {site.address.street}
                  <br />
                  {site.address.postalCode} {site.address.city}
                </address>
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-2.5 font-display text-[1rem] font-semibold text-sage">
                <ClockIcon size={20} />
                Godziny otwarcia
              </dt>
              <dd className="mt-3">
                <table className="w-full max-w-[18rem] text-[1.05rem]">
                  <tbody>
                    {site.hours.map((h) => (
                      <tr key={h.label}>
                        <th scope="row" className="py-1 pr-4 text-left font-normal text-paper/80">
                          {h.short}
                        </th>
                        <td className="py-1 text-right tabular-nums text-paper">
                          {h.opens ? `${h.opens}–${h.closes}` : "zamknięte"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </dd>
            </div>
          </dl>

          <div className="mt-11 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
            <LeadButton variant="light" />
            <a href={site.directionsUrl} target="_blank" rel="noopener noreferrer" className={buttonClasses("ghost-light", "lg")}>
              Wyznacz trasę
              <span className="sr-only"> (Google Maps, nowa karta)</span>
            </a>
            {site.facebookUrl && (
              <a href={site.facebookUrl} target="_blank" rel="noopener noreferrer" className={buttonClasses("ghost-light", "lg")}>
                <FacebookIcon size={20} />
                Facebook
              </a>
            )}
          </div>
        </div>

        <div className="lg:col-span-6">
          <MapFacade />
        </div>
      </div>
    </section>
  );
}
