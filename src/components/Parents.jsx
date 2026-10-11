import { Divider } from './Divider';
import { wedding } from '../data/wedding';

export function Parents() {
  return (
    <section
      id="second-section"
      className="border-b border-borders-dividers bg-bg-secondary py-16 text-center md:py-20"
    >
      <div className="container mx-auto max-w-2xl px-6">
        <h3 className="mb-6 font-headings text-[2.5rem] leading-tight text-primary-accent md:text-5xl">
          With the Blessings of Our Beloved Parents
        </h3>

        <Divider className="mb-8" />

        <div className="space-y-8 font-body text-lg italic text-text-secondary md:text-xl">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase not-italic tracking-widest text-primary-accent">
              Groom's Parents
            </p>
            <p>{wedding.parents.groom}</p>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold uppercase not-italic tracking-widest text-primary-accent">
              Bride's Parents
            </p>
            <p>{wedding.parents.bride}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
