import {useEffect, useRef, useState} from 'react';
import {Socket} from 'phoenix';
import {useTick} from './useTick';

export function useSocket(fn: () => Socket) {
  const [_tick, doTick] = useTick();
  const refs = useRef({
    open: '',
    close: '',
    error: '',
    message: '',
  });

  const [socket] = useState(() => {
    const s = fn();
    refs.current.open = s.onOpen((...args) => {
      doTick();
    });
    refs.current.error = s.onError((...args) => {
      doTick();
    });
    refs.current.close = s.onClose((...args) => {
      s['reconnectTimer'].reset();
      s['reconnectTimer'].scheduleTimeout();
      doTick();
    });
    s.connect();

    return s;
  });

  useEffect(() => {
    return () => {
      // console.log('socket disconnect');
      if (socket) {
        const {open, close, error} = refs.current;
        socket.off([open, close, error]);
        socket.disconnect();
      }
    };
  }, []);

  return socket;
}
