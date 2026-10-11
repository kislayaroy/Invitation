import { wedding } from '../data/wedding';
import { Page, ScrollHint } from './Page';
import { RingExchange } from './RingExchange';

export function SaveTheDate() {
  return (
    <Page withVideo videoSrc={wedding.media.heroVideo}>
      <div className="hero-card relative flex w-full max-w-[90%] flex-col items-center px-6 py-14 md:max-w-md">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-secondary-accent">
          Save the Date
        </p>
        <h2 className="mb-3 font-headings text-5xl text-primary-accent md:text-6xl">
          {wedding.dateLabel}
        </h2>
        <p className="mb-8 font-body text-base font-semibold uppercase tracking-[0.18em] text-secondary-accent">
          {wedding.timeLabel}
        </p>
        <RingExchange />
      </div>
      <ScrollHint />
    </Page>
  );
}
