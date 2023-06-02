import {useCallback, useEffect, useState} from 'react';
import {Channel} from 'phoenix';
import {useTick} from './useTick';

export function useChannel(fn: () => Channel) {
  const [_tick, doTick] = useTick();

  const [channel] = useState(() => {
    const ch = fn();
    ch.onError((...args) => {
      console.log('channel onError', ...args);
      doTick();
    });
    ch.onClose((...args) => {
      // console.log('channel onClose', ...args);

      doTick();
    });
    ch.join().receive('ok', () => {
      console.log('channel join', ch['topic']);
      doTick();
    });

    return ch;
  });

  useEffect(() => {
    return () => {
      // console.log('channel leave');
      if (channel) {
        channel.leave();
      }
    };
  }, []);

  return channel;
}

export function useOnChannelEvent(channel: Channel, event: string, callback: (...args: any[]) => void, deps: any[]) {
  const cb = useCallback((...args: any[]) => {
    callback(...args);
  }, deps);

  useEffect(() => {
    if (!channel) {
      return;
    }
    const ref = channel.on(event, cb);
    return () => {
      channel.off(event, ref);
    };
  }, [channel, event, cb]);
}

export function useOnChannelJoined(channel: Channel, callback: () => void, deps: any[]) {
  const cb = useCallback(() => {
    callback();
  }, deps);

  useEffect(() => {
    if (!channel || channel.state !== 'joined') {
      return;
    }
    cb();
  }, [channel, channel.state, cb]);
}
