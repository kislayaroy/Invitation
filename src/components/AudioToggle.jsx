export function AudioToggle({ isPlaying, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isPlaying ? 'Mute background music' : 'Play background music'}
      className="fixed bottom-6 right-6 z-[100] rounded-full border border-white/20 bg-primary-accent p-4 text-white opacity-90 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-opacity-90 hover:opacity-100"
    >
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {isPlaying ? (
          <path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
        ) : (
          <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" />
        )}
      </svg>
    </button>
  );
}
