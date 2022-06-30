import { Guard } from "@authing/react-ui-components";
import React from "react";
import { setLoginData } from "../../../utils";
import "@authing/react-ui-components/lib/index.min.css";

const Login = () => {
  // 替换你的 AppId
  const appId = "62bc6937492a7916dbb6f7bf";
  const config = {
    contentCss:
      ".g2-view-header > img { display: none; } .g2-view-container { margin:0 auto; padding:100px 0; } .authing-g2-render-module { background:#f5f5f5; height:100vh;} .g2-tips-line { display: none; }",
  };
  const onLogin = (userInfo) => {
    setLoginData({
      token: userInfo.token,
      tokenExpiredAt: userInfo.tokenExpiredAt,
      photo: userInfo.photo,
      username: userInfo.username,
    });
    window.location.reload();
  };

  return <Guard appId={appId} onLogin={onLogin} config={config} />;
};

export default Login;
