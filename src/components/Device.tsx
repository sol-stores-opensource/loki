import React from 'react';
import {Connect} from '../pages/connect';
import {useAppContext} from './AppContext';
import {useSearchParams} from 'react-router-dom';
import {useChannel} from '../hooks/useChannel';

export function Device() {
  const {socket} = useAppContext();
  const [searchParams] = useSearchParams();
  const sid = searchParams.get('sid') || '';
  const channel = useChannel(() => {
    return socket.channel(`learn_earn:${sid}`, {});
  });

  return (
    <>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <Connect channel={channel} sid={sid} />
          </div>
        </div>
      </div>
    </>
  );
}
