export function Page({ children, className = '', withVideo = false, videoSrc }) {
  return (
    <section className={`invite-page ${className}`}>
      {withVideo && (
        <>
          <video
            className="absolute inset-0 z-0 h-full w-full object-cover object-center opacity-80"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          <div className="absolute inset-0 z-0 bg-black/10" />
        </>
      )}
      <div className="relative z-10 flex min-h-[100dvh] w-full items-center justify-center px-5 py-12">
        {children}
      </div>
    </section>
  );
}

export function ScrollHint() {
  return (
    <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2">
      <div className="flex flex-col items-center">
        <div className="rounded-full border border-borders-dividers/50 bg-white/95 px-7 py-2 shadow-md">
          <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.28em] text-primary-accent">
            Scroll
          </p>
        </div>
      </div>
    </div>
  );
}
