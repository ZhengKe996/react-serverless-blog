import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { initAuthClient, getAuthClient } from "@authing/react-ui-components";
import { Layout, Menu, message } from "antd";
import store from "../store";
import HomeManagement from "./container/HomeManagement";
import BasicSetting from "./container/BasicSetting";
import Login from "./container/Login";
import useSchemaData from "../hooks/useSchemaData";
import { parseJsonByString, getLoginStatus, clearLogout } from "../utils";
import service from "../service";
import styles from "./style.module.scss";

import "normalize.css";
import "./style.scss";
import "antd/dist/antd.css";

const { Header, Sider, Content } = Layout;
initAuthClient({
  appId: "62bc6937492a7916dbb6f7bf",
});
const useCollapsed = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return { collapsed, toggleCollapsed };
};

const Wrapper = () => {
  const { changeSchema } = useSchemaData();
  const { collapsed, toggleCollapsed } = useCollapsed();
  const login = getLoginStatus();
  const { username, photo } = window.localStorage;

  useEffect(() => {
    service.get("/api/schema/getLatestOne").then((res) => {
      const { data = null, success = false } = res;
      data && changeSchema(parseJsonByString(data.schema, {}));
      (success && message.success("获取配置成功")) ||
        message.error("获取配置失败, 请稍后再试");
    });
  }, []);

  const handleHomePageRedirect = () => {
    window.location.href = "/";
  };

  const handleLogout = () => {
    getAuthClient().logout();
    clearLogout();
    window.location.reload();
  };
  return login ? (
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

            <div className={styles.info} onClick={handleLogout}>
              <img className={styles.avatar} src={photo} alt />
              <span className={styles.username}>{username}</span>
            </div>
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
  ) : (
    <Login style={{ width: "100vw" }} />
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
