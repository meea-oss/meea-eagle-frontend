import Info from "@/pages/Info";
import { login } from "@/services/ant-design-pro/api";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginForm, ProFormText } from "@ant-design/pro-components";
import { Helmet, history, useModel } from "@umijs/max";
import { Alert, Col, Flex, message, Row } from "antd";
import { createStyles } from "antd-style";
import React, { useState } from "react";
import { flushSync } from "react-dom";
import Settings from "../../../../config/defaultSettings";
import "../../Common/font.less";

const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: "8px",
      color: "rgba(0, 0, 0, 0.2)",
      fontSize: "24px",
      verticalAlign: "middle",
      cursor: "pointer",
      transition: "color 0.3s",
      "&:hover": {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: "42px",
      position: "fixed",
      right: 16,
      borderRadius: token.borderRadius,
      ":hover": {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      overflow: "auto",
      backgroundImage: "url(/img.png)",
      backgroundSize: "100% 100%",
    },
  };
});

const Lang = () => {
  const { styles } = useStyles();
  return;
};
const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};
const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>("account");
  const { initialState, setInitialState } = useModel("@@initialState");
  const { styles } = useStyles();
  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };
  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const msg = await login({ ...values, type });
      if (msg.status === "ok") {
        const defaultLoginSuccessMessage = "登录成功！";
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get("redirect") || "/");
        return;
      }
      console.log(msg);
      // 如果失败去设置用户错误信息
      setUserLoginState(msg);
    } catch (error) {
      const defaultLoginFailureMessage = "登录失败，请重试！";
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };
  const { status, type: loginType } = userLoginState;
  return (
    <div className={styles.container}>

      <Helmet>
        <title>
          {"登录"}- {Settings.title}
        </title>
        <meta property="og:title" content="移动电子眼联盟"/>
        <meta property="og:description" content="移动电子眼联盟会员平台"/>
        <meta property="og:site_name" content="移动电子眼联盟"/>
        <meta name="author" content="meea.top"/>
        <meta name="keywords" content="移动, 电子眼, 联盟, 移动电子眼联盟, 电子眼联盟, 移动电子眼, meea, meea.top,MEEA,MEEA.top,MEEA.TOP"/>
        <meta name="description" content="移动电子眼联盟会员平台"/>
        <meta name="robots" content="index,follow"/>
        <meta name="baidu-site-verification" content="codeva-anWMKZlMCy"/>
      </Helmet>
      <div
        style={{
          flex: "1",
          padding: "32px 0",
          textAlign: "center",
        }}
      >
        <Row style={{height: "90vh", display: "flex", alignItems: "center"}}>
          <Col
            xs={{flex: "100%"}}
            sm={{flex: "100%"}}
            md={{flex: "50%"}}
            lg={{flex: "50%"}}
            xl={{flex: "50%"}}
          >
            <LoginForm
              contentStyle={{
                minWidth: 280,
                maxWidth: "75rem",
                marginTop: "8rem",
                maxHeight: "90vh",
              }}
              title={
                <div style={{marginTop: "5rem"}}>
                  <Flex
                    justify={"center"}
                    align={"center"}
                    gap={"middle"}
                    wrap={"wrap"}
                  >
                    <div>
                      <img alt="logo" src="/logo.svg" width="100vw"/>
                    </div>
                    <div
                      style={{
                        fontFamily: "mbhh",
                        fontSize: "3rem",
                        fontWeight: "normal",
                      }}
                    >
                      移动电子眼联盟
                    </div>
                  </Flex>
                </div>
              }
              initialValues={{
                autoLogin: true,
              }}
              onFinish={async (values) => {
                await handleSubmit(values as API.LoginParams);
              }}
            >
              {status === "error" && loginType === "account" && (
                <LoginMessage content={"错误的用户名和密码"}/>
              )}
              <>
                <ProFormText
                  name="username"
                  fieldProps={{
                    size: "large",
                    prefix: <UserOutlined/>,
                  }}
                  placeholder={"请输入用户名"}
                  rules={[
                    {
                      required: true,
                      message: "用户名是必填项！",
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: "large",
                    prefix: <LockOutlined/>,
                  }}
                  placeholder={"请输入密码"}
                  rules={[
                    {
                      required: true,
                      message: "密码是必填项！",
                    },
                  ]}
                />
              </>
            </LoginForm>
          </Col>
          <Col
            xs={{flex: "100%"}}
            sm={{flex: "100%"}}
            md={{flex: "50%"}}
            lg={{flex: "50%"}}
            xl={{flex: "50%"}}
          >
            <Info/>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default Login;
