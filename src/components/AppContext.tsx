import React, {ReactNode, useState, useContext, useCallback, useEffect, useRef} from 'react';
import PullToRefresh from 'pulltorefreshjs';
import {AvailableTutorial} from '../pages/home';
import {useSessionContext} from './SessionContext';
import {lokiSettings} from '../lib/LokiSettings';

export type AppContextState = ReturnType<typeof useAppContextValue>;

export const AppContext = React.createContext(null as any as AppContextState);

export function useAppContext() {
  return useContext(AppContext);
}

export type TabletStage = {
  home?: any;
  steps?: any;
};

function useAppContextValue() {
  const [navIsHidden, setNavIsHidden] = useState(false);
  const [tabletStage, setTabletStage] = useState({home: true} as TabletStage);
  const [selectedTutorial, setSelectedTutorial] = useState(undefined as AvailableTutorial | undefined);
  const {tabletSid, resetTabletSid, socket} = useSessionContext();
  const [timerModalActive, setTimerModalActive] = useState(false);
  const [legalAccepted, setLegalAccepted] = useState(false);
  const showTimerModal = useCallback(() => {
    console.info('showTimerModal');
    setTimerModalActive(true);
  }, [setTimerModalActive]);
  const hideTimerModal = useCallback(() => {
    console.info('hideTimerModal');
    setTimerModalActive(false);
  }, [setTimerModalActive]);

  useEffect(() => {
    PullToRefresh.init({
      mainElement: 'body',
      onRefresh() {
        window.location.reload();
      },
    });
    return () => {
      PullToRefresh.destroyAll();
    };
  }, []);

  const resetCounter = useRef(0);

  const resetTrigger = useCallback(() => {
    resetCounter.current += 1;
    if (resetCounter.current > 6) {
      // reset
      lokiSettings.clear();
      resetTabletSid();
    }
    setTimeout(() => {
      resetCounter.current = 0;
    }, 3000);
  }, [resetCounter]);

  return {
    selectedTutorial,
    setSelectedTutorial,
    navIsHidden,
    setNavIsHidden,
    socket,
    tabletSid,
    resetTabletSid,
    timerModalActive,
    showTimerModal,
    hideTimerModal,
    tabletStage,
    setTabletStage,
    legalAccepted,
    setLegalAccepted,
    resetTrigger,
  };
}

export const AppProvider = ({children}: {children: ReactNode}) => {
  const value = useAppContextValue();
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
