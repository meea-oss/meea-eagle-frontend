import { useSearchParams } from "@@/exports";
import { Button, Flex, Input } from "antd";
import { OTPProps } from "antd/es/input/OTP";
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
    </>
  );
};

export default QueryPage;
