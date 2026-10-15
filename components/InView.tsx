"use client";

import { useEffect, useRef } from "react";

/** Sets data-inview="true" once the element scrolls into view. CSS owns the actual animation. */
export function InView({
  children,
  className = "",
  threshold = 0.35,
}: {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reveal = () => el.setAttribute("data-inview", "true");
    if (!("IntersectionObserver" in window)) {
      reveal();
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={className} data-inview="false">
      {children}
    </div>
  );
}
