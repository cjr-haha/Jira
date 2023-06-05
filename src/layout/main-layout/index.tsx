import React from "react";

import Header from "./header";

function MainLayOut({ children = null }: { children: JSX.Element | null }) {
  return (
    <React.Fragment>
      <Header />
      <div style={{ padding: "32px" }}>{children}</div>
    </React.Fragment>
  );
}

export default MainLayOut;
