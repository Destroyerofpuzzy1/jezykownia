// Hand-drawn pencil line. The orange tip comes straight from the logo's pencil "J".

type Props = {
  className?: string;
  /** "load" draws once on page load, "view" draws when a parent sets data-inview="true". */
  draw?: "load" | "view" | "none";
  withTip?: boolean;
};

export function PencilUnderline({ className = "", draw = "load" }: Props) {
  return (
    <svg
      className={`${draw === "load" ? "draw-on-load" : ""} ${className}`}
      viewBox="0 0 420 24"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        pathLength={1}
        d="M4 15.5C60 9.8 118 7.4 176 8.6c50 1 92 5.1 140 4.6 36-.4 68-3.3 100-6.7"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Long wavy path used for the "how it works" flow (horizontal layout). */
export function PencilPath({ className = "", withTip = true }: Props) {
  return (
    <svg className={`draw-in-view ${className}`} viewBox="0 0 1200 90" fill="none" aria-hidden="true" focusable="false">
      <path
        data-draw
        pathLength={1}
        d="M6 58C120 22 220 20 330 44s210 38 320 12 230-44 340-18c70 16 120 22 170 16"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {withTip && (
        <g className="pencil-tip" transform="translate(1158 52) rotate(-8)">
          <path d="M0 -7 L18 0 L0 7 Z" fill="#f3d9b0" />
          <path d="M11 -2.8 L18 0 L11 2.8 Z" fill="var(--color-pencil)" />
        </g>
      )}
    </svg>
  );
}

/** Vertical variant for narrow screens. */
export function PencilPathVertical({ className = "" }: Props) {
  return (
    <svg className={`draw-in-view ${className}`} viewBox="0 0 40 600" fill="none" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path
        data-draw
        pathLength={1}
        d="M20 4c12 60-10 120 0 190s14 130 0 200-8 140 0 202"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
