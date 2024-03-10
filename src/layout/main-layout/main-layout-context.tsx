import React, { useEffect } from "react";
import { useFetchProjectLists, useProjectUsers } from "../../http";
type R1 = ReturnType<typeof useProjectUsers>;
type R2 = ReturnType<typeof useFetchProjectLists>;
interface MainLayOutContextProps {
  userData: R1["data"];
  userRun: R1["run"];
  listData: R2["data"];
  listRun: R2["run"];

  [keyName: string]: any;
}

const MainLayOutContext = React.createContext<MainLayOutContextProps | null>(
  null
);
MainLayOutContext.displayName = "MY-MainLayOutContext";
function MainLayOutProvider({
  children = null,
}: {
  children: JSX.Element | null;
}) {
  const {
    run: userRun,
    data: userData,
    isLoading: userIsLoading,
    isFailed: userIsFailed,
    retry: userRetry,
  } = useProjectUsers();
  const {
    run: listRun,
    data: listData,
    isLoading: listIsLoading,
    isFailed: listIsFailed,
    retry: listRetry,
  } = useFetchProjectLists();
  useEffect(() => {
    userRun();
    listRun();
  }, []);
  return (
    <React.Fragment>
      <MainLayOutContext.Provider
        value={{
          userData,
          listData,
          userRun,
          listRun,
          userIsLoading,
          userIsFailed,
          userRetry,
          listIsLoading,
          listIsFailed,
          listRetry,
        }}
      >
        {children}
      </MainLayOutContext.Provider>
    </React.Fragment>
  );
}

export const useMinLayOutContext = () => {
  const value = React.useContext(MainLayOutContext);
  if (!value) throw new Error("请使用");
  return value;
};
export default MainLayOutProvider;
