import { Page } from './Page';

export function Blessings() {
  return (
    <Page className="bg-primary-accent">
      <div className="relative w-full max-w-xl px-2 pb-8 text-center text-white">
        <h2 className="mb-6 font-headings text-5xl text-secondary-accent md:text-6xl">
          With Love & Blessings
        </h2>
        <p className="mx-auto max-w-2xl font-body text-xl italic leading-relaxed text-white/90 md:text-2xl">
          We can't wait to share the beginning of our forever with you. Your presence and blessings
          mean the world to us.
        </p>
        <div className="flex items-center justify-center py-10 opacity-80">
          <div className="h-[1px] w-16 bg-secondary-accent" />
          <span className="mx-4 text-2xl text-secondary-accent">♥</span>
          <div className="h-[1px] w-16 bg-secondary-accent" />
        </div>
        <p className="font-headings text-4xl text-secondary-accent md:text-5xl">Our Family</p>
        <p className="mt-4 font-body text-sm font-semibold uppercase tracking-[0.3em] text-secondary-accent md:text-base">
          Together with our families
        </p>
      </div>
    </Page>
  );
}
