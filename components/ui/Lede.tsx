import { clsx } from "@/lib/utils/clsx";

export function Lede({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={clsx("prose-body text-lg leading-relaxed opacity-90 md:text-xl", className)}>
      {children}
    </p>
  );
}
