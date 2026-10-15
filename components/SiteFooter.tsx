import Image from "next/image";
import { nav, site } from "@/content/site";
import { FacebookIcon } from "@/components/icons";

export function SiteFooter() {
  return (
    <footer className="bg-paper pb-28 pt-12 lg:pb-10">
      <div className="container-page">
        <div className="grid gap-8 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-12">
          <a href="#top" className="w-fit rounded-lg" aria-label="Językownia, wróć na górę strony">
            <Image src="/images/logo-jezykownia.png" alt="Językownia" width={900} height={498} sizes="120px" className="h-14 w-auto" />
          </a>

          <nav aria-label="Stopka">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 md:justify-center">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="inline-flex min-h-11 items-center text-[0.98rem] text-ink-soft transition-colors hover:text-forest">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-[0.98rem] text-ink-soft md:text-right">
            <p>
              ul. {site.address.street}, {site.address.postalCode} {site.address.city}
            </p>
            <a href={site.phone.href} className="inline-flex min-h-11 items-center font-display font-semibold text-forest">
              {site.phone.displayIntl}
            </a>
            {site.facebookUrl && (
              <a
                href={site.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-5 inline-flex min-h-11 items-center gap-1.5 font-display font-semibold text-forest underline decoration-transparent underline-offset-[6px] transition-[color,text-decoration-color] duration-200 hover:text-leaf hover:decoration-leaf/40"
              >
                <FacebookIcon size={20} />
                Facebook
                <span className="sr-only"> (otwiera się w nowej karcie)</span>
              </a>
            )}
          </div>
        </div>

        <p className="mt-8 border-t border-line pt-6 text-[0.88rem] text-ink-soft">
          © {new Date().getFullYear()} {site.name}, Konstantynów Łódzki
        </p>
      </div>
    </footer>
  );
}
