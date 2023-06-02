import React, {useState} from 'react';
import s from '../styles/home.module.scss';
import {motion, AnimatePresence} from 'framer-motion';
import {AvailableTutorial} from '../pages/home';
import {classNames} from '../utils';

export const TutorialTile = ({
  t,
  handleVideoClick,
  handleLegalModal,
  resetTrigger,
  handleSelect,
}: {
  t: AvailableTutorial;
  handleVideoClick: Function;
  handleLegalModal: Function;
  handleSelect: Function;
  resetTrigger: () => void;
}) => {
  const [displayNFT, setDisplayNFT] = useState('');

  return (
    <>
      <div className={s.tutorial_outer} key={t.id}>
        <div className={s.tutorial_container} key={`${t.url}__${t.name}`}>
          {!t.hero_video_playback_url && t.hero_image && (
            <div
              className={s.image}
              style={{
                background: `url(${t.hero_image})`,
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
              }}
            />
          )}
          {t.hero_video_playback_url && t.hero_video_thumbnail_url && (
            <div
              onClick={handleLegalModal('clicked video', handleVideoClick(t.id, t.hero_video_playback_url))}
              className={s.image}
              style={{
                background: `url(${t.hero_video_thumbnail_url})`,
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
              }}
            >
              <div className={s.play}>
                <span className={s.play_icon} />
                <span>Watch Teaser</span>
              </div>
            </div>
          )}
          <div onClick={resetTrigger} className={s.logo}>
            <img className={s.top_logo} src={t.logo} />
          </div>

          <div className={s.copy_block}>
            <h2 className={s.p_title}>{t.name}</h2>
            <div className={s.reward_container}>
              <p className={s.time}>
                <span className={s.icon} />
                <span>{t.time}</span>
              </p>
              {t.on_complete_nft && (
                <p className={s.reward} onClick={() => setDisplayNFT(t.id)}>
                  <span className={s.icon} />
                  <span>Preview Reward</span>
                </p>
              )}
            </div>
            <p className={s.p_body}>{t.description}</p>
            <div className={s.fade} />
            <button
              onClick={handleLegalModal('clicked start', handleSelect(t.id))}
              className={classNames(s.button, s.tutorial_start)}
            >
              {t.misc.BUTTON_TEXT || 'Start Tutorial'}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {displayNFT === t.id && t.on_complete_nft && (
            <motion.div
              className={s.nft_overlay}
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              onClick={() => setDisplayNFT('')}
            >
              <motion.div
                transition={{delay: 0.5, type: 'spring', damping: 10}}
                initial={{scale: 0}}
                animate={{scale: 1}}
                exit={{scale: 0}}
                className={s.nft_inner}
              >
                <div className={s.nft_image}>
                  <img src={t.on_complete_nft.image} />
                </div>
                <p>
                  Earn this {t.reward ? t.reward : 'unique NFT badge'} for
                  <br />
                  completing the tutorial
                </p>
                <div className={s.usdc_outer}>
                  <p>
                    Complete 4 partner tutorials and earn 10 USDC. To redeem, show a Solana Ambassador 4 Solana Spaces
                    Partner NFTs.
                  </p>
                </div>
                <button className={s.overlay_button}>Close</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
