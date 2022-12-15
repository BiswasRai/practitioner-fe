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
  UploadFile,
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
import axios from "axios";
import { isEmpty } from "../../utils/string";
import { RcFile } from "antd/es/upload";

const handlePractitionerForm = (
  form: any,
  edit: boolean,
  onFinish: any,
  specialist: boolean,
  onChangeImage: any,
  handlePreview: any,
  fileList: any,
  handleRemove: any,
  onCheckboxChange: any
) => {
  console.log(fileList);
  return (
    <Form
      form={form}
      name="practitioner-form"
      onFinish={onFinish}
      layout={"vertical"}
    >
      <Row>
        <Col>
          <Form.Item
            name="photo"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            }}
            rules={[
              {
                required: true,
                message: "Please upload a image",
              },
            ]}
          >
            <Upload
              name="photo"
              fileList={fileList}
              listType="picture-card"
              maxCount={1}
              beforeUpload={() => false}
              onPreview={handlePreview}
              onRemove={handleRemove}
              onChange={(file: any) => onChangeImage(file)}
            >
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
            {edit ? "Edit" : "Add"} Practitioner
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

type FileList = {
  uid: string;
  name: string;
  status: string;
  url: string;
};

const PractitionerDetailForm = () => {
  const dispatch = useAppDispatch();
  const [image, setImage] = React.useState("");
  const [fileList, setFileList] = React.useState<Array<FileList>>([
    { uid: "", name: "", status: "", url: "" },
  ]);
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
    console.log(fileList[0].url, "ima");
    if (id) {
      form.setFieldsValue({
        fullName: existingData.fullName,
        contact: existingData.contact,
        email: existingData.email,
        isSpecialist: existingData.isSpecialist,
        temporaryAddress: existingData.temporaryAddress,
        permanentAddress: existingData.permanentAddress,
        dateOfBirth: moment(existingData.dateOfBirth, "YYYY-MM-DD"),
        photo: isEmpty(image) ? existingData.photo : image,
        startTimeAndEndTime: [
          dayjs(existingData.startTime, "HH:mm:ss"),
          dayjs(existingData.endTime, "HH:mm:ss"),
        ],
        workingDays: existingData.workingDays,
      });

      setFileList([
        { uid: "-1", name: "", status: "done", url: existingData.photo },
      ]);

      setSpecialist(existingData.isSpecialist);
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
      isSpecialist: specialist,
      photo: image,
      endTime: rangeValue[1].format("HH:mm:ss"),
      startTime: rangeValue[0].format("HH:mm:ss"),
      dateOfBirth: fieldValues["dateOfBirth"].format("YYYY-MM-DD"),
    };

    let res: any;
    try {
      if (edit) {
        res = await dispatch(
          editPractitioner({
            id,
            ...payload,
          })
        ).unwrap();
      } else {
        await dispatch(createPractitioner(payload)).unwrap();

        navigate("/practitioner");
      }
    } catch (error) {
      const err = error as ApiErrorResponse;

      api["error"]({
        message: err.message || "Something went wrong",
        description: `${err.data.info}`,
      });

      return;
    }

    api["success"]({
      message: res.message || "Successfully completed",
      description: `${res.message}`,
    });
  };

  const handleOnChangeImage = (file: any) => {
    let reader = new FormData();
    reader.append("file", file.fileList[0].originFileObj);
    reader.append("data", file.fileList[0].originFileObj);

    axios
      .post("http://localhost:8080/api/v1/image", reader)
      .then((res) => {
        setImage(res.data.data.imageURL);
        setFileList([
          {
            uid: "",
            name: "",
            status: "done",
            url: res.data.data.imageURL,
          },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePreview = async (file: UploadFile) => {
    let src = file.url as string;

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }

    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onRemove = (file: UploadFile) => {
    setFileList(fileList.filter((item) => item.status === "removed"));
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
              edit,
              onFinish,
              specialist,
              handleOnChangeImage,
              handlePreview,
              fileList,
              onRemove,
              onCheckboxChange
            )}
      </Card>
    </Dashboard>
  );
};

export default PractitionerDetailForm;
