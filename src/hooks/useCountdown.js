import { useEffect, useState } from 'react';

const pad = (value) => String(Math.max(0, value)).padStart(2, '0');

export function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

function getTimeLeft(targetDate) {
  const distance = new Date(targetDate).getTime() - Date.now();

  if (distance <= 0) {
    return { days: '00', hours: '00', minutes: '00', seconds: '00', expired: true };
  }

  return {
    days: pad(Math.floor(distance / (1000 * 60 * 60 * 24))),
    hours: pad(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
    minutes: pad(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))),
    seconds: pad(Math.floor((distance % (1000 * 60)) / 1000)),
    expired: false,
  };
}
