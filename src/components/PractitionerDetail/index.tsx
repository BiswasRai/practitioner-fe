import React from "react";
import { Avatar, Card, Col, Row, Tag, Typography } from "antd";

import { AntDesignOutlined, EditOutlined } from "@ant-design/icons";
import Dashboard from "../Dashboard";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import { Practitioner } from "../../constants/globalType";
import moment from "moment";

const { Title } = Typography;

const PractitionerDetail: React.FC = () => {
  const { id } = useParams();
  const practitioners = useAppSelector(
    (store) => store.practitioner.practitioners
  );
  const practitioner: Practitioner = practitioners.find(
    (item: any) => item.id === parseInt(id ?? "")
  );

  const showDateOfBirth = (date: Date) => {
    return moment(date);
  };

  return (
    <Dashboard>
      <Row>
        <div className="practitioner-detail__top">
          <Col span={3}>
            <Avatar
              className="practitioner-avatar"
              size={{ xxl: 130 }}
              src={practitioner.photo}
              icon={<AntDesignOutlined />}
            />
          </Col>

          <Col>
            <Row align="middle">
              <Title level={2} style={{ color: "#fff" }}>
                {practitioner.fullName}
              </Title>

              {practitioner.isSpecialist ? (
                <Tag color="green" style={{ marginLeft: "24px" }}>
                  specialist
                </Tag>
              ) : (
                ""
              )}
            </Row>
            <Title level={5} style={{ margin: 0, color: "#fff" }}>
              Practitioner
            </Title>
          </Col>

          <Col span={3}>
            <Link style={{ color: "white" }} to="./edit">
              <EditOutlined />
            </Link>
          </Col>
        </div>
      </Row>

      <Row gutter={[24, 16]} style={{ marginTop: "24px" }}>
        <Col span={24}>
          <Card>
            <Title level={3}>Personal Info</Title>

            <Row className="practitioner-detail__list" align="middle">
              <Col span={3}>
                <Title
                  level={5}
                  className="text-color practitioner-detail__text"
                >
                  Email
                </Title>
              </Col>
              <Col>
                <p>{practitioner.email}</p>
              </Col>
            </Row>

            <Row className="practitioner-detail__list" align="middle">
              <Col span={3}>
                <Title
                  level={5}
                  className="text-color practitioner-detail__text"
                >
                  Contact
                </Title>
              </Col>
              <p>{practitioner.contact}</p>
            </Row>

            <Row className="practitioner-detail__list" align="middle">
              <Col span={3}>
                <Title
                  level={5}
                  className="text-color practitioner-detail__text"
                >
                  Date of Birth
                </Title>
              </Col>
              <p>{practitioner.dateOfBirth}</p>
            </Row>

            <Row className="practitioner-detail__list" align="middle">
              <Col span={3}>
                <Title
                  level={5}
                  className="text-color practitioner-detail__text"
                >
                  Working Days
                </Title>
              </Col>
              <p>{practitioner.workingDays} Days</p>
            </Row>

            <Row className="practitioner-detail__list" align="middle">
              <Col span={3}>
                <Title
                  level={5}
                  className="text-color practitioner-detail__text"
                >
                  Start Time
                </Title>
              </Col>
              <p>{practitioner.startTime}</p>
            </Row>

            <Row className="practitioner-detail__list" align="middle">
              <Col span={3}>
                <Title
                  level={5}
                  className="text-color practitioner-detail__text"
                >
                  End Time
                </Title>
              </Col>
              <p>{practitioner.endTime}</p>
            </Row>

            <Row className="practitioner-detail__list" align="middle">
              <Col span={3}>
                <Title
                  level={5}
                  className="text-color practitioner-detail__text"
                >
                  Permanent Address
                </Title>
              </Col>
              <p>{practitioner.permanentAddress}</p>
            </Row>

            <Row className="practitioner-detail__list" align="middle">
              <Col span={3}>
                <Title
                  level={5}
                  className="text-color practitioner-detail__text"
                >
                  Temporary Address
                </Title>
              </Col>
              <p>{practitioner.temporaryAddress}</p>
            </Row>
          </Card>
        </Col>
      </Row>
    </Dashboard>
  );
};

export default PractitionerDetail;
