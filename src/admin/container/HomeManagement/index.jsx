import { useRef, useState } from "react";
import { Layout, Menu, Button } from "antd";
import styles from "./style.module.scss";
import AreaList from "./component/AreaList";
import PageSetting from "./component/PageSetting";
import { parseJsonByString } from "../../../utils";

const { Header, Sider, Content } = Layout;
const schema = parseJsonByString(window.localStorage.schema, {});
const useCollapsed = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return { collapsed, toggleCollapsed };
};

const HomeManagement = () => {
  const { collapsed, toggleCollapsed } = useCollapsed();
  const handleHomePageRedirect = () => {
    window.location.href = "/";
  };

  const areaListRef = useRef();

  const handleSaveBtnClick = () => {
    const { getSchema } = areaListRef.current;
    const schema = {
      name: "Page",
      attributes: {},
      children: getSchema(),
    };
    console.log(schema);
    window.localStorage.schema = JSON.stringify(schema);
  };

  const handleResetBtnClick = () => {
    const { resetSchema } = areaListRef.current;
    resetSchema();
  };

  return (
    <Layout>
      <Sider
        className={styles.sidebar}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["admin-home"]}>
          <Menu.Item key="admin-home">
            <span className="iconfont">&#xe64d;</span>首页内容管理
          </Menu.Item>
          <Menu.Item key="admin-back" onClick={handleHomePageRedirect}>
            <span className="iconfont">&#xe601;</span>返回用户页面
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className={styles.header}>
          {collapsed ? (
            <span className="iconfont" onClick={toggleCollapsed}>
              &#xe62c;
            </span>
          ) : (
            <span className="iconfont" onClick={toggleCollapsed}>
              &#xe629;
            </span>
          )}
        </Header>
        <Content className={styles.content}>
          <AreaList ref={areaListRef} children={schema?.children || []} />

          <div className={styles.buttons}>
            <Button type="primary" onClick={handleSaveBtnClick}>
              保存区块配置
            </Button>

            <Button
              type="primary"
              className={styles.reset}
              onClick={handleResetBtnClick}
            >
              重置区块配置
            </Button>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomeManagement;
