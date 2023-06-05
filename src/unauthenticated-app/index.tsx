import React, { useState } from "react";
import styled from "@emotion/styled";
import Login from "./login";
import Resgieter from "./register";
import logo from "assets/logo.svg";
import right from "assets/right.svg";
import left from "assets/left.svg";

const Wrapper = styled.div`
  background-image: url(${left}), url(${right});
  background-repeat: no-repeat;
  background-position: left bottom, bottom right;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-content: center;
  //align-items: center;

  .logo {
    background-image: url(${logo});
    background-repeat: no-repeat;
    background-position: center 2rem;
    background-size: 8rem auto;
    padding: 5rem 0;
  }

  .innerBox {
    width: 40rem;
    border: 1px solid #f0f0f0;
    padding: 3.2rem 4rem;
    min-height: 56rem;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
    align-self: center;

    .contentBox {
      padding: 24px;
      display: flex;
      flex-direction: column;
      align-content: center;
      .title {
        font-weight: 500;
        font-size: 24px;
        line-height: calc(37 / 24);
        color: rgb(94, 108, 132);
        padding-bottom: 24px;
        text-align: center;
      }

      .middle {
        text-align: center;
        font-size: 18px;
        color: red;
        font-weight: 500;
        line-height: 2em;
      }

      .foot {
        line-height: 1.5715;
        font-size: 16px;
        color: #0052cc;
        cursor: pointer;
        text-align: center;
      }
    }
  }
`;

function UnAuthenticatedApp() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  return (
    <Wrapper>
      <div className={"logo"}></div>
      <div className={"innerBox"}>
        <div className={"contentBox"}>
          <div className={"title"}>{isLogin ? "请登录" : "请注册"}</div>
          <div className={"middle"}>{error?.message || ""}</div>

          {isLogin ? (
            <Login setError={setError} />
          ) : (
            <Resgieter setError={setError} />
          )}
          <div className={"foot"} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "没有账号？注册新账号" : "已经有账号了？直接登录"}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default UnAuthenticatedApp;
