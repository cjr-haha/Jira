import { useEffect, useMemo, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import qs from "qs";

//useEffect模仿componentDidMount的自定义hook
export const useMounted = (callback: Function) => {
  useEffect(() => callback(), []);
};

//一个防抖
//使用 useDebounce(原有的参数) 返回一个节流参数 这个参数变化的时候去请求
export const useDebounce = <T>(params: T, time: number) => {
  const [debounceParams, setBebounceParams] = useState(params);

  useEffect(() => {
    const timer = setTimeout(() => setBebounceParams(params), time);
    return () => clearTimeout(timer);
  }, [params, time]);

  return debounceParams;
};

//返回当前需要的urlparams的值 和一个 重置他们的方法
export const useUrl = <T extends string>(keys: T[]) => {
  const paramsObj = useUrlParams();
  const setUrlParams = useSetUrlParams();
  const [keysState] = useState(keys);

  return [
    useMemo(
      () =>
        keysState.reduce((pre, current) => {
          return {
            ...pre,
            [current]: paramsObj[current] || "",
          };
        }, {}) as {
          [key in T]: string;
        },
      [keysState, paramsObj]
    ),
    setUrlParams,
  ] as const;
};

export const useUrlParams = () => {
  const location = useLocation();

  return useMemo(() => {
    const searchStr = location.search;
    const searchQuery = searchStr.split("?");
    const paramsObj = qs.parse(searchQuery[1] || "");

    return paramsObj;
  }, [location]);
};
//设置当前url参数
export const useSetUrlParams = () => {
  const history = useHistory();
  const location = useLocation();

  const paramsObj = useUrlParams();

  return (params: { [key in string]: string | undefined }) => {
    const newUrlParams = cleanObjFalse({ ...paramsObj, ...params });
    const str = "?" + qs.stringify(newUrlParams);
    history.push(location.pathname + str);
  };
};

//清除对象中为null undefined "" 的值
export const cleanObjFalse = (params: { [key in string]: unknown }) => {
  const newParams = Object.keys(params).reduce((pre, current) => {
    if (!!params[current]) return { ...pre, [current]: params[current] };
    return { ...pre };
  }, {});
  return newParams;
};
