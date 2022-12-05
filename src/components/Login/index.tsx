import React from "react";
import { Link } from "react-router-dom";

import { Button, Form, Input, notification, Row, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

import { loginUser } from "../../services/login.service";
import {
  ApiErrorResponse,
  ApiResponse,
  Userlogin,
} from "../../constants/globalType";

const { Title } = Typography;

const Login: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();

  const onFinish = async (values: Userlogin) => {
    let res: ApiResponse;

    try {
      res = await loginUser(values);
    } catch (error) {
      const err = error as ApiErrorResponse;
      console.log(err, error);
      api["error"]({
        message: err.message || "Something went wrong",
        description: `${err.data.info}`,
      });

      return;
    }

    api["success"]({
      message: res.message || "",
    });
  };

  return (
    <Row className="login-page">
      {contextHolder}
      <Form
        name="normal_login"
        className="login-page__form"
        onFinish={onFinish}
      >
        <Title level={2} style={{ marginBottom: "50px" }}>
          Login
        </Title>
        <Form.Item
          className="form-input"
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          className="form-input"
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "100%", marginTop: "50px" }}
          className="login-form-button"
        >
          Log in
        </Button>
        Or <Link to="/signup">Sign Up</Link>
      </Form>
    </Row>
  );
};

export default Login;
