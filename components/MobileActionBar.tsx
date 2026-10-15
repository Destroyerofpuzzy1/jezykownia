"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { LeadButton } from "@/components/lead/LeadButton";
import { PhoneIcon } from "@/components/icons";

/** Phone and form shortcuts for small screens, shown once the hero buttons are out of view. */
export function MobileActionBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nearEnd = window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 160;
      setVisible(window.scrollY > window.innerHeight * 0.7 && !nearEnd);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/97 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 transition-transform duration-300 ease-[var(--ease-out-quint)] lg:hidden ${
        visible ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      aria-hidden={!visible}
      inert={!visible}
    >
      <div className="mx-auto grid max-w-md grid-cols-[auto_1fr] gap-3">
        <a
          href={site.phone.href}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-[1.5px] border-forest/25 px-5 font-display font-semibold text-forest"
        >
          <PhoneIcon size={20} />
          Zadzwoń
        </a>
        <LeadButton size="md" className="h-12 w-full" />
      </div>
    </div>
  );
}
