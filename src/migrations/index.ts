import * as migration_20260928_110000_initial from './20260928_110000_initial';

export const migrations = [
  {
    up: migration_20260928_110000_initial.up,
    down: migration_20260928_110000_initial.down,
    name: '20260928_110000_initial'
  },
];
