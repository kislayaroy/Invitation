import { useEffect, useMemo, useState } from 'react';

const PETAL_COLORS = ['#d4a017', '#c9892e', '#e8c36a', '#b59a6d', '#f0d48a', '#9a7a3c'];

export function EntryGate({ onComplete, onStartAudio }) {
  const [phase, setPhase] = useState('petals');
  const [opened, setOpened] = useState(false);
  const petals = useMemo(() => createPetals(56), []);
  const sparks = useMemo(() => createSparks(24), []);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setPhase('fading'), 2800);
    const revealTimer = window.setTimeout(() => setPhase('reveal'), 3500);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(revealTimer);
    };
  }, []);

  const handleReveal = async () => {
    if (phase !== 'reveal' || opened) return;
    setOpened(true);

    try {
      await onStartAudio();
    } catch (error) {
      console.error('Media play failed:', error);
    }

    window.setTimeout(onComplete, 1900);
  };

  const canTap = phase === 'reveal';

  return (
    <div
      className={`entry-gate ${canTap ? 'is-ready' : ''} ${opened ? 'is-opening' : ''}`}
      onClick={handleReveal}
    >
      <div className="entry-glow" />
      <div className="entry-vignette" />
      <Mandala />
      <CornerOrnament className="entry-corner entry-corner-tl" />
      <CornerOrnament className="entry-corner entry-corner-tr" />
      <CornerOrnament className="entry-corner entry-corner-bl" />
      <CornerOrnament className="entry-corner entry-corner-br" />

      <div className={`petal-layer ${phase === 'fading' || phase === 'reveal' ? 'is-gone' : ''}`}>
        {petals.map((petal) => (
          <span
            key={petal.id}
            className="falling-petal"
            style={{
              left: petal.left,
              width: petal.size,
              height: petal.size * 1.2,
              animationDelay: petal.delay,
              animationDuration: petal.duration,
              color: petal.color,
              '--sway': petal.sway,
            }}
          >
            <PetalIcon />
          </span>
        ))}
        {sparks.map((spark) => (
          <span
            key={`spark-${spark.id}`}
            className="gold-spark"
            style={{
              left: spark.left,
              animationDelay: spark.delay,
              animationDuration: spark.duration,
            }}
          />
        ))}
      </div>

      <div className={`reveal-stage ${canTap ? 'is-visible' : ''}`}>
        <p className="entry-kicker">With the blessings of elders</p>
        <div className={`invite-card ${opened ? 'is-open' : ''}`}>
          <div className="invite-card-inner">
            <span className="invite-om">ॐ</span>
            <p className="invite-mystery">You are invited</p>
            <div className="invite-seal">♥</div>
          </div>
        </div>
        <p className={`tap-reveal-text ${opened ? 'is-hidden' : ''}`}>Tap to Reveal</p>
      </div>
    </div>
  );
}

function Mandala() {
  return (
    <svg className="entry-mandala" viewBox="0 0 200 200" aria-hidden="true">
      <circle cx="100" cy="100" r="92" />
      <circle cx="100" cy="100" r="74" />
      <circle cx="100" cy="100" r="52" />
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * Math.PI) / 6;
        const x = 100 + Math.cos(angle) * 62;
        const y = 100 + Math.sin(angle) * 62;
        return <circle key={i} cx={x} cy={y} r="5" />;
      })}
    </svg>
  );
}

function CornerOrnament({ className }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <path d="M8 72 C8 28 28 8 72 8" />
      <path d="M22 72 C22 40 40 22 72 22" />
      <path d="M8 52 C20 52 28 44 28 28" />
    </svg>
  );
}

function PetalIcon() {
  return (
    <svg viewBox="0 0 20 28" className="h-full w-full" fill="currentColor">
      <path d="M10 2 C5 8 3 14 4 20 C5 25 8 27 10 27 C12 27 15 25 16 20 C17 14 15 8 10 2 Z" />
    </svg>
  );
}

function createPetals(count) {
  return Array.from({ length: count }, (_, id) => ({
    id,
    left: `${(id * 17 + (id % 5) * 7) % 100}%`,
    delay: `${(id % 14) * 0.1}s`,
    duration: `${3.2 + (id % 7) * 0.28}s`,
    size: 14 + (id % 9) * 4,
    color: PETAL_COLORS[id % PETAL_COLORS.length],
    sway: `${id % 2 === 0 ? 26 : -28}px`,
  }));
}

function createSparks(count) {
  return Array.from({ length: count }, (_, id) => ({
    id,
    left: `${(id * 29) % 100}%`,
    delay: `${(id % 8) * 0.2}s`,
    duration: `${2.8 + (id % 5) * 0.4}s`,
  }));
}
