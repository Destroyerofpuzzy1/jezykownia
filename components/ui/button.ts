export type ButtonVariant = "primary" | "secondary" | "light" | "ghost-light" | "quiet";
export type ButtonSize = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-full font-display font-semibold tracking-[-0.01em] whitespace-nowrap select-none " +
  "transition-[background-color,color,border-color,transform] duration-200 ease-out active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-forest text-paper hover:bg-leaf",
  secondary: "border-[1.5px] border-forest/25 text-forest hover:border-forest hover:bg-forest/[0.04]",
  light: "bg-paper text-forest hover:bg-sage-soft",
  "ghost-light": "border-[1.5px] border-paper/35 text-paper hover:border-paper hover:bg-paper/10",
  quiet: "text-forest underline decoration-forest/30 underline-offset-[6px] hover:decoration-forest",
};

const sizes: Record<ButtonSize, string> = {
  md: "h-11 px-5 text-[0.98rem]",
  lg: "h-13 px-7 text-[1.06rem]",
};

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "lg", extra = "") {
  return `${base} ${variants[variant]} ${variant === "quiet" ? "" : sizes[size]} ${extra}`;
}
