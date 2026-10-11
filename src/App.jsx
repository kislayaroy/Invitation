import { useEffect, useRef, useState } from 'react';
import { AudioToggle } from './components/AudioToggle';
import { Blessings } from './components/Blessings';
import { EntryGate } from './components/EntryGate';
import { Hero } from './components/Hero';
import { Parents } from './components/Parents';
import { Venue } from './components/Venue';
import { wedding } from './data/wedding';

export default function App() {
  const audioRef = useRef(null);
  const [showInvitation, setShowInvitation] = useState(() => {
    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).get('open') === '1';
  });
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showInvitation ? 'auto' : 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showInvitation]);

  useEffect(() => {
    const pauseOnHide = () => {
      if (document.hidden && audioRef.current && isPlaying) {
        audioRef.current.pause();
      }
    };

    const pauseOnUnload = () => {
      audioRef.current?.pause();
    };

    document.addEventListener('visibilitychange', pauseOnHide);
    window.addEventListener('beforeunload', pauseOnUnload);

    return () => {
      document.removeEventListener('visibilitychange', pauseOnHide);
      window.removeEventListener('beforeunload', pauseOnUnload);
    };
  }, [isPlaying]);

  useEffect(() => {
    if (!showInvitation) return;

    let userInteracted = false;
    let scrollAnimationHasRun = false;

    const markUserInteracted = () => {
      userInteracted = true;
    };

    window.addEventListener('wheel', markUserInteracted, { passive: true });
    window.addEventListener('touchstart', markUserInteracted, { passive: true });
    window.addEventListener('keydown', markUserInteracted, { passive: true });
    window.addEventListener('mousedown', markUserInteracted, { passive: true });

    const timeout = setTimeout(() => {
      if (userInteracted || scrollAnimationHasRun) return;
      if (window.innerWidth >= 768) return;
      if (window.pageYOffset > 50) return;

      const secondSection = document.getElementById('second-section');
      if (!secondSection) return;

      scrollAnimationHasRun = true;
      const sectionTop = secondSection.getBoundingClientRect().top + window.pageYOffset;
      const targetScroll = sectionTop - window.innerHeight * 0.5;
      smoothScrollTo(Math.max(0, targetScroll), 2500, () => userInteracted);
    }, 2500);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('wheel', markUserInteracted);
      window.removeEventListener('touchstart', markUserInteracted);
      window.removeEventListener('keydown', markUserInteracted);
      window.removeEventListener('mousedown', markUserInteracted);
    };
  }, [showInvitation]);

  const playAudio = async () => {
    if (!audioRef.current) return;
    await audioRef.current.play();
    setIsPlaying(true);
  };

  const toggleAudio = async (event) => {
    event.stopPropagation();
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await playAudio();
      }
    } catch (error) {
      console.error('Audio toggle failed:', error);
    }
  };

  return (
    <>
      <audio ref={audioRef} loop preload="metadata">
        <source src={wedding.media.audio} type="audio/mpeg" />
      </audio>

      <AudioToggle isPlaying={isPlaying} onToggle={toggleAudio} />

      {!showInvitation && (
        <EntryGate onStartAudio={playAudio} onComplete={() => setShowInvitation(true)} />
      )}

      {showInvitation && (
        <main className="fade-in">
          <Hero />
          <Parents />
          <Venue />
          <Blessings />
        </main>
      )}
    </>
  );
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function smoothScrollTo(targetPosition, duration, hasUserInteracted) {
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const startTime = performance.now();

  const animate = (currentTime) => {
    if (hasUserInteracted()) return;

    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
}
