import { MobxAsyncStore } from './MobxAsyncStore';

export const isLoadingOrIdle = <T extends MobxAsyncStore<unknown[], unknown>>(store: T): boolean =>
  store.isLoading || store.isIdle;
