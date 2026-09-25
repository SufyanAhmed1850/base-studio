/** Vertical text-roll link: text swaps upward on hover (two stacked copies). */
export function Roll({ children }: { children: React.ReactNode }) {
  return (
    <span className="roll">
      <span className="roll-inner">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
    </span>
  );
}

export function RollLink({
  href,
  children,
  className = "",
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <a href={href} className={className} onClick={onClick}>
      <Roll>{children}</Roll>
    </a>
  );
}
