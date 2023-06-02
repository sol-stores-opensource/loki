import {useEffect} from 'react';
import {db} from '../db';

const KEEP_LOGS = 1000;

let initialized = false;

export function usePersistedConsole() {
  useEffect(() => {
    if (initialized) {
      return;
    }

    initialized = true;

    const w: any = window;

    const originalConsoleLog = w.console.log;
    const originalConsoleError = w.console.error;
    const originalConsoleWarn = w.console.warn;
    const originalConsoleInfo = w.console.info;
    const originalConsoleDebug = w.console.debug;

    const persist = (level: string, ...args: any[]) => {
      const ts = Date.now();
      let message = JSON.stringify(args);
      // truncate long messages
      message = message.length > 1024 ? JSON.stringify([message.substring(0, 1024)]) : message;
      db.logs.add({ts, level, message});
    };

    w.console.log = (...args: any[]) => {
      originalConsoleLog(...args);
      persist('log', ...args);
    };
    w.console.error = (...args: any[]) => {
      originalConsoleError(...args);
      persist('error', ...args);
    };
    w.console.warn = (...args: any[]) => {
      originalConsoleWarn(...args);
      persist('warn', ...args);
    };
    w.console.info = (...args: any[]) => {
      originalConsoleInfo(...args);
      persist('info', ...args);
    };
    w.console.debug = (...args: any[]) => {
      originalConsoleDebug(...args);
      persist('debug', ...args);
    };

    w.originalConsoleLog = originalConsoleLog;
    w.originalConsoleError = originalConsoleError;
    w.originalConsoleWarn = originalConsoleWarn;
    w.originalConsoleInfo = originalConsoleInfo;
    w.originalConsoleDebug = originalConsoleDebug;

    w.retrieveLogs = async (limit: number) => {
      return await db.logs.reverse().limit(limit).toArray();
    };

    // truncate logs table
    w.truncateLogs = async () => {
      return await db.logs.reverse().offset(KEEP_LOGS).delete();
    };

    w.clearLogs = async () => {
      return await db.logs.offset(0).delete();
    };

    // truncate the logs table on startup
    w.truncateLogs();

    persist('warn', 'BOOT');
  }, []);
}
