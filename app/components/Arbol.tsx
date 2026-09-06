/** Rama de un árbol padre → hijo. El filete vertical lo pone el <ul> y cada
 *  hijo cuelga de él con su propio travesaño y su nodo. */
export function Rama({
  hijos,
  className = "",
}: {
  hijos: string[];
  className?: string;
}) {
  return (
    <ul className={`ml-[3px] border-l border-border ${className}`}>
      {hijos.map((h) => (
        <li key={h} className="relative py-1.5 pl-7">
          <span className="absolute left-0 top-[1.4em] h-px w-4 bg-border" />
          <span className="absolute left-[13px] top-[1.4em] size-[7px] -translate-y-1/2 rounded-full border border-border bg-background" />
          <span className="text-base leading-relaxed text-muted-foreground">
            {h}
          </span>
        </li>
      ))}
    </ul>
  );
}
