import {Channel} from 'phoenix';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {useAppContext} from '../components/AppContext';
import s from '../styles/home.module.scss';
import {classNames} from '../utils';
import {useAutoAnimate} from '../lib/auto-animate';
import {VideoModal} from '../components/VideoModal';
import {useTimer} from '../hooks/useTimer';
import {LegalModal} from '../components/LegalModal';
import {useOnChannelEvent, useOnChannelJoined} from '../hooks/useChannel';
import {lokiSettings} from '../lib/LokiSettings';
import {TutorialTile} from '../components/TutorialTile';
import {TutorialLargeTile} from '../components/TutorialLargeTile';
import {Phantom} from './phantom';

export type AvailableTutorial = {
  id: string;
  name: string;
  description: string;
  tutorial_store_id?: string;
  tutorial_stores?: {
    id: string;
    store_id: string;
    store: AvailableStore;
    name: string;
    slug: string;
    on_complete_nft?: {
      id: string;
      image: string;
    };
  }[];
  store?: AvailableStore;
  store_id: string;
  logo: string;
  hero_image: string | null;
  hero_video_playback_url: string | null;
  hero_video_thumbnail_url: string | null;
  url: string;
  time: string;
  reward: string;
  opens_in: string;
  misc: {
    [key: string]: string;
  };
  visible?: boolean;
  on_complete_nft?: {
    id: string;
    image: string;
  };
};

export type AvailableStore = {
  id: string;
  name: string;
  slug: string;
  misc: [k: string];
};

// tablet

const DEST_BASE_URL = process.env.REACT_APP_DEST_BASE_URL || '';

const QrConnect = ({channel, selectedTutorial}: {channel: Channel; selectedTutorial: AvailableTutorial}) => {
  const {tabletSid, setTabletStage, resetTabletSid} = useAppContext();
  const connectUrl = `${process.env.REACT_APP_DEST_BASE_URL}/connect?sid=${tabletSid}`;
  const openUrl =
    selectedTutorial.opens_in === 'phantom'
      ? `https://phantom.app/ul/browse/${encodeURIComponent(connectUrl)}?ref=${encodeURIComponent(DEST_BASE_URL)}`
      : connectUrl;

  useEffect(() => {
    console.log('connectUrl', connectUrl);
    console.log('openUrl', openUrl);
  }, [connectUrl, openUrl]);

  useOnChannelJoined(
    channel,
    () => {
      if (!selectedTutorial) {
        return;
      }
      console.info('selected_tutorial', selectedTutorial);
      channel.push('selected_tutorial', selectedTutorial, 10000);
    },
    [selectedTutorial]
  );

  useOnChannelEvent(
    channel,
    'start_tablet',
    (data) => {
      console.log('got start', data);

      // data appears unused by steps, but check
      console.info(`set steps`);
      setTabletStage({steps: data});
    },
    [setTabletStage]
  );

  useOnChannelEvent(
    channel,
    'complete',
    (data) => {
      console.log('complete', data);
      resetTabletSid();
    },
    [resetTabletSid]
  );

  return (
    <div className={s.qr_container}>
      <img
        src={`https://chart.apis.google.com/chart?chs=240x240&cht=qr&chl=${encodeURIComponent(
          openUrl
        )}&choe=UTF-8&chld=L%7C1`}
        className={s.qr_code}
      />
    </div>
  );
};

export const Listings = ({
  channel,
  tutorials,
  resetTrigger,
}: {
  channel: Channel;
  tutorials: AvailableTutorial[];
  resetTrigger: () => void;
}) => {
  const {selectedTutorial, setSelectedTutorial, showTimerModal, legalAccepted} = useAppContext();
  const {stopTimer, resetIdleTimer} = useTimer(showTimerModal, false);
  const [videoURL, setVideoURL] = useState(undefined as undefined | string);
  const [legalCallback, setLegalCallback] = useState(undefined as undefined | {callback: () => void});
  const handleSelect = (id: string) => () => {
    const currTutorial = tutorials.find((t) => {
      return t.id === id;
    });

    setSelectedTutorial(currTutorial);
  };

  const handleLegalModal = (info: string, callback: any) => (e) => {
    e.stopPropagation();

    if (legalAccepted) {
      console.info(`execute legal callback ${info}`);
      callback();
    } else {
      console.info(`delay legal callback ${info}`);
      setLegalCallback({
        callback: () => {
          console.info(`execute legal callback ${info}`);
          callback();
        },
      });
    }
  };

  const closeLegal = () => {
    setLegalCallback(undefined);
  };

  const closeModal = () => {
    setVideoURL(undefined);
  };

  const handleVideoClick = (tutorialStoreId: string, videoURL: string) => () => {
    const payload = {event: 'view_video', tutorial_store_id: tutorialStoreId, video_url: videoURL};

    console.info('collect', payload);
    channel.push('collect', payload, 10000);

    setVideoURL(videoURL);
    stopTimer();
  };

  useEffect(() => {
    if (selectedTutorial) {
      resetIdleTimer();
    } else {
      stopTimer();
    }
    return () => {
      stopTimer();
    };
  }, [selectedTutorial]);

  return (
    <>
      {!selectedTutorial ? (
        <>
          {tutorials.length > 1 ? (
            <div className={s.container_home}>
              <div className={s.tutorial_list}>
                {tutorials.map((t) => (
                  <TutorialTile
                    key={t.id}
                    t={t}
                    handleVideoClick={handleVideoClick}
                    handleLegalModal={handleLegalModal}
                    resetTrigger={resetTrigger}
                    handleSelect={handleSelect}
                  />
                ))}
              </div>
            </div>
          ) : (
            <TutorialLargeTile
              t={tutorials[0]}
              handleLegalModal={handleLegalModal}
              resetTrigger={resetTrigger}
              handleSelect={handleSelect}
              channel={channel}
            />
          )}
          {videoURL ? (
            <VideoModal alignTop={true} onVideoEnd={resetIdleTimer} url={videoURL} closeModal={closeModal} />
          ) : null}
          {legalCallback ? <LegalModal callback={legalCallback} closeModal={closeLegal} channel={channel} /> : null}
        </>
      ) : (
        <div className={s.container}>
          <div className={s.wallet_container}>
            <QrConnect channel={channel} selectedTutorial={selectedTutorial} />
            <h1 className={s.qr_headline}>Begin the tutorial.</h1>
            {selectedTutorial.opens_in === 'phantom' && (
              <>
                <p className={s.qr_description}>
                  If you already have a Phantom wallet, scan the QR code above to get started on the demo.
                </p>
                <div className={s.no_wallet}>
                  <h1 className={s.small_headline}>Don't have a Phantom wallet?</h1>
                  <p className={s.assoc_help}>See a Solana Ambassador to assist you with your wallet onboarding.</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

function AvailableTutorials({
  availableTutorials,
  confirmTutorials,
  confirmOnboarding,
  storeSlug,
}: React.PropsWithChildren<{
  availableTutorials: AvailableTutorial[];
  confirmTutorials: (tutorials: AvailableTutorial[]) => void;
  confirmOnboarding: (onboarding: string) => void;
  storeSlug: string;
}>) {
  const [list, setList] = useState({tick: 0, items: availableTutorials});
  const [selectedOnboarding, setSelectedOnboarding] = useState('');
  const [parent] = useAutoAnimate(/* optional config */);

  const moveUpFn = useCallback(
    (id: string, i: number) => {
      return () => {
        const arr = [...list.items];
        const tmp = arr[i - 1];
        arr[i - 1] = arr[i];
        arr[i] = tmp;
        setList({tick: list.tick + 1, items: arr});
      };
    },
    [list, setList]
  );

  const moveDownFn = useCallback(
    (id: string, i: number) => {
      return () => {
        const arr = [...list.items];
        const tmp = arr[i + 1];
        arr[i + 1] = arr[i];
        arr[i] = tmp;
        setList({tick: list.tick + 1, items: arr});
      };
    },
    [list, setList]
  );

  const toggleFn = useCallback(
    (i: number) => {
      return () => {
        const arr = [...list.items];
        arr[i] = {...arr[i], visible: !arr[i].visible};
        setList({tick: list.tick + 1, items: arr});
      };
    },
    [list, setList]
  );

  const selectedCount = list.items.filter((x) => x.visible).length;

  const handleOnboarding = (onboarding: string) => () => {
    if (onboarding === selectedOnboarding) {
      setSelectedOnboarding('');
      return;
    }
    setSelectedOnboarding(onboarding);
  };

  return (
    <div className={s.available_container}>
      <div className={s.onboardings}>
        <h2 className={s.headline}>Available Onboardings</h2>
        <div
          onClick={handleOnboarding('phantom')}
          className={classNames(s.tutorial_block, selectedOnboarding === 'phantom' && s.onboarding_selected)}
        >
          <div className={s.title}>Phantom</div>
        </div>
        <div>
          <button
            className={s.confirm}
            disabled={!selectedOnboarding}
            type="button"
            onClick={() => confirmOnboarding(selectedOnboarding)}
          >
            Confirm
          </button>
        </div>
      </div>

      <div className={selectedOnboarding && s.disabled}>
        <div className={s.headline}>Available Tutorials</div>
        <div ref={parent as any}>
          {list.items.map((t, i: number) => (
            <div className={s.tutorial_block} key={t.id}>
              <div className={s.title}>{t.name}</div>
              <div className={s.controls}>
                <div className={s.move_buttons}>
                  {i > 0 ? <button className={s.up} type="button" onClick={moveUpFn(t.id, i)} /> : null}
                  {list.items && i < list.items.length - 1 ? (
                    <button className={s.down} type="button" onClick={moveDownFn(t.id, i)} />
                  ) : null}
                </div>
                <button className={classNames(s.on_button, !t.visible && s.off)} type="button" onClick={toggleFn(i)}>
                  {t.visible ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <button
          className={s.confirm}
          type="button"
          disabled={selectedCount === 0 || selectedCount > 2}
          onClick={() => confirmTutorials(list.items.filter((x) => x.visible))}
        >
          Confirm
        </button>
      </div>
      {selectedCount > 2 && <div className={s.error}>2 Partners Maximum</div>}
    </div>
  );
}

function AvailableStores({
  availableStores,
  confirmStore,
}: React.PropsWithChildren<{
  availableStores: AvailableStore[];
  confirmStore: (store: AvailableStore) => void;
}>) {
  return (
    <div className={s.available_container}>
      <div className={s.headline}>Available Stores</div>
      {availableStores.map((t, i: number) => (
        <div className={s.tutorial_block} key={t.id}>
          <div className={s.title}>{t.name}</div>
          <div className={s.controls}>
            <button className={classNames(s.on_button)} type="button" onClick={() => confirmStore(t)}>
              SELECT
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

type KioskDataPayload = {
  stores: AvailableStore[];
  tutorials: AvailableTutorial[];
};

export const Home = ({channel}: {channel: Channel}) => {
  const {resetTrigger, resetTabletSid} = useAppContext();
  const [listings, setListings] = useState([] as AvailableTutorial[]);
  const [storeId, setStoreId] = useState('');
  const [storeSlug, setStoreSlug] = useState('');
  const [onboardingSlug, setOnboardingSlug] = useState('');
  const [name, setName] = useState('');
  const [step, setStep] = useState(0);
  const [state, setState] = useState({
    tick: 0,
    tutorials: [] as AvailableTutorial[],
    stores: [] as AvailableStore[],
    name: '',
    storeId: '',
  });

  const fetchState = () => {
    const settings = lokiSettings.result();
    channel
      .push('kiosk_data', {}, 10000)
      .receive('ok', ({tutorials, stores}: KioskDataPayload) => {
        const newState = {tick: state.tick + 1, tutorials, stores, name: settings.name, storeId: settings.storeId};

        console.log(newState, 'newState');
        if (newState.name && newState.storeId && settings.tutorialIds.length > 0) {
          console.log('first if');
          const tuts = settings.tutorialIds
            .map((id) => newState.tutorials.find((x) => x.id === id)!)
            .filter((x) => x)
            .map((x) => {
              const ts = x.tutorial_stores!.find((ts) => ts.store.id === settings.storeId)!;
              const res: AvailableTutorial = {
                ...x,
                tutorial_store_id: ts.id,
                on_complete_nft: ts.on_complete_nft,
                store: ts.store,
              };
              delete res.tutorial_stores;
              return res;
            });
          if (tuts.length > 0) {
            setListings(tuts);
            return;
          }
        }
        if (newState.name && newState.storeId && settings.onboardingSlug) {
          console.log('2nd if', stores, settings);
          const store = stores.find((x) => x.id === newState.storeId);

          if (store) {
            console.log('inside store if');
            setOnboardingSlug(settings.onboardingSlug);
            setStoreSlug(store.slug);
            return;
          }
        }

        console.log('last');
        setState(newState);
        setName(newState.name);
        setStep(1);
      })
      .receive('error', (resp) => {
        setTimeout(fetchState, 1000);
      });
  };

  useEffect(() => {
    fetchState();
  }, []);

  const confirmStore = (store: AvailableStore) => {
    setStoreId(store.id);
    setStoreSlug(store.slug);
    setStep(3);
  };

  const confirmOnboarding = (onboarding: string) => {
    lokiSettings.setTutorialIds([]);
    lokiSettings.setStoreId(storeId);
    lokiSettings.setName(name);
    lokiSettings.setOnboardingSlug(onboarding);
    resetTabletSid();
  };

  const confirmTutorials = (tutorials: AvailableTutorial[]) => {
    const tutorialIds = tutorials.map((x) => x.id);
    lokiSettings.setTutorialIds(tutorialIds);
    lokiSettings.setStoreId(storeId);
    lokiSettings.setName(name);
    lokiSettings.setOnboardingSlug('');
    resetTabletSid();
  };

  if (onboardingSlug === 'phantom' && storeSlug) {
    return <Phantom storeSlug={storeSlug} resetTrigger={resetTrigger} />;
  }

  if (listings && listings.length > 0) {
    return <Listings channel={channel} tutorials={listings} resetTrigger={resetTrigger} />;
  }

  if (step === 1) {
    return (
      <div className={s.available_container}>
        <div className={s.kiosker_div}>
          <CopyToClipboard
            text={'https://nox.solanaspaces.com/api/loki/kiosker.settings'}
            onCopy={() =>
              alert(
                'Copied!  Open Safari and Paste to download Kiosker Settings.  Then find the downloaded file and open it.  Kiosker will prompt to import the settings.'
              )
            }
          >
            <button className={s.update_kiosker_button}>Update Kiosker Settings</button>
          </CopyToClipboard>
        </div>

        <div>
          <input
            type="text"
            placeholder="Enter tablet name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={s.name_input}
          />
        </div>
        <div>
          <button className={s.confirm} type="button" disabled={!name} onClick={() => setStep(2)}>
            Confirm Name
          </button>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return <AvailableStores availableStores={state.stores} confirmStore={confirmStore} />;
  }

  if (step === 3) {
    const availableTutorials = state.tutorials.filter((x) => x.tutorial_stores!.find((ts) => ts.store.id === storeId));
    return (
      <AvailableTutorials
        confirmOnboarding={confirmOnboarding}
        availableTutorials={availableTutorials}
        confirmTutorials={confirmTutorials}
        storeSlug={storeSlug}
      />
    );
  }

  return null;
};
