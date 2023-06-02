import {Socket} from 'phoenix';
import {useChannel, useOnChannelJoined} from './useChannel';
import {lokiSettings} from '../lib/LokiSettings';

export function useLobby(socket: Socket, tabletSid: string) {
  const lobby = useChannel(() => {
    return socket.channel(`learn_earn_lobby`, {});
  });

  useOnChannelJoined(
    lobby,
    () => {
      const w: any = window;

      const config = lokiSettings.result();
      if (!config.name) {
        config.name = 'FIXME';
      }
      if (!config.tutorialIds) {
        config.tutorialIds = [];
      }
      config['appRevision'] = w.appRevision;

      const payload = {sid: tabletSid, config};
      console.log('set_sid', payload);
      lobby.push('set_sid', payload, 10000);
    },
    [lobby, tabletSid]
  );
}
