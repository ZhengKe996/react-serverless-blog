import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { Layout, Menu } from "antd";
import store from "../store";
import HomeManagement from "./container/HomeManagement";
import BasicSetting from "./container/BasicSetting";
import styles from "./style.module.scss";

import "normalize.css";
import "./style.scss";
import "antd/dist/antd.css";

const { Header, Sider, Content } = Layout;

const useCollapsed = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return { collapsed, toggleCollapsed };
};
const Wrapper = () => {
  const { collapsed, toggleCollapsed } = useCollapsed();

  const handleHomePageRedirect = () => {
    window.location.href = "/";
  };
  return (
    <Router>
      <Layout>
        <Sider
          className={styles.sidebar}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["admin-home"]}>
            <Menu.Item key="admin-home">
              <Link to={"/"}>
                <span className="iconfont">&#xe739;</span>&nbsp;首页内容管理
              </Link>
            </Menu.Item>
            <Menu.Item key="admin-setting">
              <Link to={"setting"}>
                <span className="iconfont"> &#xe62d;</span>&nbsp;基础信息配置
              </Link>
            </Menu.Item>
            <Menu.Item key="admin-back" onClick={handleHomePageRedirect}>
              <span className="iconfont">&#xe6bd;</span>&nbsp;返回用户页面
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className={styles.header}>
            {collapsed ? (
              <span
                className={`iconfont ${styles.icon}`}
                onClick={toggleCollapsed}
              >
                &#xe680;
              </span>
            ) : (
              <span
                className={`iconfont ${styles.icon}`}
                onClick={toggleCollapsed}
              >
                &#xe67f;
              </span>
            )}
          </Header>
          <Content className={styles.content}>
            <Routes>
              <Route path="/" element={<HomeManagement />} exact={false} />
              <Route path="setting" element={<BasicSetting />} exact={false} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Wrapper />
    </Provider>
  </React.StrictMode>
);
