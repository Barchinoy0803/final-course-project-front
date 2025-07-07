import React from "react";
import type { FormProps } from "antd";
import { Alert, Button, Form, Input } from "antd";
import { useAuth } from "../service/useAuth";
import { useDispatch } from "react-redux";
import { setToken } from "../store/auth.slice";

type FieldType = {
  username?: string;
  password?: string;
};

const Login: React.FC = () => {
  const dispatch = useDispatch()
  const {login} = useAuth()
  const {isPending, error, isError} = login
  // console.log(error?.response?.data?.message);
  

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    login.mutate(values, {
      onSuccess:(res) => {
        dispatch(setToken(res.token))
      }
    })
  };


  return (
    <div className="w-full h-screen bg-base-bg grid place-items-center">
      <div className="max-w-[400px] w-full bg-white p-4 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Tizimga kirish</h2>
        <Form
          name="basic"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          {
            isError && 
          <div className="mb-4">
            <Alert message={"username or password is incorrect"} type="error" />
          </div>
          }

          <Form.Item style={{margin:0}} label={null}>
            <Button loading={isPending} type="primary" className="w-full" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default React.memo(Login);
