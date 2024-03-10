import { Col, Form, Input, Row, Select } from "antd";
import React, { useMemo } from "react";
import styled from "@emotion/styled";
import { Project, TeamUsers } from "../../type/project";
import { IdSelect } from "../../components/id-selecte";
import { useMinLayOutContext } from "../../layout/main-layout/main-layout-context";
interface SearchList_Props {
  params: any;
  setUrlParams: (params: any) => void;
}

const WrapperForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 0px;
  }
`;
interface SelectHeader_Props {
  list: TeamUsers[] | null;
  defaultValue?: string;
  onChange: (value: number) => any;
  [propName: string]: any;
}
const SelectHeader = ({
  list,
  onChange,
  value,
  ...otherProps
}: SelectHeader_Props) => {
  const data = useMemo(() => {
    if (!list) return null;
    return list.map((item) => {
      return {
        ...item,
        key: item.ownerId,
        value: item.name,
      };
    });
  }, [list]);

  return (
    <IdSelect
      data={data}
      defaultValue="负责人"
      onChange={onChange}
      value={value}
      {...otherProps}
    />
  );
};
const SearchList = ({ params, setUrlParams }: SearchList_Props) => {
  const { userData } = useMinLayOutContext();
  const onChange = (value: number) => setUrlParams({ personId: value });

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
            <SelectHeader
              allowClear
              value={params.personId || ""}
              onChange={onChange}
              list={userData}
            />
          </Form.Item>
        </Col>
      </Row>
    </WrapperForm>
  );
};
export default SearchList;
