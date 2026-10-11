import { Divider } from './Divider';
import { Page, ScrollHint } from './Page';
import { wedding } from '../data/wedding';

export function Parents() {
  return (
    <Page className="bg-bg-secondary">
      <div className="relative w-full max-w-xl px-2 text-center">
        <h3 className="mb-6 font-headings text-[2.5rem] leading-tight text-primary-accent md:text-5xl">
          With the Blessings of Our Beloved Parents
        </h3>

        <Divider className="mb-10" />

        <div className="space-y-10 font-body text-lg italic text-text-secondary md:text-xl">
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
      <ScrollHint />
    </Page>
  );
}
