import React from "react";

import Header from "./header";
import MainLayOutProvider from "./main-layout-context";

function MainLayOut({ children = null }: { children: JSX.Element | null }) {
  return (
    <MainLayOutProvider>
      <React.Fragment>
        <Header />
        <div style={{ padding: "32px" }}>{children}</div>
      </React.Fragment>
    </MainLayOutProvider>
  );
}

export default MainLayOut;
