import React, { ReactNode, useMemo } from "react";
import { User, UserAuth } from "../type/user";
import useAsync from "../http/useAsync";
import { fetchLogin, fetchLogout, fetchRegister } from "../http";
import { useMounted } from "../utils/hooks";

//这个provider本质上是一个数据贡献的地方
//被这个provider包围的组件可以获取login logout register 和user的信息 而且这个provider可以在开启阶段就去获取检验token

// const login = ()=>
const USER_TOKEN = "user_token";

const AuthContext = React.createContext<
  | {
      authLogin: Function;
      authLogOut: Function;
      authRegister: Function;
      user: User | null;
    }
  | undefined
>(undefined);

const handleUserMethods = () => {
  const cleanToken = () => window.localStorage.removeItem(USER_TOKEN);
  const addToken = (token: string) =>
    window.localStorage.setItem(USER_TOKEN, token);

  const login = (data: UserAuth) => {
    return fetchLogin(data).then((data: any) => {
      const { user } = data;
      addToken(user.token);
      return user;
    });
  };

  const logout = () =>
    fetchLogout().then(() => {
      cleanToken();
      return null;
    });

  const register = (data: UserAuth) => {
    return fetchRegister(data).then((res) => {
      return res.data;
    });
  };

  return {
    login,
    logout,
    register,
  };
};

const getInitialValue = () => {};

function Auth({ children }: { children: ReactNode }) {
  const { data: user, isSuccess, setSuccess, run } = useAsync<User | null>();
  console.log(isSuccess, "isSuccess");
  // useMounted()

  const { login, logout, register } = useMemo(handleUserMethods, []);

  const authLogin = (params: UserAuth) => run(login(params));
  const authRegister = (params: UserAuth) => run(register(params));
  const authLogOut = () => run(logout());

  return (
    <AuthContext.Provider value={{ authLogin, authRegister, authLogOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error("请传入context");
  return context;
};

export default Auth;
