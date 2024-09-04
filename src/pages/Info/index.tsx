import { SearchOutlined } from "@ant-design/icons";
import { history } from "@umijs/max";
import { Button } from "antd";
import React from "react";

const Info: React.FC = () => {
  const goQueryPage = () => {
    history.push("/alliance/query");
  };
  return (
    <>
      <h1>暂未开放注册!</h1>
      <Button
        type="primary"
        icon={<SearchOutlined />}
        size="large"
        onClick={goQueryPage}
      >
        联盟编号查询
      </Button>
    </>
  );
};
export default Info;
