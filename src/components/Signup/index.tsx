import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button, Form, Input, notification, Row, Typography } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";

import { signupUser } from "../../services/login.service";
import {
  ApiErrorResponse,
  ApiResponse,
  Signup,
} from "../../constants/globalType";
import {
  getAccessToken,
  setAccessToken,
  setRefreshToken,
} from "../../utils/localStorage";

const { Title } = Typography;

const SignUp: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (getAccessToken()) {
      navigate("/practitioner");
    }
  }, []);

  const onFinish = async (values: Signup) => {
    let res: ApiResponse;

    try {
      res = await signupUser(values);
    } catch (error) {
      const err = error as ApiErrorResponse;

      api["error"]({
        message: err.message || "Something went wrong",
        description: `${err.data.info}`,
      });

      return;
    }

    setAccessToken(res.data.accessToken);
    setRefreshToken(res.data.refreshToken);

    console.log(getAccessToken());
    handleRedirectUser();

    api["success"]({
      message: res.message || "",
    });
  };

  const handleRedirectUser = () => {
    navigate("/practitioner");
  };

  return (
    <Row className="login-page">
      {contextHolder}
      <Form
        name="normal_login"
        className="signup-page__form"
        onFinish={onFinish}
        layout={"vertical"}
      >
        <Title level={2} style={{ marginBottom: "50px" }}>
          Sign Up
        </Title>
        <Form.Item
          className="form-input"
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: "Please input your First Name!" }]}
          normalize={(value, prevVal, prevVals) => value.trim()}
          hasFeedback={true}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="First Name"
          />
        </Form.Item>
        <Form.Item
          className="form-input"
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Please input your Last Name!" }]}
          normalize={(value, prevVal, prevVals) => value.trim()}
          hasFeedback={true}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Last Name"
          />
        </Form.Item>
        <Form.Item
          className="form-input"
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
            {
              type: "email",
              message: "Enter valid email",
            },
          ]}
          normalize={(value, prevVal, prevVals) => value.trim()}
          hasFeedback={true}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          className="form-input"
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please input your Password!" }]}
          hasFeedback={true}
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
