import React from "react";
import { Avatar, Card, Col, Row, Tag, Typography } from "antd";

import { AntDesignOutlined } from "@ant-design/icons";
import Dashboard from "../Dashboard";

const { Title } = Typography;

const PractitionerDetail: React.FC = () => {
  return (
    <Dashboard>
      <Row>
        <div className="practitioner-detail__top">
          <Col span={3}>
            <Avatar
              className="practitioner-avatar"
              size={{ xxl: 130 }}
              icon={<AntDesignOutlined />}
            />
          </Col>

          <Col>
            <Row align="middle">
              <Title level={2} style={{ color: "#fff" }}>
                Biswas Rai
              </Title>

              <Tag color="green" style={{ marginLeft: "24px" }}>
                specialist
              </Tag>
            </Row>
            <Title level={5} style={{ margin: 0, color: "#fff" }}>
              Practitioner
            </Title>
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
                <p>biswas.rai10@gmail.com</p>
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
              <p>9810023134</p>
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
              <p>2022/10/10</p>
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
              <p>10 Days</p>
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
              <p>2022/10/10</p>
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
              <p>2022/10/10</p>
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
              <p>Kathmandu, Nepal</p>
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
              <p>Kathmandu, Nepal</p>
            </Row>
          </Card>
        </Col>
      </Row>
    </Dashboard>
  );
};

export default PractitionerDetail;
