import {useCallback, useEffect, useRef} from 'react';
import {useTick} from './useTick';

export function useTimer(timerEndCallback: () => void, shouldTick = false, duration = 50000) {
  const idleTimer = useRef(0 as any as ReturnType<typeof setTimeout>);
  const countdownTimer = useRef(0 as any as ReturnType<typeof setInterval>);
  const seconds = useRef(duration / 1000);
  const [tick, doTick] = useTick();

  const resetIdleTimer = useCallback(() => {
    console.log('timer started');
    clearInterval(countdownTimer.current);
    clearTimeout(idleTimer.current);
    seconds.current = duration / 1000;

    idleTimer.current = setTimeout(() => {
      timerEndCallback();
    }, duration);

    if (shouldTick) {
      countdownTimer.current = setInterval(() => {
        seconds.current -= 1;
        doTick();
      }, 1000);
    }
  }, [countdownTimer, idleTimer, seconds, shouldTick, doTick]);

  const stopTimer = useCallback(() => {
    if (idleTimer.current || countdownTimer.current) {
      console.log('stop timer');
      clearTimeout(idleTimer.current);
      clearInterval(countdownTimer.current);
    }
  }, [countdownTimer, idleTimer, resetIdleTimer]);

  useEffect(() => {
    return () => {
      clearTimeout(idleTimer.current);
      clearInterval(countdownTimer.current);
    };
  }, []);

  return {resetIdleTimer, stopTimer, seconds, tick};
}
