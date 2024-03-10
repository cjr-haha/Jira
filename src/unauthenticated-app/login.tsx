import React, { useCallback } from "react";
import { Button, Form, Input, message } from "antd";
import useAsync from "../http/useAsync";
import { fetchLogin } from "../http";
import { UserAuth } from "../type/user";
import { useAuth } from "../context/auth";
import { useHistory } from "react-router";

function Login({ setError }: { setError: Function }) {
  const { isLoading, run } = useAsync();
  const { authLogin, user } = useAuth();

  const onFinish = useCallback(async (values: UserAuth) => {
    try {
      await run(authLogin(values), { isThrowError: true });
    } catch (error) {
      setError(error);
    }
  }, []);

  return (
    <Form onFinish={onFinish}>
      <Form.Item
        name="username"
        label=""
        rules={[{ required: true, message: "请填写用户名!" }]}
      >
        <Input placeholder={"请填写用户名"} />
      </Form.Item>
      <Form.Item
        name="password"
        label=""
        rules={[{ required: true, message: "请填写密码!" }]}
      >
        <Input.Password placeholder={"请填写密码"} />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24, offset: 0 }}>
        <Button
          children={"提交"}
          htmlType={"submit"}
          loading={isLoading}
          type={"primary"}
          style={{ width: "100%" }}
        />
      </Form.Item>
    </Form>
  );
}

export default Login;
