import { action, computed, flow, makeObservable, observable } from 'mobx';
import { AsyncCallback, LoadStatus } from './asyncUtils.model';

const initialLoadStatus: LoadStatus = {
  isLoading: false,
  isError: false,
  isIdle: true,
};

export class MobxAsyncStore<Args extends unknown[], Res> {
  private loadStatus: LoadStatus = initialLoadStatus;

  public data: Res | null = null;

  protected readonly callback: AsyncCallback<Args, Res>;

  constructor() {
    makeObservable<
      this,
      | 'loadStatus'
      | 'data'
      | 'isLoading'
      | 'isError'
      | 'isIdle'
      | 'getData'
      | 'updateLocally'
      | 'updateDataBy'
    >(this, {
      loadStatus: observable,
      data: observable,
      isLoading: computed,
      isIdle: computed,
      isError: computed,
      getData: flow.bound,
      updateLocally: action.bound,
      updateDataBy: flow.bound,
    });
  }

  *getData(...args: Args) {
    this.loadStatus = {
      isLoading: true,
      isIdle: false,
      isError: false,
    };

    let result: Res;
    try {
      result = yield this.callback(...args);
    } catch (exception) {
      this.data = null;

      this.loadStatus = {
        isLoading: false,
        isError: true,
        isIdle: false,
      };

      throw exception;
    }

    this.data = result;

    this.loadStatus = {
      isLoading: false,
      isError: false,
      isIdle: false,
    };

    return result;
  }

  *updateDataBy(updateFn: () => Promise<Res>) {
    this.loadStatus = {
      isLoading: true,
      isIdle: false,
      isError: false,
    };

    let result: Res;
    try {
      result = yield updateFn();
    } catch (exception) {
      this.data = null;

      this.loadStatus = {
        isLoading: false,
        isError: true,
        isIdle: false,
      };

      throw exception;
    }

    this.data = result;

    this.loadStatus = {
      isLoading: false,
      isError: false,
      isIdle: false,
    };

    return result;
  }

  updateLocally(data: Res) {
    this.data = data;
  }

  get isLoading() {
    return this.loadStatus.isLoading;
  }

  get isIdle() {
    return this.loadStatus.isIdle;
  }

  get isError() {
    return this.loadStatus.isError;
  }
}
