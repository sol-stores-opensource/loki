import Dexie, {Table} from 'dexie';

export interface Log {
  id?: number;
  level: string;
  message: string;
  ts: number;
}

export class AppDexie extends Dexie {
  logs!: Table<Log>;

  constructor() {
    super('logs');
    this.version(2).stores({
      logs: '++id, level, message, ts', // Primary key and indexed props
    });
  }
}

export const db = new AppDexie();
