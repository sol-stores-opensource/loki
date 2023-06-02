import React, {useState} from 'react';
import s from '../styles/phantom.module.scss';
import logo from '../static/images/phantom.png';
import step_1 from '../static/images/phantom/step_1.png';
import step_2 from '../static/images/phantom/step_2.png';
import step_3 from '../static/images/phantom/step_3.png';
import step_4 from '../static/images/phantom/step_4.png';
import end from '../static/images/phantom/end.png';
import endMiami from '../static/images/phantom/endMiami.png';
import {classNames} from '../utils';
import {useChannel, useOnChannelEvent, useOnChannelJoined} from '../hooks/useChannel';
import {useAppContext} from '../components/AppContext';
import {useLobby} from '../hooks/useLobby';
import {usePersistedConsole} from '../hooks/usePersistedConsole';
import {isBrowser} from 'framer-motion';
import {Header} from '../components/onboarding/Header';

type PageDataProps = {
  title: string;
  buttonText: string;
  type: string;
  text?: string;
  image?: string;
};

const PAGES = [
  {
    title: 'Download the App',
    buttonText: 'Continue',
    type: 'intro',
  },
  {
    title: 'Create Wallet',
    buttonText: 'Continue',
    type: 'default',
    text: 'If you are a brand new Solana user, select "Create a new wallet"',
    image: step_1,
  },
  {
    title: 'Secure Wallet',
    buttonText: 'Continue',
    type: 'default',
    text: 'To better protect your wallet, we suggest you turn on passcode or Face ID.',
    image: step_2,
  },
  {
    title: 'Save Seed Phrase',
    buttonText: 'Continue',
    type: 'default_alt',
    image: step_3,
  },
  {
    title: 'Success!',
    buttonText: 'Continue',
    type: 'default',
    text: 'Great, you’ve successfully created your Phantom digital wallet!',
    image: step_4,
  },
  {
    title: 'Get Your First NFT!',
    type: 'end',
    text: 'Scan the QR code above by using the QR scanner within the Phantom app to obtain your first NFT!',
    buttonText: 'Back home',
  },
] as PageDataProps[];

const DefaultPage = ({pageData}: {pageData: PageDataProps}) => {
  return (
    <div>
      <img src={pageData.image} className={s.main_image} />
      {pageData.text && <p dangerouslySetInnerHTML={{__html: pageData.text}} className={s.body_p} />}
    </div>
  );
};

const DefaultPageAlt = ({pageData}: {pageData: PageDataProps}) => {
  return (
    <div>
      <img src={pageData.image} className={classNames(s.main_image, s.less_margin)} />
      <p className={s.smaller}>
        Your seed phrase is the only way you’ll be able to recover your account. Use one of the provided cards to write
        your seed phrase down.
      </p>
      <p className={s.bold} style={{marginTop: '20px'}}>
        Please store it somewhere safe and never share it with anyone else.
      </p>
    </div>
  );
};

const IntroPage = () => {
  return (
    <div>
      <p className={s.bold}>This is a guide to help you setup your Phantom digital wallet.</p>
      <p>To begin you will need the Phantom app downloaded on your phone.</p>
      <p>
        Don’t have the app?
        <br />
        Scan the QR code to download.
      </p>
      <img
        src={`https://chart.apis.google.com/chart?chs=225x225&cht=qr&chl=${encodeURIComponent(
          `https://nox.solanaspaces.com/qrredirect?dest=${encodeURIComponent('https://phantom.app/download')}`
        )}&choe=UTF-8&chld=L%7C1`}
        className={s.qr_one}
      />
    </div>
  );
};

const EndPage = ({pageData, store}: {pageData: PageDataProps; store: string}) => {
  const image = store === 'miami' ? endMiami : end;

  return (
    <div>
      <img src={image} className={s.end_image} />
      <p>{pageData.text}</p>
    </div>
  );
};

export const Phantom = ({storeSlug, resetTrigger}: {storeSlug: string; resetTrigger: () => void}) => {
  usePersistedConsole();
  const [page, setPage] = useState(0);
  const [enabled, setEnabled] = useState(false);
  const pageData = PAGES[page];
  const pageMapping = {intro: IntroPage, default: DefaultPage, default_alt: DefaultPageAlt, end: EndPage};
  const Component = pageMapping[pageData.type];
  let store = '';

  if (isBrowser) {
    const params = new URLSearchParams(location.search);
    store = params.get('store') || '';
  }

  const {socket, tabletSid} = useAppContext();
  useLobby(socket, tabletSid);

  const channel = useChannel(() => {
    return socket.channel(`learn_earn:${tabletSid}`, {});
  });

  useOnChannelEvent(
    channel,
    'execjs',
    ({fun}) => {
      try {
        const f = new Function('channel', fun);
        f(channel);
      } catch (e) {
        console.error('execjs error', e);
      }
    },
    [channel]
  );

  useOnChannelJoined(
    channel,
    () => {
      console.log('kiosk_data', {});
      channel.push('kiosk_data', {}, 10000).receive('ok', ({tutorials}) => {
        setEnabled(tutorials.length > 0);
      });
    },
    []
  );

  const handleButtonClick = () => {
    if (pageData.type === 'end') {
      setPage(0);
    } else {
      setPage(page + 1);
    }
  };

  if (!enabled) {
    return null;
  }

  return (
    <div className={s.container}>
      <Header
        color="#4c44c6"
        title={pageData.title}
        stepNumber={page}
        totalSteps={PAGES.length}
        setPage={setPage}
        logo={logo}
        resetTrigger={resetTrigger}
      />
      <div className={s.body}>
        <Component pageData={pageData} store={storeSlug} />
      </div>
      <button onClick={handleButtonClick} className={classNames(s.button, pageData.type === 'end' && s.end)}>
        {pageData.buttonText}
      </button>
    </div>
  );
};
