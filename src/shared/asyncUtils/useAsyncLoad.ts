import { useCallback, useEffect, useState } from 'react';
import { AsyncCallback, LoadStatus } from './asyncUtils.model';

interface AsyncLoadHook<Arg extends unknown[], Res> extends LoadStatus {
  call: AsyncCallback<Arg, Res>;
  data: Res | null;
}

interface InitialCallConfiguration<Arg extends unknown[]> {
  initialCallWith: Arg;
}

const initialLoadStatus: LoadStatus = {
  isIdle: true,
  isLoading: false,
  isError: false,
};

export const useAsyncLoad = <Arg extends unknown[], Res>(
  callback: AsyncCallback<Arg, Res>,
  callConfiguration?: InitialCallConfiguration<Arg>,
): AsyncLoadHook<Arg, Res> => {
  const [receivedData, setReceivedData] = useState<Res | null>(null);
  const [loadStatus, setLoadStatus] = useState<LoadStatus>(initialLoadStatus);

  const makeCall = useCallback(
    async (...args: Arg) => {
      setLoadStatus({
        isIdle: false,
        isLoading: true,
        isError: false,
      });

      let result: Res;
      try {
        result = await callback(...args);
      } catch (exception) {
        setReceivedData(null);

        setLoadStatus({
          isIdle: false,
          isLoading: false,
          isError: true,
        });

        throw exception;
      }

      setReceivedData(result);

      setLoadStatus({
        isIdle: false,
        isLoading: false,
        isError: false,
      });

      return result;
    },
    [callback],
  );

  useEffect(() => {
    if (typeof callConfiguration === 'object') {
      makeCall(...callConfiguration.initialCallWith);
    }
  }, [callConfiguration, makeCall]);

  return {
    ...loadStatus,
    data: receivedData,
    call: makeCall,
  };
};
