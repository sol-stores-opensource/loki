import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {SessionProvider} from './components/SessionContext';
import {AppProvider} from './components/AppContext';
import {Tablet} from './components/Tablet';
import './global-fonts.scss';
import './global-reset.scss';
import './global-base.scss';
import {Device} from './components/Device';
import {Phantom} from './pages/phantom';
import s from './styles/layout.module.scss';

export function App() {
  return (
    <BrowserRouter>
      <SessionProvider>
        <AppProvider>
          <main className={s.main}>
            <Routes>
              <Route path="/phantom" element={<Phantom />} />
              <Route path="/connect" element={<Device />} />
              <Route path="*" element={<Tablet />} />
            </Routes>
          </main>
        </AppProvider>
      </SessionProvider>
    </BrowserRouter>
  );
}
