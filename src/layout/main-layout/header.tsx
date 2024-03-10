import React, { useEffect, useMemo } from "react";
import styled from "@emotion/styled";
import { Col, Dropdown, Row } from "antd";
import SoftWareLogo from "./soft-logo";
import { useFetchProjectLists, useProjectUsers } from "../../http";
import useAsync from "../../http/useAsync";
import { Project } from "../../type/project";
import { useMinLayOutContext } from "./main-layout-context";

const WrappedMainLayOut = styled.div`
  padding: 16px 32px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px;

  .leftBox {
    display: flex;
    align-items: center;

    & > * {
      margin-right: 20px;
    }
  }

  .rightBox {
    display: flex;
    justify-content: right;

    .ant-dropdown-trigger {
      text-align: right;
      color: #0052cc;
    }
  }
`;
const WrappedDropDown = styled.div`
  &:not(:last-child) {
    margin-bottom: 10px;
  }
  min-width: 150px;
  .dropDown-header {
    color: gray;
  }
  .dropDown-content-list {
    li {
      text-indent: 2em;
      line-height: 1.7;
    }
  }
`;

const Header = () => {
  const { userData, userRun, listData, listRun } = useMinLayOutContext();
  const pinDate = useMemo(() => listData?.filter((item) => item.pin), [
    listData,
  ]);
  const dropDown = {
    projectDropDown: [
      {
        label: (
          <WrappedDropDown>
            <div className={"dropDown-header"}>收藏项目</div>
            <ul className={"dropDown-content-list"}>
              {pinDate?.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          </WrappedDropDown>
        ),
        key: "projectDropDown1",
      },
      {
        label: (
          <WrappedDropDown>
            <div className={"dropDown-header"} style={{ color: "#0052cc" }}>
              创建项目
            </div>
          </WrappedDropDown>
        ),
        key: "projectDropDown2",
      },
    ],
    companyDropDown: [
      {
        label: (
          <WrappedDropDown>
            <div className={"dropDown-header"}>组员列表</div>
            <ul className={"dropDown-content-list"}>
              {userData?.map((item, index) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          </WrappedDropDown>
        ),
        key: "companyDropDown1",
      },
    ],
    selfDropDown: [
      {
        label: (
          <div className={"logOut"} style={{ color: "#0052cc" }}>
            登出
          </div>
        ),
        key: "selfDropDown1",
      },
    ],
  };

  return (
    <WrappedMainLayOut>
      <Row>
        <Col span={18} className={"leftBox"}>
          <div className={"logo"}>
            <SoftWareLogo />
          </div>
          <div className={"projects"}>
            <Dropdown
              menu={{ items: dropDown["projectDropDown"] }}
              placement={"bottom"}
            >
              <div> 项目</div>
            </Dropdown>
          </div>
          <div className={"companys"}>
            <Dropdown
              menu={{ items: dropDown["companyDropDown"] }}
              placement={"bottom"}
            >
              <div> 组员</div>
            </Dropdown>
          </div>
        </Col>
        <Col span={6} className={"rightBox"}>
          <div className={"self"}>
            <Dropdown
              menu={{ items: dropDown["selfDropDown"] }}
              placement={"bottom"}
            >
              <div>Hi,jack</div>
            </Dropdown>
          </div>
        </Col>
      </Row>
    </WrappedMainLayOut>
  );
};

export default Header;
