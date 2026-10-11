import { Divider } from './Divider';
import { MapButton } from './MapButton';
import { wedding } from '../data/wedding';

export function Venue() {
  return (
    <section className="border-b border-borders-dividers bg-white py-20 text-center md:py-28">
      <div className="container mx-auto max-w-3xl px-6">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-secondary-accent">
          Join Us
        </p>
        <h2 className="mb-6 font-headings text-[3.5rem] text-primary-accent md:text-6xl">
          {wedding.venue.heading}
        </h2>

        <Divider className="mb-8" />

        <p className="mx-auto mb-10 max-w-2xl font-body text-xl italic leading-relaxed text-text-secondary md:text-2xl">
          We are thrilled to invite you to celebrate our special day at the beautiful
        </p>

        <div className="inline-block w-full max-w-xl rounded-2xl border border-borders-dividers/50 bg-bg-primary p-8 shadow-soft md:p-12">
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
    </section>
  );
}
