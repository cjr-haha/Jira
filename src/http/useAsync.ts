import React, { useCallback, useState } from "react";

const Statu = {
  SUCCESS: "success",
  FAIL: "fail",
  LOADING: "loading",
  IDLE: "idle",
};

interface DATA<D> {
  data: D | null;
  status: string;
  error: Error | null;
}

const defaultValue: DATA<null> = {
  data: null,
  status: Statu.IDLE,
  error: null,
};

/**
 * params:可能回自定义一些参数配置 所以我们就给一些
 * 这个hook主要是用于promise请求的时候的一个状态的返回以及数据的操作
 * retry是重新发送请求，由于要保存params
 * return
 */
const useAsync = <D>(initialSate?: DATA<D>) => {
  const value = { ...defaultValue, ...initialSate };

  const [data, setData] = useState(value);
  const [retry, setRetry] = useState(() => () => {});

  const setLoading = useCallback(
    () => setData((preValue) => ({ ...preValue, status: Statu.LOADING })),
    [setData]
  );
  const setSuccess = useCallback(
    (data: DATA<D>["data"]) =>
      setData({
        data,
        status: Statu.SUCCESS,
        error: null,
      }),
    [setData]
  );
  const setError = useCallback(
    (error: DATA<D>["error"]) =>
      setData({
        data: null,
        status: Statu.FAIL,
        error,
      }),
    [setData]
  );

  const run = useCallback(
    (
      promise: Promise<any>,
      config: { isThrowError?: Boolean; retry?: () => Promise<any> } = {}
    ) => {
      if (!(promise instanceof Promise)) {
        throw new Error("请传入一个promise");
      }

      setRetry(() => () => {
        if (config.retry) {
          run(config.retry(), config);
        }
      });

      setLoading();

      return promise
        .then((data) => {
          setSuccess(data);
          return data;
        })
        .catch((error) => {
          setError(error);

          if (!config.isThrowError) return error;
          return Promise.reject(error);
        });
    },
    [setRetry, setLoading, setSuccess, setError]
  );
  return {
    isSuccess: data.status == Statu.SUCCESS,
    isFailed: data.status == Statu.FAIL,
    isIdle: data.status == Statu.IDLE,
    isLoading: data.status == Statu.LOADING,
    retry,
    run,
    setSuccess,
    setError,
    setLoading,
    setData,
    ...data,
  };
};
export default useAsync;
