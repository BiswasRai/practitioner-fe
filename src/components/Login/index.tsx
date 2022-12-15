import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button, Form, Input, notification, Row, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

import { loginUser } from "../../services/login.service";
import {
  ApiErrorResponse,
  ApiResponse,
  Userlogin,
} from "../../constants/globalType";
import {
  getAccessToken,
  setAccessToken,
  setRefreshToken,
} from "../../utils/localStorage";

const { Title } = Typography;

const Login: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (getAccessToken()) {
      navigate("/practitioner");
    }
  }, []);

  const onFinish = async (values: Userlogin) => {
    let res: ApiResponse;

    try {
      res = await loginUser(values);
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
        className="login-page__form"
        onFinish={onFinish}
        layout={"vertical"}
      >
        <Title level={2} style={{ marginBottom: "50px" }}>
          Login
        </Title>
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
          Log in
        </Button>
        Or <Link to="/signup">Sign Up</Link>
      </Form>
    </Row>
  );
};

export default Login;
