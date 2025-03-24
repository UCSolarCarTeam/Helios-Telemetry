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
        `text-md flex h-28 w-72 flex-col items-center justify-center rounded-2xl bg-blue-400 lg:text-lg ${square && "h-72 w-80"}`,
        className,
      )}
    >
      {children}
    </div>
  );
}
