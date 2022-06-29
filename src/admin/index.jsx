import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { Layout, Menu, message } from "antd";
import store from "../store";
import HomeManagement from "./container/HomeManagement";
import BasicSetting from "./container/BasicSetting";
import Login from "./container/Login";
import { getChangeSchemaAction } from "./store/action";
import { parseJsonByString } from "../utils";
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

const useStore = () => {
  const dispatch = useDispatch();
  const changeSchema = (schema) => {
    dispatch(getChangeSchemaAction(schema));
  };

  return { changeSchema };
};

const Wrapper = () => {
  const { changeSchema } = useStore();
  const { collapsed, toggleCollapsed } = useCollapsed();
  const token = window.localStorage._authing_token;
  useEffect(() => {
    axios.get("/api/schema/getLatestOne").then((res) => {
      const { data = null, success = false } = res.data;
      data && changeSchema(parseJsonByString(data.schema, {}));
      (success && message.success("获取配置成功")) ||
        message.error("获取配置失败, 请稍后再试");
    });
  }, [changeSchema]);

  const handleHomePageRedirect = () => {
    window.location.href = "/";
  };
  return token ? (
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
