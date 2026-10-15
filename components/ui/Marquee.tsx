
export function Marquee({
  items,
  className = "",
}: {
  items: readonly string[];
  className?: string;
}) {
  const renderRow = (keyPrefix: string, hidden: boolean) => (
    <ul
      className="flex shrink-0 items-center"
      aria-hidden={hidden || undefined}
    >
      {items.map((text, idx) => (
        <li key={`${keyPrefix}-${idx}-${text}`} className="flex items-center">
          <span className="font-display px-8 text-[clamp(1.5rem,3.2vw,2.75rem)] font-light tracking-tight whitespace-nowrap">
            {text}
          </span>
          <span className="size-2 rotate-45 bg-primary shrink-0" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`marquee relative overflow-hidden select-none ${className}`}>
      <div className="marquee-track flex w-max">
        {renderRow("primary", false)}
        {renderRow("dup-1", true)}
        {renderRow("dup-2", true)}
        {renderRow("dup-3", true)}
      </div>
    </div>
  );
}