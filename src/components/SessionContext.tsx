import React, {ReactNode, useState, useContext, useCallback} from 'react';
import {Socket} from 'phoenix';
import {useSearchParams} from 'react-router-dom';
import {useSocket} from '../hooks/useSocket';
import {uuid} from '../utils';
import {useChannel, useOnChannelJoined} from '../hooks/useChannel';

export type SessionContextState = ReturnType<typeof useSessionContextValue>;

export const SessionContext = React.createContext(null as any as SessionContextState);

export function useSessionContext() {
  return useContext(SessionContext);
}

function useSessionContextValue() {
  const [searchParams] = useSearchParams();
  const secret = searchParams.get('secret') || '';

  const socket = useSocket(() => {
    return new Socket(`${process.env.REACT_APP_NOX_WS_BASE}/learn_earn`, {
      params: {
        secret,
      },
      reconnectAfterMs: (tries: number) => 1000,
      rejoinAfterMs: (tries: number) => 1000,
      logger: (kind, msg, data) => {
        let safeData: any;
        try {
          safeData = JSON.parse(JSON.stringify(data));
        } catch (e) {
          safeData = null;
        }
        console.log(`[SOCKET] ${kind}: ${msg}`, safeData);
      },
    });
  });

  const [tabletSid, setTabletSid] = useState(() => {
    const sid = uuid();
    console.info(`initialize sid: ${sid}`);
    return sid;
  });

  // const resetTabletSid = useCallback(() => {
  //   const sid = uuid();
  //   console.info(`resetTabletSid: ${sid}`);
  //   setTabletSid(sid);
  // }, [setTabletSid]);

  const resetTabletSid = () => {
    window.location.reload();
  };

  return {
    tabletSid,
    resetTabletSid,
    socket,
  };
}

export const SessionProvider = ({children}: {children: ReactNode}) => {
  const value = useSessionContextValue();
  return (
    <SessionContext.Provider key={value.tabletSid} value={value}>
      {children}
    </SessionContext.Provider>
  );
};
