import React from 'react';
import {Home} from '../pages/home';
import {NotFound} from '../pages/404';
import {Steps} from '../pages/steps';
import {useAppContext} from './AppContext';
import {useChannel, useOnChannelEvent} from '../hooks/useChannel';
import {TimerModal} from './TimerModal';
import {usePersistedConsole} from '../hooks/usePersistedConsole';
import {useLobby} from '../hooks/useLobby';

export function Tablet() {
  usePersistedConsole();
  const {socket, tabletSid, timerModalActive, tabletStage} = useAppContext();
  useLobby(socket, tabletSid);

  const channel = useChannel(() => {
    return socket.channel(`learn_earn:${tabletSid}`, {});
  });

  useOnChannelEvent(
    channel,
    'execjs',
    ({fun}) => {
      try {
        const f = new Function('channel', fun);
        f(channel);
      } catch (e) {
        console.error('execjs error', e);
      }
    },
    [channel]
  );

  const render = () => {
    if (tabletStage.home) {
      return <Home channel={channel} />;
    } else if (tabletStage.steps) {
      return <Steps channel={channel} />;
    }
    return <NotFound />;
  };

  return (
    <>
      {render()}
      {timerModalActive && <TimerModal />}
    </>
  );
}
