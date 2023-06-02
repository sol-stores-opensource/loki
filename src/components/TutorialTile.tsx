import React, {useRef, useState} from 'react';
import s from '../styles/tutorial_tile.module.scss';
import {motion, AnimatePresence} from 'framer-motion';
import {AvailableTutorial} from '../pages/home';
import {classNames} from '../utils';
import {TutorialSharedDetails} from './TutorialSharedDetails';

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
  const [expanded, setExpanded] = useState(false);
  const outerRef = useRef(null as null | HTMLDivElement);

  return (
    <>
      <div className={s.tutorial_outer} key={t.id} ref={outerRef}>
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
              onClick={handleLegalModal(
                'clicked video',
                handleVideoClick(t.tutorial_store_id, t.hero_video_playback_url)
              )}
              className={s.image}
              style={{
                background: `url(${t.hero_video_thumbnail_url})`,
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
              }}
            >
              <div className={s.play}>
                <span className={s.play_icon} />
                <span>Play video</span>
              </div>
            </div>
          )}
          <div onClick={resetTrigger} className={s.logo}>
            <img className={s.top_logo} src={t.logo} />
          </div>

          <TutorialSharedDetails
            expanded={expanded}
            setExpanded={setExpanded}
            handleLegalModal={handleLegalModal}
            t={t}
            handleSelect={handleSelect}
            outerRef={outerRef}
            viewportPadding={60}
            galleryVersion={true}
          />
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
                    Complete {t.store?.misc['tuts_needed']} partner tutorials and earn {t.store?.misc['usdc_value']}{' '}
                    USDC. To redeem, show a Solana Ambassador {t.store?.misc['tuts_needed']} Solana Spaces Partner NFTs.
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
