import { MobxAsyncStore } from './MobxAsyncStore';
import { isLoadingOrIdle } from './isLoadingOrIdle';

export const isInitialLoading = <T extends MobxAsyncStore<unknown[], unknown>>(store: T): boolean =>
  isLoadingOrIdle(store) && store.data === null;
