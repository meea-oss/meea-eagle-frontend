import Logo from "@/components/Logo";
import { useSearchParams } from "@@/exports";
import { Button, Flex, Input, Layout } from "antd";
import { OTPProps } from "antd/es/input/OTP";
import { Header } from "antd/es/layout/layout";
import React from "react";
import "../Common/font.less";
import "./QueryPage.less";

const QueryPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("t");
  console.log(code);
  const haveQueryCode = code != null && code !== "";

  const onChange: OTPProps["onChange"] = (text) => {
    console.log("area:", text);
  };

  const areaProps: OTPProps = {
    onChange,
  };

  const codePropsOnChange: OTPProps["onChange"] = (text) => {
    console.log("code:", text);
  };

  const codeProps: OTPProps = {
    onChange: codePropsOnChange,
  };

  //绘制徽章
  return (
    <>
      <Layout style={{ background: "#ffffff" }}>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "transparent",
            backgroundImage: "url(/img.png)",
            backgroundPosition: "center center",
          }}
        >
          <Logo />
        </Header>
        <div>
          {haveQueryCode ? (
            <div>{code}</div>
          ) : (
            <div
              style={{
                textAlign: "center",
                alignContent: "center",
                height: "90vh",
              }}
            >
              <div className={"mono"}>
                <Flex
                  justify={"center"}
                  align={"center"}
                  gap={40}
                  wrap={"wrap"}
                >
                  <Input.OTP
                    length={2}
                    formatter={(str) => str.toUpperCase()}
                    {...areaProps}
                  />
                  <Input.OTP
                    length={8}
                    formatter={(str) => str.toUpperCase()}
                    {...codeProps}
                  />
                </Flex>
                <div style={{ marginTop: "20px" }}>
                  <Button
                    type="primary"
                    size="large"
                    className={"query-button"}
                  >
                    查询
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default QueryPage;
