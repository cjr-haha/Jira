import React from "react";
import styled from "@emotion/styled";
import TableList from "./table-list";
import { useGetProjects, useProjectModal, useProjectUrlParams } from "./hook";
import SearchList from "./search-list";
import { useDebounce } from "../../utils/hooks";
import ProjectModel from "./project-model";

const WrappedProjrctScreen = styled.div`
  & > *:not(:last-child) {
    margin-bottom: 20px;
  }

  .project-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .ctreate-projectBtn {
      color: #0052cc;
    }
  }
`;

function ProjectScreen() {
  const [params, setUrlParams] = useProjectUrlParams();
  const { isLoading, data, isFailed, retry } = useGetProjects(
    useDebounce(params, 100)
  );
  const { openCreateModel } = useProjectModal();

  return (
    <WrappedProjrctScreen>
      <div className={"project-header"}>
        <h1 style={{ marginBottom: 0 }}>项目列表</h1>
        <div className={"ctreate-projectBtn"} onClick={openCreateModel}>
          创建项目
        </div>
      </div>

      <SearchList params={params} setUrlParams={setUrlParams} />
      <TableList
        data={data || []}
        isFailed={isFailed}
        isLoading={isLoading}
        retry={retry}
      />
      <ProjectModel retry={retry as any} />
    </WrappedProjrctScreen>
  );
}

export default ProjectScreen;
