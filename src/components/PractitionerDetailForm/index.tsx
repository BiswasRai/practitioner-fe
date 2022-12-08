import React from "react";
import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  TimePicker,
  Upload,
  notification,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PlusOutlined,
  ContactsOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

import Dashboard from "../Dashboard";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  createPractitioner,
  editPractitioner,
} from "../../reducer/practitioner.slice";
import { useNavigate, useParams } from "react-router-dom";
import { ApiErrorResponse, Practitioner } from "../../constants/globalType";
import moment from "moment";
import dayjs from "dayjs";

const handlePractitionerForm = (
  form: any,
  onFinish: any,
  specialist: boolean,
  onCheckboxChange: any
) => {
  return (
    <Form
      form={form}
      name="practitioner-form"
      onFinish={onFinish}
      layout={"vertical"}
    >
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
            label="Full Name"
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
            label="Email"
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
            label="Contact No."
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
            name="dateOfBirth"
            label="Date Of Birth"
            rules={[
              { required: true, message: "Please input your Date of Birth!" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
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
            label="Start Time and End Time"
            name="startTimeAndEndTime"
            rules={[
              {
                required: true,
                message: "Please input your start time!",
              },
            ]}
          >
            <TimePicker.RangePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Working Days"
            name="workingDays"
            rules={[
              {
                required: true,
                message: "Please input your Working Days!",
              },
            ]}
          >
            <Input
              prefix={<ClockCircleOutlined className="site-form-item-icon" />}
              placeholder="Working Days"
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
            label="Permanent Address"
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
            label="Temporary Address"
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
      </Row>
      <Row>
        <Form.Item name="isSpecialist">
          <Checkbox checked={specialist} onChange={onCheckboxChange}>
            Specialist
          </Checkbox>
        </Form.Item>
      </Row>

      <Row>
        <Col span={3}>
          <Button type="primary" htmlType="submit">
            Add Practitioner
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

const PractitionerDetailForm = () => {
  const dispatch = useAppDispatch();
  const [specialist, setSpecialist] = React.useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [edit, setEdit] = React.useState(false);
  const practitioners = useAppSelector((store) => store.practitioner);

  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const existingData: Practitioner = practitioners.practitioners.find(
    (item: any) => item.id === parseInt(id ?? "")
  );
  React.useEffect(() => {
    handleEdit();
  }, []);

  const handleEdit = () => {
    if (id) {
      form.setFieldsValue({
        fullName: existingData.fullName,
        contact: existingData.contact,
        email: existingData.email,
        isSpecialist: existingData.isSpecialist,
        temporaryAddress: existingData.temporaryAddress,
        permanentAddress: existingData.permanentAddress,
        dateOfBirth: moment(existingData.dateOfBirth, "YYYY-MM-DD"),
        photo: existingData.photo,
        startTimeAndEndTime: [
          dayjs(existingData.startTime, "HH:mm:ss"),
          dayjs(existingData.endTime, "HH:mm:ss"),
        ],
        workingDays: existingData.workingDays,
      });

      setEdit(!edit);
    }
  };

  const onCheckboxChange = (e: { target: { checked: boolean } }) => {
    setSpecialist(e.target.checked);
  };

  const onFinish = async (values: any) => {
    const rangeValue = values["startTimeAndEndTime"];
    const { startTimeAndEndTime, ...fieldValues } = values;

    const payload = {
      ...fieldValues,
      photo:
        "https://lh3.googleusercontent.com/a/AEdFTp5T6eiTQKPZuojbcv18dNujJyHA0mBkCit-UHsw=s96-c",
      isSpecialist: specialist,
      endTime: rangeValue[1].format("HH:mm:ss"),
      startTime: rangeValue[0].format("HH:mm:ss"),
      dateOfBirth: fieldValues["dateOfBirth"].format("YYYY-MM-DD"),
    };

    try {
      if (edit) {
        await dispatch(
          editPractitioner({
            id,
            ...payload,
          })
        ).unwrap();
      } else {
        await dispatch(createPractitioner(payload)).unwrap();
      }
    } catch (error) {
      const err = error as ApiErrorResponse;

      api["error"]({
        message: err.message || "Something went wrong",
        description: `${err.data.info}`,
      });

      return;
    }
    navigate("/practitioner");
  };

  return (
    <Dashboard>
      {contextHolder}

      <p>Practitioner</p>
      <Card>
        {practitioners.loading
          ? ""
          : handlePractitionerForm(
              form,
              onFinish,
              specialist,
              onCheckboxChange
            )}
      </Card>
    </Dashboard>
  );
};

export default PractitionerDetailForm;
