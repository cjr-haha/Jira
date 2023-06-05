import request, { useHttpToken } from "./request";
import { UserAuth } from "../type/user";
import { Project } from "../type/project";

export function fetchUser() {
  return;
  // if (token) {
  //   const data = await http("me", { token });
  //   user = data.user;
  // }
  // return user;
}
export const fetchLogin = (data: UserAuth) => {
  return request("/login", {
    method: "POST",
    data,
  });
};
export const fetchLogout = () => {
  return new Promise((res, rej) => {
    setTimeout(() => res("登出成功"));
  });
};

export const fetchRegister = (data: UserAuth) => {
  return request("/register", {
    method: "POST",
    data,
  });
};

// export const fetchProjectLists = (params:Partial<Project>)=>{
//    return request('/projects',{
//      params
//    })
// }
export const useFetchProjectLists = () => {
  const client = useHttpToken();
  return (params: Partial<Project>) => client("/projects", { params });
};
