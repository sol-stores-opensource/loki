import {useCallback, useRef, useState} from 'react';

export function useTick(): [number, () => void] {
  const [tick, setTick] = useState(0);
  const tickRef = useRef(0);
  const doTick = useCallback(() => {
    tickRef.current += 1;
    setTick(tickRef.current);
  }, [tickRef, setTick]);

  return [tick, doTick];
}
