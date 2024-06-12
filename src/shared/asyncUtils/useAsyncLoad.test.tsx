import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { act, renderHook, waitFor } from '@testing-library/react';
import { useAsyncLoad } from './useAsyncLoad';

const mockAsyncCallback = jest.fn((toResolve: boolean) => {
  if (toResolve) {
    return Promise.resolve();
  }
  return Promise.reject();
});

const CALLED_ONCE = 1;

describe('useAsyncLoad Util Test', () => {
  beforeEach(() => {
    mockAsyncCallback.mockClear();
  });

  it('useAsyncLoad - Hook should initially call callback when corresponding config provided', async () => {
    renderHook(() =>
      useAsyncLoad(mockAsyncCallback, {
        initialCallWith: [true],
      }),
    );

    await waitFor(() => {
      expect(mockAsyncCallback).toBeCalledTimes(CALLED_ONCE);
    });
  });

  it('useAsyncLoad - Hook should not initially call callback when config is not provided', async () => {
    renderHook(() => useAsyncLoad(mockAsyncCallback));

    await waitFor(() => {
      expect(mockAsyncCallback).not.toBeCalled();
    });
  });

  it('useAsyncLoad - Hook should correctly represent current state of load', async () => {
    const { result } = renderHook(() => useAsyncLoad(mockAsyncCallback));

    await waitFor(() => {
      expect(result.current).toEqual(
        expect.objectContaining({
          isIdle: true,
          isLoading: false,
          isError: false,
        }),
      );
    });

    act(() => {
      result.current.call(true);
    });

    await waitFor(() => {
      expect(result.current).toEqual(
        expect.objectContaining({
          isIdle: false,
          isLoading: false,
          isError: false,
        }),
      );
    });

    act(() => {
      result.current.call(false);
    });

    await waitFor(() => {
      expect(result.current).toEqual(
        expect.objectContaining({
          isIdle: false,
          isLoading: false,
          isError: true,
        }),
      );
    });
  });
});
