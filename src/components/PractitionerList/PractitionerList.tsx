import React from "react";
import { Table, Typography, Avatar, Button, Col, Row } from "antd";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";

import Dashboard from "../Dashboard/Dashboard";

const practitionerData = [
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
    render: (value: string) => {
      return <Avatar src={value} style={{ backgroundColor: "#fde3cf" }} />;
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
    dataIndex: "contactNo",
    key: "contactNo",
  },
  {
    title: "Date of Birth",
    dataIndex: "dob",
    key: "dob",
  },
  {
    title: "Details",
    key: "Details",
    render: () => {
      return (
        <Button type="primary" icon={<EyeOutlined />}>
          View Details
        </Button>
      );
    },
  },
];

const { Title } = Typography;

const PractitionerList = () => {
  return (
    <Dashboard>
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
          >
            Add Practitioner
          </Button>
        </Col>
      </Row>

      <Table
        columns={practitionerData}
        dataSource={[
          {
            id: "1",
            fullName: "Biswas Rai",
            permanentAddress: "Nepal",
            contactNo: 981000,
            dob: "2022-10-01",
          },
        ]}
      />
    </Dashboard>
  );
};

export default PractitionerList;
