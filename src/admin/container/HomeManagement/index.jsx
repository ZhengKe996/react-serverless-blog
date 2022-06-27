import { useState } from "react";
import { Layout, Menu, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import styles from "./style.module.scss";
import AreaList from "./component/AreaList";
import { parseJsonByString } from "../../../utils";
import { getChangeSchemaAction } from "./store/action";

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
  const schema = useSelector((state) => state.homeManagement.schema);
  const changeSchema = (schema) => {
    dispatch(getChangeSchemaAction(schema));
  };

  return { changeSchema, schema };
};

const HomeManagement = () => {
  const { collapsed, toggleCollapsed } = useCollapsed();

  const { changeSchema, schema } = useStore();
  const handleHomePageRedirect = () => {
    window.location.href = "/";
  };

  const handleSaveBtnClick = () => {
    window.localStorage.schema = JSON.stringify(schema);
  };

  const handleResetBtnClick = () => {
    changeSchema(parseJsonByString(window.localStorage.schema, {}));
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
          <AreaList children={schema?.children || []} />

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
