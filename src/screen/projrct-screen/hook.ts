import { cleanObjFalse, useUrl } from "../../utils/hooks";
import { useEffect, useMemo } from "react";
import useAsync from "../../http/useAsync";
import { useFetchProjectLists } from "../../http";
import { Project } from "../../type/project";

//这个是给project的hook
//使用useProjectUrlParams(['key1','key1']) 注意personId为string 要转换为number
export const useProjectUrlParams = () => {
  const [params, setUrlParams] = useUrl(["name", "personId"]);
  return [
    useMemo(
      () => ({
        ...params,
        personId: Number(params) || undefined,
      }),
      [params]
    ),
    setUrlParams,
  ] as const;
};

export const useGetProjects = (
  params: Partial<Pick<Project, "name" | "personId">>
) => {
  const { isLoading, isFailed, data, run } = useAsync<Project[]>();
  const clientProject = useFetchProjectLists();

  useEffect(() => {
    run(clientProject(cleanObjFalse(params)));
  }, [params]);

  return {
    isLoading,
    isFailed,
    data,
  };
};
