export default function CTAButton({
  children,
  disabled = false,
  onClick,
  className = "",
}) {
  return (
    <button
      disabled={disabled}
      onClick={() => onClick?.()}
      className={`border-none text-[var(--theme-button-primary-text)] text-xs px-4 py-1 font-semibold rounded-lg bg-primary-button hover:bg-[var(--theme-button-primary-hover-solid)] h-[34px] -mr-8 whitespace-nowrap w-fit ${className}`}
    >
      <div className="flex items-center justify-center gap-2">{children}</div>
    </button>
  );
}
