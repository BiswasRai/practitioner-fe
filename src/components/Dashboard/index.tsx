import React from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { NavLink } from "react-router-dom";

const { Header, Sider, Content } = Layout;

type DashboardProps = {
  children: React.ReactNode;
};

const Dashboard = (props: DashboardProps) => {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key={1} icon={<UserOutlined />}>
            <NavLink to="/practitioner">Practitioner</NavLink>
          </Menu.Item>

          <Menu.Item key={2} icon={<TeamOutlined />}>
            <NavLink to="/User">User</NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="bg-white" style={{ padding: "0 0 0 24px" }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
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
