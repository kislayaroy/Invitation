import { useEffect, useRef, useState } from 'react';
import { AudioToggle } from './components/AudioToggle';
import { Blessings } from './components/Blessings';
import { Hero } from './components/Hero';
import { Parents } from './components/Parents';
import { SaveTheDate } from './components/SaveTheDate';
import { Venue } from './components/Venue';
import { wedding } from './data/wedding';

export default function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'auto';
  }, []);

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

      <main className="page-stack fade-in">
        <Hero />
        <SaveTheDate />
        <Parents />
        <Venue />
        <Blessings />
      </main>
    </>
  );
}
