import type { SVGProps } from "react";

// Simple line icons in the spirit of the printed materials: round caps, soft stroke.
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 24, children, ...rest }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const PencilIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4.5 19.5 5.6 15 16 4.6a2 2 0 0 1 2.8 0l.6.6a2 2 0 0 1 0 2.8L9 18.4l-4.5 1.1Z" />
    <path d="m14.5 6.2 3.3 3.3" />
  </Base>
);

export const AbcIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M2.8 16.5c0-1.7 1-2.6 2.4-2.6s2.3.9 2.3 2.6V18.5M7.5 16.2c-.2 1.5-1 2.4-2.3 2.4s-2-.6-2-1.4" />
    <path d="M10 9.5v9M10 15.6c0-1.4.9-2.3 2.1-2.3s2 1 2 2.6-.8 2.6-2 2.6-2.1-.9-2.1-2.3" />
    <path d="M21 14.3a2.1 2.1 0 0 0-1.7-.9c-1.3 0-2.2 1.1-2.2 2.6s.9 2.6 2.2 2.6a2.1 2.1 0 0 0 1.7-.9" />
  </Base>
);

export const HandIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M8 13V5.8a1.3 1.3 0 0 1 2.6 0V11M10.6 10.5V4.3a1.3 1.3 0 0 1 2.6 0v6.2M13.2 10.5V5.3a1.3 1.3 0 0 1 2.6 0V12" />
    <path d="M15.8 11.5V8.4a1.3 1.3 0 0 1 2.6 0v6c0 3.7-2.6 6.1-6 6.1-2.4 0-3.8-1-5.1-2.9l-2.4-3.5a1.3 1.3 0 0 1 2-1.6L8 13.6" />
  </Base>
);

export const NumbersIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M3.5 9.5 5.3 8v8.5" />
    <path d="M9 6.8c.4-1 1.2-1.5 2.2-1.5 1.2 0 2.1.8 2.1 1.9 0 1.8-2.6 3-4.3 5h4.4" />
    <path d="M16.3 13.6c.4-.6 1.1-1 2-1 1.2 0 2.1.7 2.1 1.8s-.9 1.7-2 1.7c1.3 0 2.2.8 2.2 1.9s-1 2-2.3 2c-1 0-1.8-.5-2.2-1.2" />
  </Base>
);

export const BookIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 6.5c-1.8-1.3-4.3-1.9-8.3-1.8v12.6c4-.1 6.5.5 8.3 1.8 1.8-1.3 4.3-1.9 8.3-1.8V4.7c-4-.1-6.5.5-8.3 1.8Z" />
    <path d="M12 6.5v12.6" />
  </Base>
);

export const StarIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m12 3.6 2.5 5.2 5.6.8-4.1 3.9 1 5.6-5-2.7-5 2.7 1-5.6-4.1-3.9 5.6-.8L12 3.6Z" />
  </Base>
);

export const PeopleIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="8.5" cy="8" r="3.2" />
    <circle cx="16.5" cy="9" r="2.7" />
    <path d="M3 19.5c.4-3.3 2.6-5.3 5.5-5.3s5.1 2 5.5 5.3M14.3 14.6c.7-.3 1.4-.4 2.2-.4 2.5 0 4.3 1.8 4.6 4.6" />
  </Base>
);

export const PersonIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="8" r="3.4" />
    <path d="M5.5 19.5c.5-3.6 3-5.7 6.5-5.7s6 2.1 6.5 5.7" />
  </Base>
);

export const PhoneIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M6.6 3.8h2.6l1.4 4-2 1.3a11 11 0 0 0 6.3 6.3l1.3-2 4 1.4v2.6a2 2 0 0 1-2.2 2C10.4 18.9 5.1 13.6 4.6 6a2 2 0 0 1 2-2.2Z" />
  </Base>
);

export const PinIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21s-6.5-5.6-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21Z" />
    <circle cx="12" cy="9.8" r="2.4" />
  </Base>
);

export const ClockIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Base>
);

export const CheckIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m5 12.5 4.2 4.2L19 7" />
  </Base>
);

export const CloseIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Base>
);

export const ArrowLeftIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </Base>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Base>
);

export const MenuIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </Base>
);

export const FacebookIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M14 8.5h2.5V5H14a3.5 3.5 0 0 0-3.5 3.5V11H8v3.5h2.5V21H14v-6.5h2.5L17 11h-3V9a.5.5 0 0 1 .5-.5Z" />
  </Base>
);

export const HeartDoodle = (p: IconProps) => (
  <Base {...p} strokeWidth={1.4}>
    <path d="M12 19.5c-1.2-1.6-6.8-5.4-7.3-9.4-.3-2.6 1.4-4.6 3.6-4.6 1.7 0 3 1.2 3.7 2.8.6-1.7 2-2.9 3.8-2.8 2.3.1 3.8 2.2 3.4 4.7-.6 3.9-6 7.6-7.2 9.3Z" />
  </Base>
);

export function GoogleStars({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 text-pencil ${className}`} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
          <path d="m12 2.8 2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3-4.6-4.4 6.3-.9L12 2.8Z" />
        </svg>
      ))}
    </span>
  );
}

export const iconByName = {
  pencil: PencilIcon,
  abc: AbcIcon,
  hand: HandIcon,
  numbers: NumbersIcon,
  book: BookIcon,
  star: StarIcon,
} as const;
