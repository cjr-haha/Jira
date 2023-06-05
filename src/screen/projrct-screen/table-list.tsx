import React from "react";
import moment from "moment";
import { Button, Dropdown, Rate, Table, Tooltip } from "antd";
import { ColumnsType } from "antd/lib/table/interface";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import { Project } from "../../type/project";

interface Props {
  isLoading: boolean;
  isFailed: boolean;
  data: Project[];
}

const TableList = ({ isLoading, isFailed, data }: Props) => {
  // const dataSource:Project[] = [
  //   {
  //     "personId": 8,
  //     "organization": "快递组",
  //     "created": 1604989757139,
  //     "ownerId": 117799703,
  //     "name": "快递管理",
  //     "id": 2,
  //     "pin": true
  //   }
  // ];

  const columns: ColumnsType<Project> = [
    {
      title: (
        <Tooltip placement="topLeft" title={"收藏"}>
          <Rate defaultValue={1} count={1} disabled={true} />,
        </Tooltip>
      ),
      dataIndex: "pin",
      key: "pin",
      align: "center",
      render: (_, record) => {
        return <Rate value={_ ? 1 : 0} count={1} />;
      },
    },
    {
      title: "名称",
      dataIndex: "name",
      align: "center",
      key: "name",
      render: (_, record) => {
        return <a>{_}</a>;
      },
    },
    {
      title: "部门",
      dataIndex: "organization",
      align: "center",
      key: "organization",
    },
    {
      title: "负责人",
      dataIndex: "ownerId",
      key: "ownerId",
      align: "center",
      render: (_, record) => {
        return <div>{_}</div>;
      },
    },
    {
      title: "创建时间",
      dataIndex: "created",
      key: "created",
      align: "center",
      render: (_, record) => {
        return <span>{moment(_ || "").format("YYYY-MM-DD")}</span>;
      },
    },
    {
      title: "",
      key: "handle",
      align: "center",
      render: (_, record) => {
        const items: ItemType[] = [
          {
            key: "edit",
            label: <span>编辑</span>,
          },
          {
            key: "delete",
            label: <span>删除</span>,
          },
        ];
        return (
          <Dropdown menu={{ items }}>
            <span>...</span>
          </Dropdown>
        );
      },
    },
  ];

  return <Table dataSource={data} loading={isLoading} columns={columns} />;
};
export default TableList;
