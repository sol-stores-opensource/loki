import React, {useEffect, useRef, useState} from 'react';
// import {isBrowser} from '..';
import s from '../styles/spaces.module.scss';
import {Channel} from 'phoenix';
import {useAppContext} from '../components/AppContext';
import {useTimer} from '../hooks/useTimer';
import trophy from '../static/images/trophy.png';
import {motion} from 'framer-motion';
import Confetti from 'react-confetti';
import {useOnChannelEvent, useOnChannelJoined} from '../hooks/useChannel';

// tablet

export const Steps = ({channel}: {channel: Channel}) => {
  const [stepData, setStepData] = useState(undefined as any);
  const stepDataRef = useRef(undefined as any);
  const [loading, setLoading] = useState(true);
  const [reward, setReward] = useState(undefined as {amount: string; token: string} | undefined);
  const [complete, setComplete] = useState(undefined as {status: boolean; spaces_nft_reward_count: number} | undefined);
  // const [complete, setComplete] = useState(true);
  const {showTimerModal, resetTabletSid, selectedTutorial} = useAppContext();
  const {stopTimer, resetIdleTimer} = useTimer(showTimerModal, false);
  const SVGtext =
    'M17.521 12.4198L14.6134 15.5374C14.5505 15.6052 14.4743 15.6592 14.3896 15.6962C14.3049 15.7332 14.2135 15.7523 14.1211 15.7524H0.337829C0.272089 15.7524 0.207788 15.7332 0.152797 15.6971C0.0978055 15.6611 0.0545121 15.6098 0.0282174 15.5496C0.00192268 15.4893 -0.00623211 15.4227 0.00475155 15.3579C0.0157352 15.2931 0.0453806 15.2329 0.0900578 15.1847L2.99439 12.067C3.05728 11.9993 3.13345 11.9453 3.21814 11.9083C3.30283 11.8713 3.39424 11.8522 3.48665 11.8521H17.2699C17.3363 11.8507 17.4015 11.869 17.4575 11.9046C17.5135 11.9402 17.5577 11.9916 17.5845 12.0523C17.6114 12.113 17.6196 12.1803 17.6083 12.2457C17.597 12.3111 17.5666 12.3716 17.521 12.4198ZM14.6134 6.1402C14.5502 6.07279 14.474 6.01896 14.3894 5.982C14.3047 5.94504 14.2135 5.92573 14.1211 5.92524H0.337829C0.272089 5.92528 0.207788 5.94449 0.152797 5.98051C0.0978055 6.01653 0.0545121 6.06781 0.0282174 6.12806C0.00192268 6.18831 -0.00623211 6.25492 0.00475155 6.31974C0.0157352 6.38455 0.0453806 6.44476 0.0900578 6.49298L2.99439 9.61227C3.05752 9.67968 3.13374 9.73351 3.21837 9.77047C3.30301 9.80743 3.3943 9.82674 3.48665 9.82722H17.2699C17.3355 9.82687 17.3996 9.80743 17.4544 9.77129C17.5091 9.73514 17.5521 9.68385 17.5782 9.62366C17.6043 9.56347 17.6123 9.49699 17.6013 9.43233C17.5903 9.36766 17.5606 9.30761 17.5161 9.25948L14.6134 6.1402ZM0.337829 3.90041H14.1211C14.2135 3.90031 14.3049 3.88118 14.3896 3.8442C14.4743 3.80721 14.5505 3.75318 14.6134 3.68546L17.521 0.567812C17.5666 0.519656 17.597 0.459074 17.6083 0.393686C17.6196 0.328299 17.6114 0.261028 17.5845 0.20034C17.5577 0.139651 17.5135 0.0882551 17.4575 0.0526198C17.4015 0.0169845 17.3363 -0.0012984 17.2699 7.17392e-05H3.48665C3.39424 0.000169016 3.30283 0.0193057 3.21814 0.0562885C3.13345 0.0932712 3.05728 0.147307 2.99439 0.215025L0.0900578 3.33267C0.0453806 3.3809 0.0157352 3.4411 0.00475155 3.50592C-0.00623211 3.57073 0.00192268 3.63734 0.0282174 3.6976C0.0545121 3.75785 0.0978055 3.80912 0.152797 3.84515C0.207788 3.88117 0.272089 3.90038 0.337829 3.90041V3.90041Z';
  const twoDObj = new Path2D(SVGtext);

  useEffect(() => {
    if (complete && complete.status) {
      resetIdleTimer();
    } else {
      stopTimer();
    }
    return () => {
      stopTimer();
    };
  }, [complete, complete && complete.status]);

  useOnChannelJoined(
    channel,
    () => {
      console.log('tablet_ready', {});
      channel.push('tablet_ready', {}, 10000);
    },
    []
  );

  useOnChannelEvent(
    channel,
    'step',
    (data) => {
      console.log('Got step', data);
      const idx = stepDataRef.current.findIndex((x: any) => x.id === data.step);
      const step = {
        ...stepDataRef.current[idx],
        status: data.status,
      };
      const newStepData = [...stepDataRef.current];
      newStepData[idx] = step;
      setStepData(newStepData);
      stepDataRef.current = newStepData;
    },
    [setStepData]
  );

  useOnChannelEvent(
    channel,
    'reward',
    (data) => {
      console.log('reward', data);
      setReward(data);
    },
    [setReward]
  );

  useOnChannelEvent(
    channel,
    'complete',
    (data) => {
      console.log('complete', data);
      setComplete(data);
    },
    [setComplete]
  );

  useOnChannelEvent(
    channel,
    'steps',
    (data) => {
      console.log('steps', '...');
      setStepData(data.steps);
      stepDataRef.current = data.steps;
      setLoading(false);
    },
    [setStepData, setLoading]
  );

  return (
    <div className={s.container}>
      {complete && complete.status ? (
        <div className={s.done_block}>
          <div className={s.bg1} />
          <div className={s.outer}>
            <h1 className={s.headline}>Congratulations!</h1>
            <h2 className={s.subhead}>You successfully completed the tutorial.</h2>
            <div className={s.partner_block}>
              <img className={s.logo} src={selectedTutorial?.logo} />
              <h3>{selectedTutorial?.name}</h3>
            </div>
            <div className={s.image_container}>
              <motion.img
                className={s.trophy}
                src={trophy}
                animate={{scale: 1}}
                initial={{scale: 0}}
                transition={{delay: 0.2, type: 'spring', damping: 10, duration: 0.6}}
              />
              <Confetti
                height={820}
                width={1180}
                run={true}
                recycle={false}
                colors={['#9945ff', '#14f195', '#eee']}
                style={{inset: '-30px'}}
                numberOfPieces={300}
                drawShape={(ctx) => {
                  ctx.stroke(twoDObj);
                  ctx.closePath();
                }}
              />
            </div>
            <p className={s.description_end}>
              We encourage you to explore additional partner tutorials to unlock more rewards.
            </p>
            <p className={s.description_end}>
              Complete {selectedTutorial?.store?.misc['tuts_needed']} partner tutorials and earn{' '}
              {selectedTutorial?.store?.misc['usdc_value']} USDC. To redeem, show a Solana Ambassador{' '}
              {selectedTutorial?.store?.misc['tuts_needed']} Solana Spaces Partner NFTs. <br />
              {complete.spaces_nft_reward_count > 0 && (
                <span>
                  You currently have{' '}
                  {Math.min(complete.spaces_nft_reward_count, parseInt(selectedTutorial?.store?.misc['tuts_needed']))}{' '}
                  of {selectedTutorial?.store?.misc['tuts_needed']}!
                </span>
              )}
            </p>
            <button onClick={resetTabletSid} className={s.button}>
              Return home
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className={s.intro_container}>
            <h1 className={s.headline}>
              Great! {selectedTutorial?.opens_in === 'phantom' ? 'Phantom wallet was succesfully linked!' : ''}
            </h1>
            <p className={s.description}>Please complete the following steps on your own device.</p>
          </div>
          {loading ? (
            <p className={s.loading}>Loading steps...</p>
          ) : (
            <>
              <div className={s.steps_completed_container}>
                <div>
                  <img className={s.image} src={selectedTutorial?.logo} />
                </div>

                <div className={s.steps_completed_headline}>
                  {selectedTutorial && <h1>{selectedTutorial.name}</h1>}
                  <p className={s.steps_completed}>
                    Steps Completed: {stepData.filter((step) => step.status === 'COMPLETE').length} / {stepData.length}
                  </p>
                </div>
                <div className={s.line_container}>
                  <span className={s.line} />
                  <span
                    className={s.fill_line}
                    style={{
                      width: `${
                        (stepData.filter((step) => step.status === 'COMPLETE').length / stepData.length) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>
              <div className={s.step_container_outer}>
                <ul className={s.step_container}>
                  {stepData.length &&
                    stepData.map((step: any, index: number) => {
                      return (
                        <li key={`${step.id}step`} className={s.step_box}>
                          <div className={step.status === 'COMPLETE' ? s.completed_number : s.big_number}>
                            <span>{index + 1}</span>
                          </div>
                          <div className={s.text_block}>
                            <p className={s.title}>{step.title}</p>
                          </div>
                          <div className={step.status === 'COMPLETE' ? s.completed : s.waiting}>
                            {step.status === 'COMPLETE' ? 'Done' : 'Waiting'}
                          </div>
                        </li>
                      );
                    })}
                </ul>
                <div className={s.fade} />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
