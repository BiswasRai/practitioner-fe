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
import { checkIfStringContainsSpaceInStartAndEnd } from "../../utils/string";

const { Title } = Typography;

const SignUp: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (getAccessToken()) {
      navigate("/practitioner");
    }
  }, []);

  const onFinish = async (values: Signup) => {
    let res: ApiResponse;

    setLoading(true);
    try {
      res = await signupUser(values);
    } catch (error) {
      const err = error as ApiErrorResponse;

      api["error"]({
        message: err.message || "Something went wrong",
        description: `${err.data.info}`,
      });

      setLoading(false);

      return;
    } finally {
      setLoading(false);
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
          rules={[
            { required: true, message: "Please input your First Name!" },
            {
              validator: (_, value) =>
                !checkIfStringContainsSpaceInStartAndEnd(value)
                  ? Promise.resolve()
                  : Promise.reject(new Error("Please remove extra spaces.")),
            },
          ]}
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
          rules={[
            { required: true, message: "Please input your Last Name!" },
            {
              validator: (_, value) =>
                !checkIfStringContainsSpaceInStartAndEnd(value)
                  ? Promise.resolve()
                  : Promise.reject(new Error("Please remove extra spaces.")),
            },
          ]}
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
            {
              validator: (_, value) =>
                !checkIfStringContainsSpaceInStartAndEnd(value)
                  ? Promise.resolve()
                  : Promise.reject(new Error("Please remove extra spaces.")),
            },
          ]}
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
          rules={[
            { required: true, message: "Please input your Password!" },
            {
              validator: (_, value) =>
                !checkIfStringContainsSpaceInStartAndEnd(value)
                  ? Promise.resolve()
                  : Promise.reject(new Error("Please remove extra spaces.")),
            },
          ]}
          hasFeedback={true}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Button
          type="primary"
          loading={loading}
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
