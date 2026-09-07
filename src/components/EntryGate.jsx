import { useState } from 'react';
import { wedding } from '../data/wedding';

export function EntryGate({ onComplete, onStartAudio }) {
  const [opened, setOpened] = useState(false);

  const handleReveal = async () => {
    if (opened) return;
    setOpened(true);

    try {
      await onStartAudio();
    } catch (error) {
      console.error('Media play failed:', error);
    }

    window.setTimeout(onComplete, 1800);
  };

  return (
    <div
      className="entry-gate fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center bg-[#1a2218]"
      onClick={handleReveal}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(181,154,109,0.18),_transparent_62%)]" />

      <div className={`envelope ${opened ? 'is-open' : ''}`}>
        <div className="envelope-letter">
          <p className="font-headings text-3xl leading-none text-primary-accent">
            {wedding.groom.firstName}
          </p>
          <p className="my-1 font-headings text-xl text-secondary-accent">&</p>
          <p className="font-headings text-3xl leading-none text-primary-accent">
            {wedding.bride.firstName}
          </p>
        </div>
        <div className="envelope-flap" />
        <div className="envelope-pocket">
          <div className="envelope-seal">♥</div>
        </div>
      </div>

      <p
        className={`relative z-10 mt-10 font-body text-xs font-bold uppercase tracking-[0.35em] text-[#f3efe6] transition-opacity duration-500 ${
          opened ? 'opacity-0' : 'opacity-90'
        }`}
      >
        Tap to Reveal
      </p>
    </div>
  );
}
