import { cleanObjFalse, useUrl } from "../../utils/hooks";
import { useEffect, useMemo } from "react";
import useAsync from "../../http/useAsync";
import {
  useFetchAddProject,
  useFetchEditProject,
  useFetchProjectLists,
  useFetchTheProject,
} from "../../http";
import { Project } from "../../type/project";
import { useHttpToken } from "../../http/request";
import { useMinLayOutContext } from "../../layout/main-layout/main-layout-context";

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
  const {
    listRun: run,
    listData: data,
    listIsLoading: isLoading,
    listIsFailed: isFailed,
    listRetry: retry,
  } = useMinLayOutContext();

  useEffect(() => {
    run(cleanObjFalse(params));
  }, [JSON.stringify(params)]);

  return {
    isLoading,
    isFailed,
    data,
    retry,
  };
};

export const useProjectCreate = () => {
  const { run, ...otherState } = useAsync();
  const fetchProjected = useFetchAddProject();
  return {
    ...otherState,
    run: (params: { name: string; organization: string; ownerId?: string }) =>
      run(fetchProjected(params)),
  };
};
export const useProjectEdit = () => {
  const { run, ...otherState } = useAsync();
  const fetchProjected = useFetchEditProject();
  return {
    ...otherState,
    run: (params: Partial<Project>) => run(fetchProjected(params)),
  };
};

//这是一个控制model的hook  需要有开关 初始化数据
export const useProjectModal = () => {
  const { isLoading, isFailed, data, run, error } = useAsync();
  const fetchData = useFetchTheProject();

  const [{ projectCreate, editingProjectId }, setUrlParams] = useUrl([
    "projectCreate",
    "editingProjectId",
  ]);

  const close = () => setUrlParams({ projectCreate: "", editingProjectId: "" });
  const openCreateModel = () => setUrlParams({ projectCreate: String(true) });
  const openEditModel = (id: number) =>
    setUrlParams({ editingProjectId: String(id) });

  return {
    isVisitable: projectCreate === "true" || !isNaN(Number(editingProjectId)),
    editingProjectId,
    initialData: projectCreate ? [] : data,
    getEditingDetails: (editingProjectId: number) =>
      run(fetchData(editingProjectId)),
    isLoading,
    initialError: error,
    openEditModel,
    openCreateModel,
    close,
  };
};

//modal提交
export const useModalSubmit = (initialData: Partial<Project> | null) => {
  const { isLoading, error, run } = useAsync();
  const useFetchProjrct = initialData
    ? useFetchEditProject
    : useFetchAddProject;
  const fetch = useFetchProjrct();

  const fetchRun = (params: Partial<Project>) => run(fetch(params as any));
  return {
    isLoading,
    fetchRun,
    error,
  };
};
