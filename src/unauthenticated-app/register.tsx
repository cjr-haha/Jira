import React from "react";
import { Button, Form, Input } from "antd";
import useAsync from "../http/useAsync";
import { useAuth } from "../context/auth";

function Resgieter({ setError }: { setError: Function }) {
  const { isLoading, run } = useAsync();
  const { authRegister } = useAuth();

  const onFinish = ({
    username,
    password,
    passwordAgain,
  }: {
    username: string;
    password: string;
    passwordAgain: string;
  }) => {
    try {
      run(authRegister({ username, password }), { isThrowError: true });
    } catch (eerror) {
      setError(eerror);
    }
  };
  return (
    <Form onFinish={onFinish}>
      <Form.Item
        name="username"
        label=""
        rules={[{ required: true, message: "请输入用户名!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label=""
        rules={[{ required: true, message: "请填密码!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="passwordAgain"
        label=""
        rules={[
          { required: true, message: "请在再次写密码!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("两次密码输入不一致"));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }}>
        <Button
          htmlType={"submit"}
          children={"注册"}
          loading={isLoading}
          type={"primary"}
          style={{ width: "100%" }}
        />
      </Form.Item>
    </Form>
  );
}

export default Resgieter;
