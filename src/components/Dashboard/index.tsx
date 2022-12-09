import React from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Col, Layout, Menu, Row } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import {
  removeAccessToken,
  removeRefreshToken,
} from "../../utils/localStorage";

const { Header, Sider, Content } = Layout;

type DashboardProps = {
  children: React.ReactNode;
};

const Dashboard = (props: DashboardProps) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeAccessToken();
    removeRefreshToken();

    navigate("/login");
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key={1} icon={<UserOutlined />}>
            <NavLink to="/practitioner">Practitioner</NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="bg-white" style={{ padding: "0 0 0 24px" }}>
          <Row justify="space-between">
            <Col span={12}>
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: () => setCollapsed(!collapsed),
                }
              )}
            </Col>

            <Col span={2} offset={10}>
              <Button onClick={() => handleLogout()}>Logout</Button>
            </Col>
          </Row>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
