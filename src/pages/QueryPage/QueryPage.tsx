import Logo from "@/components/Logo";
import {useSearchParams} from "@@/exports";
import {Button, Card, Flex, Input, Layout} from "antd";
import {OTPProps} from "antd/es/input/OTP";
import {Header} from "antd/es/layout/layout";
import React from "react";
import "../Common/font.less";
import "./QueryPage.less";

import {buildBadge} from "@/util/badgeUtil"
import Meta from "antd/es/card/Meta";

function drawQuery(areaProps: OTPProps, codeProps: OTPProps) {
  return (
    <div>
      <div className={"mono"}>
        <Flex justify={"center"} align={"center"} gap={40} wrap={"wrap"}>
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
        <div style={{marginTop: "20px"}}>
          <Button type="primary" size="large" className={"query-button"}>
            查询
          </Button>
        </div>
      </div>
    </div>
  );
}

const QueryPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("t");
  const qa = searchParams.get("a");
  console.log(code);
  const haveQueryCode = code != null && code !== "" && qa != null && qa !== "";

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
      <Layout style={{background: "#ffffff"}}>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "transparent",
            backgroundImage: "url(/img.png)",
            backgroundPosition: "center center",
          }}
        >
          <Logo/>
        </Header>
        <div style={{
          alignContent: "center",
          height: "90vh",
        }}>
          {haveQueryCode ? (
            <>

              <div style={{textAlign: "center", display: "flex", alignItems: "center"}}>
                <Card
                  hoverable
                  style={{width: 256, margin: "0 auto"}}
                  cover={<div style={{width: "100%"}} dangerouslySetInnerHTML={{__html: buildBadge(code, qa)}}/>}
                >
                  <Meta style={{fontFamily: "mononlb"}} title={"联盟编号:\t" + code}/>
                </Card>

              </div>
              <div style={{marginTop: "10px", justifyContent: "center",textAlign: "center"}}>
                <div style={{maxWidth: "50%"}}>
                  <Flex wrap gap="small" justify={"center"}>
                    <Card title="邮箱" bordered={true} style={{width: 256}}>
                      support@meea.top
                    </Card>
                    <Card title="区域" bordered={true} style={{width: 256}}>
                      {qa + "\t内蒙古"}
                    </Card>
                    <Card title="加入时间" bordered={true} style={{width: 256}}>
                      2019-09-07
                    </Card>
                    <Card title="申请次数" bordered={true} style={{width: 256}}>
                      15
                    </Card>

                  </Flex>
                </div>

              </div>
            </>
          ) : (
            drawQuery(areaProps, codeProps)
          )}
        </div>
      </Layout>
    </>
  );
};

export default QueryPage;
