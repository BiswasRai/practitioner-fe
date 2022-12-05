import React from "react";
import { Link } from "react-router-dom";

import { Button, Form, Input, notification, Row, Typography } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";

import { loginUser } from "../../services/login.service";
import {
  ApiErrorResponse,
  ApiResponse,
  Signup,
} from "../../constants/globalType";

const { Title } = Typography;

const SignUp: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();

  const onFinish = async (values: Signup) => {
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
        className="signup-page__form"
        onFinish={onFinish}
      >
        <Title level={2} style={{ marginBottom: "50px" }}>
          Sign Up
        </Title>
        <Form.Item
          className="form-input"
          name="firstName"
          rules={[{ required: true, message: "Please input your First Name!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="First Name"
          />
        </Form.Item>
        <Form.Item
          className="form-input"
          name="lastName"
          rules={[{ required: true, message: "Please input your Last Name!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Last Name"
          />
        </Form.Item>
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
          Sign Up
        </Button>
        Or <Link to="/login">Log in</Link>
      </Form>
    </Row>
  );
};

export default SignUp;
