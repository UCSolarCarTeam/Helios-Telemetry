import { twMerge } from "tailwind-merge";

export default function Card({
  children,
  className,
  square,
}: {
  children: React.ReactNode;
  square?: boolean;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        `flex h-32 w-80 flex-col items-center justify-center rounded-2xl bg-sand text-xxs dark:bg-arsenic ${square && "h-72 w-80"}`,
        className,
      )}
    >
      {children}
    </div>
  );
}
