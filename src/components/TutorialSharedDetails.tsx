import {motion} from 'framer-motion';
import React, {useEffect, useRef, useState} from 'react';
import {AvailableTutorial} from '../pages/home';
import s from '../styles/large_tile.module.scss';
import {classNames} from '../utils';

export const TutorialSharedDetails = ({
  t,
  handleLegalModal,
  handleSelect,
  setExpanded,
  expanded,
  outerRef,
  viewportPadding,
  galleryVersion,
}: {
  t: AvailableTutorial;
  handleLegalModal: Function;
  handleSelect: Function;
  setExpanded: Function;
  expanded: boolean;
  outerRef: any;
  viewportPadding?: number;
  galleryVersion?: boolean;
}) => {
  const rewardRef = useRef(null as null | HTMLDivElement);
  const hiddenRef = useRef(null as null | HTMLDivElement);

  const [containerOffset, setContainerOffset] = useState(0);
  const [hiddenHeight, setHiddenHeight] = useState(0);
  const [galleryFocus, setGalleryFocus] = useState('copy');
  const viewportHeight =
    (visualViewport && (viewportPadding ? visualViewport.height - viewportPadding : visualViewport.height)) || 0;

  useEffect(() => {
    if (rewardRef.current && hiddenRef.current) {
      setContainerOffset(
        viewportHeight - (rewardRef.current.getBoundingClientRect().height + rewardRef.current.offsetTop)
      );
    }
  }, [rewardRef.current, hiddenRef.current]);

  const handleExpand = (e) => {
    if (hiddenRef.current) {
      setHiddenHeight(hiddenRef.current.getBoundingClientRect().height);
    }
    e.stopPropagation();
    requestAnimationFrame(() => {
      setExpanded(true);
    });
  };

  const handleExpandGallery = (type: string) => (e) => {
    setGalleryFocus(type);

    window.setTimeout(() => {
      if (hiddenRef.current) {
        setHiddenHeight(hiddenRef.current.getBoundingClientRect().height);
      }
      e.stopPropagation();

      requestAnimationFrame(() => {
        setExpanded(true);
      });
    }, 0);
  };

  const handleClose = () => {
    setExpanded(false);
  };

  const variants = {
    hidden: {y: 0},
    expanded: {y: -(hiddenHeight - 20)},
  };

  return (
    <>
      <motion.div
        variants={variants}
        className={s.details}
        initial={'hidden'}
        animate={expanded ? 'expanded' : 'hidden'}
        // animate={'hidden'}
        transition={{duration: 0.5, type: 'spring', damping: 13, mass: 0.75, stiffness: 100}}
        // transition={{duration: 0.5}}
        style={{'--height': containerOffset} as React.CSSProperties}
        ref={outerRef}
      >
        <button
          onClick={handleLegalModal('clicked start', handleSelect(t.id))}
          className={classNames(s.button, s.tutorial_start)}
        >
          {t.misc.BUTTON_TEXT || 'Start Tutorial'}
          <span className={s.time}>
            <span className={s.icon} />
            <span>{t.time}</span>
          </span>
        </button>

        <div ref={rewardRef} className={s.copy_block}>
          <h2 className={s.p_title}>{t.name}</h2>
          <div className={s.reward_container}>
            <p onClick={galleryVersion ? handleExpandGallery('copy') : handleExpand}>Learn More</p>
            {t.on_complete_nft && (
              <p onClick={galleryVersion ? handleExpandGallery('nft') : handleExpand} className={s.reward}>
                <span className={s.icon} />
                <span>Preview Reward</span>
              </p>
            )}
          </div>
        </div>

        {galleryVersion ? (
          <div ref={hiddenRef} className={classNames(s.hidden_details, s.gallery_version)}>
            <div className={s.rewards_block}>
              <p className={classNames(s.p_body, s[`${galleryFocus}_active`])}>{t.description}</p>

              {t.reward && t.on_complete_nft && t.on_complete_nft.image && (
                <div className={classNames(s.nft_inner, s[`${galleryFocus}_active`])}>
                  {t.on_complete_nft && (
                    <div
                      style={
                        {
                          '--image': `url(${process.env.REACT_APP_NFT_REPLACEMENT || t.on_complete_nft.image})`,
                        } as React.CSSProperties
                      }
                      className={s.nft_image}
                    />
                  )}
                  <div className={s.nft_copy_container}>
                    {t.reward && (
                      <p>Earn this {t.reward ? t.reward : 'unique NFT badge'} for completing the tutorial</p>
                    )}

                    <div className={s.usdc_border_wrap}>
                      <p className={s.usdc_outer}>
                        Complete {t.store?.misc['tuts_needed']} partner tutorials and earn {t.store?.misc['usdc_value']}{' '}
                        USDC. To redeem, show a Solana Ambassador {t.store?.misc['tuts_needed']} Solana Spaces
                        Partner&nbsp;NFTs.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {t.reward && t.on_complete_nft && t.on_complete_nft.image && (
              <div className={s.dots}>
                <span onClick={handleExpandGallery('copy')} className={galleryFocus === 'copy' ? s.active : ''} />
                <span onClick={handleExpandGallery('nft')} className={galleryFocus === 'nft' ? s.active : ''} />
              </div>
            )}
            <div onClick={handleClose} className={s.close_button}>
              Close
            </div>
          </div>
        ) : (
          <div ref={hiddenRef} className={s.hidden_details}>
            <div className={s.rewards_block}>
              <p className={s.p_body}>{t.description}</p>
              <div className={s.nft_spacer} />
              <div className={s.nft_inner}>
                {t.on_complete_nft && (
                  <div
                    style={
                      {
                        '--image': `url(${process.env.REACT_APP_NFT_REPLACEMENT || t.on_complete_nft.image})`,
                      } as React.CSSProperties
                    }
                    className={s.nft_image}
                  />
                )}
                <div className={s.nft_copy_container}>
                  {t.reward && <p>Earn this {t.reward ? t.reward : 'unique NFT badge'} for completing the tutorial</p>}

                  <div className={s.usdc_border_wrap}>
                    <p className={s.usdc_outer}>
                      Complete {t.store?.misc['tuts_needed']} partner tutorials and earn {t.store?.misc['usdc_value']}{' '}
                      USDC. To redeem, show a Solana Ambassador {t.store?.misc['tuts_needed']} Solana Spaces Partner
                      NFTs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div onClick={handleClose} className={s.close_button}>
              Close
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
};
