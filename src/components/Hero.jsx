import { useCountdown } from '../hooks/useCountdown';
import { wedding } from '../data/wedding';

export function Hero() {
  const countdown = useCountdown(wedding.eventDate);

  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden py-16 text-center">
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover object-center opacity-80"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={wedding.media.heroVideo} type="video/mp4" />
      </video>

      <div className="absolute inset-0 z-0 bg-black/10" />

      <div className="relative z-10 mx-auto mt-8 flex w-full max-w-[90%] flex-col items-center rounded-[2rem] border border-white/80 bg-gradient-to-b from-white/95 to-white/90 px-6 pb-16 pt-12 shadow-2xl backdrop-blur-xl md:max-w-md">
        <img
          src={wedding.media.ganesh}
          alt="Lord Ganesha"
          className="mb-6 h-28 w-auto object-contain md:h-32"
        />

        <h1 className="mb-0 font-headings text-[4rem] leading-none text-primary-accent drop-shadow-sm md:text-[5rem]">
          {wedding.groom.fullName}
        </h1>
        <span className="my-3 font-headings text-4xl text-secondary-accent drop-shadow-sm md:text-5xl">
          &
        </span>
        <h1 className="mb-8 font-headings text-[4rem] leading-none text-primary-accent drop-shadow-sm md:text-[5rem]">
          {wedding.bride.fullName}
        </h1>

        <div className="w-full max-w-[90%]">
          <p className="mb-4 font-headings text-4xl text-secondary-accent md:text-5xl">
            {wedding.tagline}
          </p>
          <p className="mb-6 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary-accent lining-nums md:text-base">
            {wedding.dateLabel}
          </p>
        </div>

        <div className="mb-8 h-[1px] w-full max-w-[85%] bg-borders-dividers" />

        {countdown.expired ? (
          <p className="col-span-2 mt-6 block text-center font-headings text-5xl font-normal text-primary-accent">
            {wedding.expiredMessage}
          </p>
        ) : (
          <div className="mx-auto grid w-full max-w-[80%] grid-cols-2 gap-x-6 gap-y-8 pb-2">
            <CountdownCell value={countdown.days} label="Days" />
            <CountdownCell value={countdown.hours} label="Hours" />
            <CountdownCell value={countdown.minutes} label="Mins" />
            <CountdownCell value={countdown.seconds} label="Secs" />
          </div>
        )}

        <div className="absolute -bottom-5 left-1/2 z-20 flex -translate-x-1/2 transform flex-col items-center">
          <div className="flex items-center justify-center rounded-full border border-borders-dividers/50 bg-white/95 px-8 py-2.5 shadow-md backdrop-blur-md">
            <p className="font-body text-xs font-bold uppercase tracking-[0.25em] text-primary-accent">
              Scroll
            </p>
          </div>
        </div>
      </div>

      <div className="scroll-indicator absolute bottom-6 left-1/2 z-10 -translate-x-1/2 transform md:bottom-10">
        <svg className="h-6 w-6 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

function CountdownCell({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-body text-[3rem] font-semibold leading-none text-primary-accent lining-nums md:text-5xl">
        {value}
      </span>
      <span className="mt-2 text-[0.7rem] font-medium uppercase tracking-widest text-text-secondary md:text-xs">
        {label}
      </span>
    </div>
  );
}
