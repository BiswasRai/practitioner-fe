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
  Popconfirm,
} from "antd";
import { EyeOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";

import Dashboard from "../Dashboard";
import {
  ApiErrorResponse,
  ApiResponse,
  Practitioner,
} from "../../constants/globalType";

const { Title } = Typography;

const PractitionerList = () => {
  const [api, contextHolder] = notification.useNotification();

  const practitioner = useAppSelector((state) => state.practitioner);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    handleFetchPractitioners();
  }, []);

  const handleFetchPractitioners = async () => {
    try {
      await dispatch(fetchPractitioners());
    } catch (error) {
      const err = error as ApiErrorResponse;

      api["error"]({
        message: err.message || "Something went wrong",
        description: `${err.data.info}` || "",
      });
    }
  };

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
      message: response.message || "Something completed",
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
      render: (value: any) => {
        return <Avatar src={value} />;
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
      title: "Temporary Address",
      dataIndex: "temporaryAddress",
      key: "temporaryAddress",
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
      title: "",
      key: "Details",
      width: "300px",
      render: (value: Practitioner) => {
        return (
          <>
            <Link to={`../${value.id}`}>
              <Button type="primary" icon={<EyeOutlined />}>
                View Details
              </Button>
            </Link>

            <Popconfirm
              title="Are you sure you want to delete?"
              onConfirm={() => handleDelete(value.id!)}
            >
              <Button
                style={{ marginLeft: "20px" }}
                type="primary"
                icon={<DeleteOutlined />}
                danger
              >
                Delete
              </Button>
            </Popconfirm>
          </>
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
