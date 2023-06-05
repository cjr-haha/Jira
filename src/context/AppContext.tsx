import React, { ReactNode } from "react";
import Auth from "./auth";

function AppContext({ children }: { children: ReactNode }) {
  return <Auth>{children}</Auth>;
}

export default AppContext;
