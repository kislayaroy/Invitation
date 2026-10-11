import { Divider } from './Divider';
import { MapButton } from './MapButton';
import { Page, ScrollHint } from './Page';
import { wedding } from '../data/wedding';

export function Venue() {
  return (
    <Page className="bg-white">
      <div className="relative w-full max-w-xl px-2 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-secondary-accent">
          Join Us
        </p>
        <h2 className="mb-6 font-headings text-[3.5rem] text-primary-accent md:text-6xl">
          {wedding.venue.heading}
        </h2>

        <Divider className="mb-8" />

        <div className="rounded-2xl border border-borders-dividers/50 bg-bg-primary p-8 shadow-soft md:p-12">
          <h3 className="font-body text-3xl font-bold text-primary-accent md:text-4xl">
            {wedding.venue.name}
          </h3>
          {wedding.venue.location && (
            <p className="mt-3 font-body text-lg leading-relaxed text-text-secondary md:text-xl">
              {wedding.venue.location}
            </p>
          )}
          {wedding.venue.mapsUrl && (
            <div className="mt-8">
              <MapButton href={wedding.venue.mapsUrl}>Navigate to Venue</MapButton>
            </div>
          )}
        </div>
      </div>
      <ScrollHint />
    </Page>
  );
}
