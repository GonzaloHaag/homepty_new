interface Props {
  showMoreFilters: boolean;
}
export function SectionMoreFilters({ showMoreFilters }: Props) {
  return (
    <section
      className={`grid transition-all duration-200 ease-in-out overflow-hidden ${
        showMoreFilters
          ? "grid-rows-[1fr] opacity-100"
          : "grid-rows-[0fr] opacity-0"
      }`}
    >
     <div className="min-h-0">
         Mas filtros
     </div>
    </section>
  );
}
