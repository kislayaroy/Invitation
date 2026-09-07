export function Divider({ symbol = '✧', className = '' }) {
  return (
    <div className={`flex items-center justify-center opacity-60 ${className}`}>
      <div className="w-12 h-[1px] bg-secondary-accent md:w-16" />
      <span className="mx-4 text-lg text-secondary-accent md:text-xl">{symbol}</span>
      <div className="w-12 h-[1px] bg-secondary-accent md:w-16" />
    </div>
  );
}
