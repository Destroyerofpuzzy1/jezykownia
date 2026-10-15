"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { PinIcon } from "@/components/icons";

/** Google Maps loads only after a click: no third-party requests or cookies on page load. */
export function MapFacade() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-forest-deep sm:aspect-[16/11] lg:aspect-auto lg:h-full lg:min-h-[28rem]">
      {loaded ? (
        <iframe
          title={`Mapa: ${site.name}, ${site.address.street}, ${site.address.city}`}
          src={site.mapEmbedUrl}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <>
          {/* A quiet, drawn street pattern standing in for the map. */}
          <svg aria-hidden="true" className="absolute inset-0 h-full w-full text-sage/25" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
            <g fill="none" stroke="currentColor" strokeLinecap="round">
              <path strokeWidth="10" d="M-20 210C80 190 150 120 240 110s130 20 190 0" />
              <path strokeWidth="5" d="M120 -10c10 80 20 150 60 320M300 -10c-20 90-10 200 30 320M-10 80c120 10 260 30 420 20" />
              <path strokeWidth="2.5" d="M40 -10c0 100 20 200 0 320M220 -10c10 60 30 110 20 320M-10 260c90-10 200 0 420-20M-10 30c140 20 280 0 420 10" />
            </g>
          </svg>
          <div className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-full text-pencil">
            <PinIcon size={52} strokeWidth={1.8} fill="var(--color-forest-deep)" />
          </div>
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-3 bg-gradient-to-t from-forest-deep/95 via-forest-deep/70 to-transparent p-6 pt-16 sm:flex-row sm:items-end sm:justify-between">
            <p className="font-display text-[1.15rem] font-semibold text-paper">
              {site.address.street}
              <span className="block text-[0.95rem] font-normal text-sage">
                {site.address.postalCode} {site.address.city}
              </span>
            </p>
            <button
              type="button"
              onClick={() => setLoaded(true)}
              className="inline-flex h-11 shrink-0 items-center rounded-full bg-paper px-5 font-display font-semibold text-forest transition-colors hover:bg-sage-soft"
            >
              Pokaż mapę Google
            </button>
          </div>
        </>
      )}
    </div>
  );
}
