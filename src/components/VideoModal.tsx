import React, {useRef, useState} from 'react';

import {Modal} from './Modal';
import ReactPlayer from 'react-player';
import s from '../styles/video-modal.module.scss';
import {classNames} from '../utils';
import {motion} from 'framer-motion';

export const VideoModal = ({url, closeModal, onVideoEnd, alignTop}) => {
  const playerRef = useRef(null as null | ReactPlayer);
  const [playing, setPlaying] = useState(undefined as undefined | boolean);
  const [ended, setEnded] = useState(false);
  const getPlayer = () => {
    return playerRef.current?.getInternalPlayer();
  };

  const handleVideoEnd = () => {
    setEnded(true);
    onVideoEnd();
    closeModal();
  };

  const handleReady = () => {
    const player = getPlayer();
    if (!player) return;
    setPlaying(false);
  };

  const handleVideoClick = (e: any) => {
    e.stopPropagation();
    if (ended) return;
    const player = getPlayer();
    if (!player) return;
    if (player.paused) {
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  };

  return (
    <Modal closeModal={closeModal} alignTop={alignTop}>
      <motion.div animate={{scale: 1}} initial={{scale: 0.8}} className={s.player_outer}>
        <div className={s.player_wrapper}>
          <ReactPlayer
            ref={playerRef}
            width="100%"
            height="100%"
            url={url}
            muted={false}
            onEnded={handleVideoEnd}
            controls={true}
            playing={playing}
            className={s.react_player}
            onReady={handleReady}
            onPause={() => setPlaying(false)}
            playIcon={<div onClick={handleVideoClick} className={classNames(s.play_icon, playing && s.playing)} />}
          />
        </div>
      </motion.div>
      <div onClick={closeModal} className={s.close_button}>
        <span className={s.icon} />
        Close
      </div>
    </Modal>
  );
};
