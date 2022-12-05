import { Button, Card, Col, Form, Input, Row, Upload } from "antd";

import {
  UserOutlined,
  MailOutlined,
  PlusOutlined,
  ContactsOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import Dashboard from "../Dashboard";

const onFinish = (values: any) => {
  console.log("Received values of form: ", values);
};

const handlePractitionerForm = () => {
  return (
    <Form name="practitioner-form" onFinish={onFinish}>
      <Row>
        <Col>
          <Form.Item valuePropName="fileList">
            <Upload action="/upload.do" listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
        </Col>
      </Row>
      <Row
        style={{ width: "100%" }}
        gutter={[16, 16]}
        align="middle"
        justify="space-between"
      >
        <Col span={12}>
          <Form.Item
            name="fullName"
            rules={[
              { required: true, message: "Please input your First Name!" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Full Name"
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email Address"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row
        style={{ width: "100%" }}
        gutter={[16, 16]}
        align="middle"
        justify="space-between"
      >
        <Col span={12}>
          <Form.Item
            name="contact"
            rules={[{ required: true, message: "Please input your contact!" }]}
          >
            <Input
              prefix={<ContactsOutlined className="site-form-item-icon" />}
              placeholder="Contact No."
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="dob"
            rules={[
              { required: true, message: "Please input your Date of Birth!" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Date of Birth"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row
        style={{ width: "100%" }}
        gutter={[16, 16]}
        align="middle"
        justify="space-between"
      >
        <Col span={12}>
          <Form.Item
            name="startTime"
            rules={[
              { required: true, message: "Please input your start time!" },
            ]}
          >
            <Input
              prefix={<ClockCircleOutlined className="site-form-item-icon" />}
              placeholder="Start Time"
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="endTime"
            rules={[{ required: true, message: "Please input your end time!" }]}
          >
            <Input
              prefix={<ClockCircleOutlined className="site-form-item-icon" />}
              placeholder="End Time"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row
        style={{ width: "100%" }}
        gutter={[16, 16]}
        align="middle"
        justify="space-between"
      >
        <Col span={12}>
          <Form.Item
            name="permanentAddress"
            rules={[
              {
                required: true,
                message: "Please input your Permanent Address!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Permanent Address"
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="temporaryAddress"
            rules={[
              {
                required: true,
                message: "Please input your Temporary Address!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Temporary Address"
            />
          </Form.Item>
        </Col>

        <Row>
          <Col span={3}>
            <Button type="primary" htmlType="submit">
              Add Practitioner
            </Button>
          </Col>
        </Row>
      </Row>
    </Form>
  );
};

const PractitionerDetailForm = () => {
  return (
    <Dashboard>
      <p>Practitioner</p>
      <Card>{handlePractitionerForm()}</Card>
    </Dashboard>
  );
};

export default PractitionerDetailForm;
