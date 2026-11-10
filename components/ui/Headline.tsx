import { clsx } from "@/lib/utils/clsx";

type Props = {
  children: React.ReactNode;
  as?: "h1" | "h2";
  className?: string;
};

export function Headline({ children, as = "h2", className }: Props) {
  const Tag = as;
  return (
    <Tag
      className={clsx(
        as === "h1"
          ? "font-display text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.02] tracking-tight"
          : "font-display text-[clamp(2rem,4vw,3.5rem)] font-light leading-[1.05] tracking-tight",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
