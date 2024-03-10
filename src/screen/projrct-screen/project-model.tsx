import React, { useEffect, useMemo } from "react";
import { Button, Drawer, Form, Input, Select, Spin, Typography } from "antd";
import styled from "@emotion/styled";
import { useModalSubmit, useProjectCreate, useProjectModal } from "./hook";
import { useForm } from "antd/es/form/Form";
import { useProjectUsers } from "../../http";
import { IdSelect, IdSelectProps } from "../../components/id-selecte";
import { useMinLayOutContext } from "../../layout/main-layout/main-layout-context";

const Wrapper = styled(Drawer)`
  .ant-drawer-content-wrapper {
    width: 100% !important;
  }

  .ant-drawer-header-title {
    display: flex;
    justify-content: right;
  }

  .ant-drawer-body {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    padding-top: 100px;
  }
`;

interface UserSelectProps {
  [propName: string]: any;
}
const UserSelect = (props: UserSelectProps) => {
  const { data, onChange, value } = props;
  return (
    <IdSelect
      value={value}
      onChange={onChange}
      data={data}
      defaultValue={"请选择负责人"}
    />
  );
};
//这个model在很多地方都使用 不如最初就加载出来
// 显示与隐藏就他自己决定，还是用这个页面 我们在这里使用url来管理 显 隐
//projectCreated=true 就编辑项目 编辑用编辑的接口
//editingProjectId = 项目id  修改项目就用项目的接口  修改需要初始化数据
//成功以后 由于这个组件是不卸载的 只是不显示  所以要控制model消失 并且当前model的数据要重置，而且上一个页面的数据还需要重新请求

const ProjectModel = ({ retry }: { retry: () => Promise<any> }) => {
  const [form] = useForm();
  const {
    isVisitable,
    isLoading: fetchEditLoading,
    initialData,
    close,
    editingProjectId,
    initialError,
    getEditingDetails,
  } = useProjectModal();
  const { userData: userData_context } = useMinLayOutContext();

  const {
    fetchRun,
    isLoading: submitLoading,
    error: submitError,
  } = useModalSubmit(initialData as any);

  const onFinish = (values: any) => {
    fetchRun({ ...(initialData || {}), ...values }).then((data) => {
      if (data.message) return;
      close();
      retry();
    });
  };
  const error = initialError || submitError;

  useEffect(() => {
    editingProjectId && getEditingDetails(Number(editingProjectId));
  }, [editingProjectId]);

  useEffect(() => {
    if (editingProjectId && initialData) {
      form.setFieldsValue(initialData as any);
      return;
    }
    form.resetFields();
  }, [initialData, form, editingProjectId]);

  const userData = useMemo(() => {
    if (!userData_context) return null;
    return userData_context.map((item) => {
      return {
        ...item,
        key: item.ownerId,
        value: item.name,
      };
    });
  }, [userData_context]);

  return (
    <Wrapper open={isVisitable} onClose={close}>
      {fetchEditLoading ? (
        <Spin size={"large"} />
      ) : (
        <>
          {error && (
            <Typography.Text type={"danger"} children={error.message} />
          )}

          <Form
            layout={"vertical"}
            style={{ width: "300px" }}
            onFinish={onFinish}
            form={form}
            disabled={fetchEditLoading || submitLoading}
          >
            <Form.Item
              label={"名称"}
              name={"name"}
              rules={[
                {
                  required: true,
                  message: "请输入项目名称",
                },
              ]}
            >
              <Input placeholder={"请输入项目名称"} />
            </Form.Item>
            <Form.Item
              label={"部门"}
              name={"organization"}
              rules={[
                {
                  required: true,
                  message: "请输入部门名",
                },
              ]}
            >
              <Input placeholder={"请输入部门名"} />
            </Form.Item>
            <Form.Item label={"负责人"} name={"ownerId"}>
              <UserSelect data={userData} />
            </Form.Item>
            <Form.Item style={{ textAlign: "right" }}>
              <Button
                type={"primary"}
                htmlType={"submit"}
                loading={submitLoading}
                disabled={!!initialError}
              >
                提交
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </Wrapper>
  );
};
export default ProjectModel;
