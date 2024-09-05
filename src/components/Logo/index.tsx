import { Link } from "@@/exports";
import { Flex } from "antd";
import React from "react";

const Logo: React.FC = () => {
  return (
    <>
      <Link to="/">
        <div style={{ height: "100%" }}>
          <Flex
            justify={"center"}
            align={"center"}
            gap={"middle"}
            wrap={"wrap"}
          >
            <img
              src={"/logo.svg"}
              alt="logo"
              style={{ height: "64px" }}
            />

            <div
              style={{
                display: "flex",
                fontFamily: "mbhh",
                fontWeight: "normal",
                height: "100%",
                alignItems: "center",
                color: "black",
                textAlign: "left",
                fontSize: "30px",
              }}
            >
              移动电子眼联盟
            </div>
          </Flex>
        </div>
      </Link>
    </>
  );
};

export default Logo;
