"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/content/site";
import { LeadButton } from "@/components/lead/LeadButton";
import { CloseIcon, MenuIcon, PhoneIcon } from "@/components/icons";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-40 bg-paper/95 transition-[box-shadow] duration-300 supports-[backdrop-filter]:bg-paper/90 ${
        scrolled || menuOpen ? "shadow-[0_1px_0_var(--color-line)]" : ""
      }`}
    >
      <div className="container-wide flex h-16 items-center justify-between gap-6 lg:h-[4.75rem]">
        <a href="#top" className="-ml-1 shrink-0 rounded-lg p-1" aria-label="Językownia, strona główna">
          <Image
            src="/images/logo-jezykownia.png"
            alt="Językownia"
            width={900}
            height={498}
            sizes="110px"
            className="h-11 w-auto lg:h-[3.25rem]"
          />
        </a>

        <nav aria-label="Główna nawigacja" className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-2">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group relative inline-flex h-11 items-center px-3 font-display text-[0.98rem] font-medium text-ink-soft transition-colors hover:text-forest"
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3 bottom-2 h-[2px] origin-left scale-x-0 rounded-full bg-leaf transition-transform duration-300 ease-[var(--ease-out-quint)] group-hover:scale-x-100"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 lg:gap-4">
          <a
            href={site.phone.href}
            className="hidden items-center gap-2 font-display text-[0.98rem] font-semibold text-forest xl:inline-flex"
          >
            <PhoneIcon size={18} />
            {site.phone.display}
          </a>
          <div className="hidden sm:block">
            <LeadButton size="md" />
          </div>
          <a
            href={site.phone.href}
            className="grid size-11 place-items-center rounded-full text-forest transition-colors hover:bg-sage-soft lg:hidden"
            aria-label={`Zadzwoń: ${site.phone.display}`}
          >
            <PhoneIcon size={22} />
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            className="-mr-2 grid size-11 place-items-center rounded-full text-forest transition-colors hover:bg-sage-soft lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-paper lg:hidden"
      >
        <nav aria-label="Menu mobilne" className="container-page py-4">
          <ul className="divide-y divide-line/70">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-14 items-center font-display text-[1.35rem] font-semibold text-forest"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid gap-3 pb-2 xs:grid-cols-2">
            <LeadButton className="w-full" />
            <a
              href={site.phone.href}
              className="inline-flex h-13 items-center justify-center gap-2 rounded-full border-[1.5px] border-forest/25 font-display font-semibold text-forest"
            >
              <PhoneIcon size={20} />
              {site.phone.display}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
