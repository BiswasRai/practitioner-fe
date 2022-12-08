import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  fetchPractitioners,
  removePractitioner,
} from "../../reducer/practitioner.slice";
import {
  Table,
  Typography,
  Avatar,
  Button,
  Col,
  Row,
  notification,
} from "antd";
import { EyeOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";

import Dashboard from "../Dashboard";
import {
  ApiErrorResponse,
  ApiResponse,
  Practitioner,
} from "../../constants/globalType";
import moment from "moment";

const { Title } = Typography;

const PractitionerList = () => {
  const [api, contextHolder] = notification.useNotification();

  const practitioner = useAppSelector((state) => state.practitioner);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchPractitioners());
  }, []);

  const handleDelete = async (id: number) => {
    let response: ApiResponse;
    try {
      response = await dispatch(removePractitioner(id)).unwrap();
    } catch (error) {
      const err = error as ApiErrorResponse;

      api["error"]({
        message: err.message || "Something went wrong",
        description: `${err.data.info}` || "",
      });

      return;
    }
    api["success"]({
      message: response.message || "Something went wrong",
      description: `${response.message}` || "",
    });
  };

  const practitionerColumn = [
    {
      title: "Practitioner ID",
      dataIndex: "id",
      key: "id",
      width: "150px",
    },
    {
      title: "",
      dataIndex: "photo",
      key: "photo",
      width: "100px",
      render: (value: Practitioner) => {
        return (
          <Avatar
            src={value?.photo ?? ""}
            style={{ backgroundColor: "#fde3cf" }}
          />
        );
      },
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Permanent Address",
      dataIndex: "permanentAddress",
      key: "permanentAddress",
    },
    {
      title: "Contact No.",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Details",
      key: "Details",
      render: (value: Practitioner) => {
        return (
          <Link to={`../${value.id}`}>
            <Button type="primary" icon={<EyeOutlined />}>
              View Details
            </Button>
          </Link>
        );
      },
    },
    {
      title: "Delete",
      key: "Delete",
      render: (value: Practitioner) => {
        return (
          <Button
            type="ghost"
            onClick={() => handleDelete(value.id!)}
            icon={<DeleteOutlined />}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  return (
    <Dashboard>
      {contextHolder}

      <Row
        justify="space-between"
        align="middle"
        style={{ marginBottom: "24px" }}
      >
        <Col span={4}>
          <Title level={2}>Practitioner List</Title>
        </Col>
        <Col span={3}>
          <Button
            type="primary"
            style={{ width: "100%" }}
            icon={<PlusOutlined />}
            onClick={() => navigate("/practitioner/new")}
          >
            Add Practitioner
          </Button>
        </Col>
      </Row>

      <Table
        rowKey={(value) => value.id}
        loading={practitioner.loading}
        columns={practitionerColumn}
        dataSource={practitioner.practitioners}
      />
    </Dashboard>
  );
};

export default PractitionerList;
