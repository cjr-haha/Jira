import React, { useCallback } from "react";
import moment from "moment";
import { Button, Dropdown, Rate, Table, Tooltip } from "antd";
import { ColumnsType } from "antd/lib/table/interface";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import { Project } from "../../type/project";
import { useProjectModal } from "./hook";
import { useCollectProjects, useDeleteAProject } from "../../http";
import { useMinLayOutContext } from "../../layout/main-layout/main-layout-context";

interface Props {
  isLoading: boolean;
  isFailed: boolean;
  data: Project[];
  retry: () => void;
}

const TableList = ({ isLoading, isFailed, data, retry }: Props) => {
  const { openEditModel } = useProjectModal();

  const {
    isSuccess: pinSuccess,
    isFailed: pinFail,
    run: pinRun,
  } = useCollectProjects();
  const { run: deleteProject } = useDeleteAProject();

  const fetchPin = (pin: boolean, record: any) =>
    pinRun({ id: record.id, pin }).then(retry);
  const fetchDeleteProject = (id: number) => deleteProject(id).then(retry);

  const { userData } = useMinLayOutContext();
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
        return (
          <Rate
            value={_ ? 1 : 0}
            count={1}
            onChange={(id) => fetchPin(!!id, record)}
          />
        );
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
        const user = (() => {
          let user = "";
          if (userData) {
            const userData_c = [...userData];
            while (userData_c.length > 0) {
              if (userData_c[0].ownerId === _) {
                user = userData_c[0].name;
                break;
              }
              userData_c.shift();
            }
          }
          return user;
        })();
        return <div>{user}</div>;
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
        const { id } = record;
        const items: ItemType[] = [
          {
            key: "edit",
            label: <span onClick={() => openEditModel(id)}>编辑</span>,
          },
          {
            key: "delete",
            label: (
              <span onClick={() => fetchDeleteProject(record.id)}>删除</span>
            ),
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

  return (
    <Table
      dataSource={data}
      loading={isLoading}
      columns={columns}
      rowKey={(rocord) => rocord.id}
    />
  );
};
export default TableList;
