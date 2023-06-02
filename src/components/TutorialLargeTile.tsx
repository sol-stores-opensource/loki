import React, {useRef, useState} from 'react';
import s from '../styles/large_tile.module.scss';
import {AvailableTutorial} from '../pages/home';
import {classNames} from '../utils';
import ReactPlayer from 'react-player';
import {useAppContext} from './AppContext';
import {TutorialSharedDetails} from './TutorialSharedDetails';
import {Channel} from 'phoenix';

export const TutorialLargeTile = ({
  t,
  handleLegalModal,
  resetTrigger,
  handleSelect,
  channel,
}: {
  t: AvailableTutorial;
  handleLegalModal: Function;
  handleSelect: Function;
  resetTrigger: () => void;
  channel: Channel;
}) => {
  const {setLegalAccepted} = useAppContext();
  const [playing, setPlaying] = useState(true);
  const playerRef = useRef(null as null | ReactPlayer);
  const outerRef = useRef(null as null | HTMLDivElement);
  const getPlayer = () => {
    return playerRef.current?.getInternalPlayer();
  };
  const [muted, setMuted] = useState(true);
  const [loop, setLoop] = useState(true);
  const LOOP_LENGTH = 10;
  const [expanded, setExpanded] = useState(false);

  const handleProgress = () => {
    if (getPlayer() && playerRef.current) {
      if (getPlayer()!.currentTime >= LOOP_LENGTH && loop) {
        playerRef.current.seekTo(0);
      }
    }
  };

  const handleCloseOutside = (event) => {
    if (outerRef.current && !outerRef.current.contains(event.target)) {
      event.stopPropagation();
      setExpanded(false);
    }
  };

  const legalCallback = () => {
    if (loop) {
      playerRef!.current!.seekTo(0);
      setPlaying(true);
    }
  };

  const handleUnmute = (tutorialId, videoURL) => (e) => {
    if (loop) {
      setLoop(false);
      setPlaying(false);
    }

    const payload = {event: 'view_video', tutorial_store_id: tutorialId, video_url: videoURL};

    console.info('collect', payload);
    channel.push('collect', payload, 10000);

    setMuted(false);
    handleLegalModal('clicked unmute', legalCallback)(e);
  };

  const handleMute = (e) => {
    e.stopPropagation();
    setMuted(true);
  };

  const handlePause = (e) => {
    setPlaying(!playing);
  };

  const handleEnded = () => {
    setLoop(true);
    setPlaying(true);
    setMuted(true);

    setTimeout(() => {
      setLegalAccepted(false);
    }, 30000);
  };

  return (
    <div className={s.video_outer} onClick={handleCloseOutside}>
      {!t.hero_video_playback_url && t.hero_image && (
        <div
          className={s.image}
          style={{
            background: `url(${t.hero_image})`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            height: '676px',
          }}
        >
          <div onClick={resetTrigger} className={s.logo}>
            <img className={s.top_logo} src={t.logo} />
          </div>
        </div>
      )}
      {t.hero_video_playback_url && t.hero_video_thumbnail_url && (
        <div style={{position: 'relative'}} onClick={handlePause}>
          {t.hero_video_playback_url && (
            <ReactPlayer
              ref={playerRef}
              width="100vw"
              height="676px"
              url={t.hero_video_playback_url}
              muted={muted}
              controls={false}
              playing={playing}
              className={s.full_screen_video}
              onPause={() => setPlaying(false)}
              onProgress={handleProgress}
              onEnded={handleEnded}
            />
          )}
          <div onClick={resetTrigger} className={s.logo}>
            <img className={s.top_logo} src={t.logo} />
          </div>
          <button
            className={classNames(s.mute, !muted && s.not_muted)}
            onClick={!muted ? handleMute : handleUnmute(t.tutorial_store_id, t.hero_video_playback_url)}
          >
            <span className={s.mute_icon} />
            {!muted ? '' : 'Unmute'}
          </button>
        </div>
      )}

      <TutorialSharedDetails
        t={t}
        setExpanded={setExpanded}
        expanded={expanded}
        handleLegalModal={handleLegalModal}
        handleSelect={handleSelect}
        outerRef={outerRef}
      />
    </div>
  );
};
