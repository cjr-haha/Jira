import React from "react";
import styled from "@emotion/styled";
import TableList from "./table-list";
import { useGetProjects, useProjectUrlParams } from "./hook";
import SearchList from "./search-list";
import { useDebounce } from "../../utils/hooks";

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
  const { isLoading, data, isFailed } = useGetProjects(
    useDebounce(params, 100)
  );

  return (
    <WrappedProjrctScreen>
      <div className={"project-header"}>
        <h1 style={{ marginBottom: 0 }}>项目列表</h1>
        <div className={"ctreate-projectBtn"} onClick={() => {}}>
          创建项目
        </div>
      </div>

      <SearchList params={params} setUrlParams={setUrlParams} />
      <TableList data={data || []} isFailed={isFailed} isLoading={isLoading} />
    </WrappedProjrctScreen>
  );
}

export default ProjectScreen;
