import { Col, Form, Input, Row, Select } from "antd";
import React from "react";
import styled from "@emotion/styled";
import { Project } from "../../type/project";
interface Props {
  params: any;
  setUrlParams: (params: any) => void;
}

const WrapperForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 0px;
  }
`;
const SearchList = ({ params, setUrlParams }: Props) => {
  return (
    <WrapperForm>
      <Row gutter={8}>
        <Col span={4}>
          <Form.Item name="project-name">
            <Input
              placeholder={"请输入项目名称"}
              value={params.name || ""}
              allowClear
              onChange={(event) => {
                setUrlParams({ name: event.target.value });
              }}
            />
          </Form.Item>
        </Col>
        <Col span={2}>
          <Form.Item name={"personId"}>
            <Select
              allowClear
              value={params.personId || ""}
              onChange={(value) => {
                setUrlParams({ personId: value });
              }}
            >
              {["1", "2"]?.map((item) => {
                return (
                  <Select.Option value={item} key={item}>
                    {item}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </WrapperForm>
  );
};
export default SearchList;
