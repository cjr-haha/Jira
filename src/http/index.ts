import request, { useHttpToken } from "./request";
import { UserAuth } from "../type/user";
import { Project, TeamUsers } from "../type/project";
import useAsync from "./useAsync";

/**
 * 作者:chenjinrong
 * 时间:2023/06/18 16:23:02
 * 功能:这个接口是获取用户信息
 */
export function fetchUser() {
  return;
  // if (token) {
  //   const data = await http("me", { token });
  //   user = data.user;
  // }
  // return user;
}

/**
 * 作者:chenjinrong
 * 时间:2023/06/18 16:23:30
 * 功能:登录
 *
 */
export const fetchLogin = (data: UserAuth) => {
  return request("/login", {
    method: "POST",
    data,
  });
};
/**
 * 作者:chenjinrong
 * 时间:2023/06/18 16:23:50
 * 功能:登出
 *
 */
export const fetchLogout = () => {
  return new Promise((res, rej) => {
    setTimeout(() => res("登出成功"));
  });
};

/**
 * 作者:chenjinrong
 * 时间:2023/06/18 16:24:05
 * 功能:注册
 *
 */
export const fetchRegister = (data: UserAuth) => {
  return request("/register", {
    method: "POST",
    data,
  });
};

/**
 * 作者:chenjinrong
 * 时间:2023/06/18 16:24:17
 * 功能:获取项目列表
 *
 */
export const useFetchProjectLists = () => {
  const client = useHttpToken();
  const { isLoading, isFailed, data, run, retry, ...other } = useAsync<
    Project[]
  >();
  return {
    run: (params?: Partial<Project>, config = {}) =>
      run(client("/projects", { params }), {
        retry: () => client("/projects", { params }),
      }),
    retry,
    isLoading,
    isFailed,
    data,
    ...other,
  };
};

/**
 * 作者:chenjinrong
 * 时间:2023/06/18 16:24:51
 * 功能:添加项目
 *
 */
export const useFetchAddProject = () => {
  const client = useHttpToken();
  return (data: { name: string; organization: string; ownerId?: string }) =>
    client("/projects", {
      data,
      method: "post",
    });
};

/**
 * 作者:chenjinrong
 * 时间:2023/06/18 16:25:09
 * 功能:编辑某个存在项目
 *
 */
export const useFetchEditProject = () => {
  const client = useHttpToken();
  return (data: Partial<Project>) =>
    client("/projects/" + data.id, { data, method: "PATCH" });
};

/**
 * 作者:chenjinrong
 * 时间:2023/06/18 16:25:32
 * 功能:获取某个项目的想起信息
 *
 */
export const useFetchTheProject = () => {
  const http = useHttpToken();
  return (id: number) => http("/projects/" + id);
};

/**
 * 作者:chenjinrong
 * 时间:2023/06/18 16:30:40
 * 功能:获取所有组员详细信息
 *
 */
export const useProjectUsers = () => {
  const http = useHttpToken();
  const { data, run, ...other } = useAsync<TeamUsers[]>();
  return {
    run: () => run(http("/users")),
    data,
    ...other,
  };
};

/**
 * 作者:chenjinrong
 * 时间:2023/06/28 08:21:11
 * 功能:收藏/结束收藏 某个项目
 *
 */
export const useCollectProjects = () => {
  const http = useHttpToken();
  const { isLoading, isFailed, data, run, isSuccess } = useAsync<Project>();
  return {
    run: (data: { id: number; pin: boolean }) =>
      run(http("/projects/" + data.id, { data, method: "PATCH" })),
    isLoading,
    isFailed,
    isSuccess,
    data,
  };
};
/**
 * 作者:chenjinrong
 * 时间:2023/06/28 08:21:40
 * 功能:删除某个项目
 *
 */
export const useDeleteAProject = () => {
  const http = useHttpToken();
  const { isLoading, isFailed, data, run, isSuccess } = useAsync<Project>();
  return {
    run: (id: number) => run(http("/projects/" + id, { method: "DELETE" })),
    isLoading,
    isFailed,
    isSuccess,
    data,
  };
};
