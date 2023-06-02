import React, {useEffect} from 'react';
import {Modal} from './Modal';
import s from '../styles/timer-modal.module.scss';
import {useTimer} from '../hooks/useTimer';
import {useAppContext} from './AppContext';

export const TimerModal = () => {
  const {hideTimerModal, resetTabletSid} = useAppContext();
  const {resetIdleTimer, seconds} = useTimer(resetTabletSid, true);

  useEffect(() => {
    resetIdleTimer();
  }, []);

  return (
    <Modal closeModal={hideTimerModal}>
      <div className={s.timer_modal}>
        <h1 className={s.headline}>Still there?</h1>
        <p>Tablet will reset in {seconds.current} seconds.</p>
        <button
          onClick={() => {
            resetIdleTimer();
            hideTimerModal();
          }}
          className={s.button}
        >
          I'm here!
        </button>
      </div>
    </Modal>
  );
};
