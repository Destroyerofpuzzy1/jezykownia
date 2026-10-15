import { reviews, type Review } from "@/content/offer";
import { site } from "@/content/site";
import { GoogleStars } from "@/components/icons";

// Seconds per card in a row. Sets the speed: quick enough to feel alive, slow enough to read.
const SECONDS_PER_CARD = 7;

export function Reviews() {
  const rows = [reviews.filter((_, i) => i % 2 === 0), reviews.filter((_, i) => i % 2 === 1)];

  return (
    <section id="opinie" aria-labelledby="reviews-title" className="overflow-x-clip py-20 sm:py-24 lg:py-28">
      <div className="container-page grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-14">
        <div className="lg:col-span-7">
          <p className="font-display text-[0.85rem] font-semibold uppercase tracking-[0.14em] text-leaf">Opinie</p>
          <h2 id="reviews-title" className="mt-3 text-[2.35rem] font-semibold text-forest sm:text-[3rem] lg:text-[3.4rem]">
            Co mówią o Językowni?
          </h2>
        </div>

        <div className="flex items-center gap-5 lg:col-span-5 lg:justify-self-end">
          <p className="font-display text-[4rem] font-semibold leading-[0.8] tracking-[-0.05em] text-forest sm:text-[4.75rem]">
            {site.googleRating}
          </p>
          <div>
            <GoogleStars className="text-[1.2rem]" />
            <p className="mt-1.5 text-[1rem] text-ink-soft">
              <span className="sr-only">Ocena {site.googleRating} na 5 </span>w Google
            </p>
          </div>
        </div>
      </div>

      {reviews.length > 0 && (
        <div className="mt-12 space-y-4 sm:space-y-5 lg:mt-16">
          {rows.map((row, r) => (
            <ReviewRow key={r} items={row} reverse={r === 1} label={r === 0 ? "Opinie z Google" : undefined} />
          ))}
        </div>
      )}

      <div className="container-page mt-10 lg:mt-12">
        <a
          href={site.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center font-display font-semibold text-forest underline decoration-forest/30 underline-offset-[6px] transition-colors hover:decoration-forest"
        >
          Zobacz opinie w Google
          <span className="sr-only"> (otwiera się w nowej karcie)</span>
        </a>
      </div>
    </section>
  );
}

/**
 * One continuously moving row. The list is rendered four times and the track moves by
 * exactly half its width, so the second half lands where the first started: no visible jump,
 * and one half is always wider than the viewport. Spacing is per card (margin, not gap)
 * to keep both halves exactly equal. Only the first copy is exposed to screen readers.
 */
function ReviewRow({ items, reverse, label }: { items: Review[]; reverse: boolean; label?: string }) {
  const copies = [0, 1, 2, 3];
  return (
    <div className="marquee-viewport overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_4%,#000_96%,transparent)]">
      <ul
        aria-label={label}
        className="marquee-track flex w-max"
        data-direction={reverse ? "reverse" : undefined}
        style={{ "--marquee-duration": `${items.length * 2 * SECONDS_PER_CARD}s` } as React.CSSProperties}
      >
        {copies.flatMap((copy) =>
          items.map((review, i) => (
            <li
              key={`${copy}-${i}`}
              aria-hidden={copy > 0 ? true : undefined}
              className="mr-4 flex w-[min(80vw,22rem)] shrink-0 flex-col rounded-[1.25rem] border border-line bg-[#fffefa] p-6 sm:mr-5 sm:w-[24rem] sm:p-7"
            >
              <div className="flex items-center justify-between gap-4">
                <GoogleStars className="text-[0.95rem]" />
                <span className="text-[0.8rem] font-medium text-ink-soft/80">Google</span>
              </div>
              <blockquote className="mt-4 flex-1 text-[1.02rem] leading-relaxed text-ink">
                <p>„{review.text}”</p>
              </blockquote>
              <p className="mt-5 border-t border-sage-soft pt-4 font-display text-[1rem] font-semibold text-forest">
                {review.author}
              </p>
            </li>
          )),
        )}
      </ul>
    </div>
  );
}
