import {Channel} from 'phoenix';
import React, {useState} from 'react';
import {useOnChannelEvent, useOnChannelJoined} from '../hooks/useChannel';
import s from '../styles/spaces.module.scss';
import {uuid} from '../utils';

// device

const WalletConnect = ({channel}: {channel: Channel; sid: string}) => {
  const isPhantomInstalled = window['solana'] && window['solana'].isPhantom;
  const [loading, setLoading] = useState(true);

  const connectSolana = async () => {
    try {
      const resp = await window['solana'].connect();
      const address = resp.publicKey.toString();
      console.log('device_ready', {address});
      channel.push('device_ready', {address}, 10000);
    } catch (err) {
      // TODO: Add error messaging to the user
      // { code: 4001, message: 'User rejected the request.' }
    }
  };

  const connectDevice = async () => {
    let device_id = window.localStorage.getItem('SS_DEVICE_ID');
    if (!device_id) {
      device_id = uuid();
      window.localStorage.setItem('SS_DEVICE_ID', device_id);
    }
    console.log('device_ready', {device_id});
    channel.push('device_ready', {device_id}, 10000);
  };

  useOnChannelJoined(
    channel,
    () => {
      console.log('connect', {});
      channel.push('connect', {}, 10000).receive('ok', (data) => {
        if (data.selected_tutorial.opens_in === 'phantom') {
          if (isPhantomInstalled) {
            console.log('call connectSolana');
            connectSolana();
          }
          setLoading(false);
        } else if (data.selected_tutorial.opens_in === 'web_tuts') {
          console.log('call connectDevice');
          connectDevice();
        } else {
          const url = `${data.selected_tutorial.url}?ss_sid=${data.sid}`;
          window.location.replace(url);
        }
      });
    },
    []
  );

  useOnChannelEvent(
    channel,
    'start_device',
    (data) => {
      // alert(`got start ${JSON.stringify(data)}`);
      const url = `${data.selected_tutorial.url}?sid=${data.sid}&key=${data.address}`;
      window.location.replace(url);
    },
    []
  );

  if (!loading && !isPhantomInstalled) {
    return <p>Open this is in your phantom app.</p>;
  }
  return <p>loading...</p>;
};

export const Connect = ({channel, sid}: {channel: Channel; sid: string}) => {
  return (
    <div className={s.container}>
      <WalletConnect channel={channel} sid={sid} />
    </div>
  );
};
