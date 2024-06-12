export interface LoadStatus {
  isIdle: boolean;
  isLoading: boolean;
  isError: boolean;
}

export type AsyncCallback<Arg extends unknown[], Res> = (...args: Arg) => Promise<Res>;
