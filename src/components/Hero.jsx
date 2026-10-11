import { wedding } from '../data/wedding';
import { Page, ScrollHint } from './Page';

export function Hero() {
  return (
    <Page withVideo videoSrc={wedding.media.heroVideo}>
      <div className="hero-card relative flex w-full max-w-[90%] flex-col items-center px-6 pb-14 pt-12 md:max-w-md">
        <div className="ganesh-frame mb-3">
          <img
            src={wedding.media.ganesh}
            alt="Lord Ganesha"
            className="h-40 w-32 object-cover object-[center_18%] md:h-44 md:w-36"
          />
        </div>
        <p className="mb-5 font-devanagari text-lg font-semibold tracking-wide text-primary-accent md:text-xl">
          {wedding.ganeshMantra}
        </p>
        <div className="hero-ornament mb-6">
          <span />
          <i>✦</i>
          <span />
        </div>

        <h1 className="mb-0 font-headings text-[4rem] leading-none text-primary-accent drop-shadow-sm md:text-[5rem]">
          {wedding.groom.fullName}
        </h1>
        <span className="my-3 font-headings text-4xl text-secondary-accent drop-shadow-sm md:text-5xl">
          &
        </span>
        <h1 className="mb-8 font-headings text-[4rem] leading-none text-primary-accent drop-shadow-sm md:text-[5rem]">
          {wedding.bride.fullName}
        </h1>

        <p className="font-headings text-4xl text-secondary-accent md:text-5xl">{wedding.tagline}</p>
      </div>
      <ScrollHint />
    </Page>
  );
}
