import React from "react";
import ProjectScreen from "./screen/projrct-screen";
import MainLayOut from "./layout/main-layout";
import { HashRouter as Router, Redirect } from "react-router-dom";
import { Route, Switch } from "react-router";

function AuthenticatedApp() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <MainLayOut>
            <>
              <Route exact path={"/project"}>
                <ProjectScreen />
              </Route>
              <Redirect to={"/project"} />
            </>
          </MainLayOut>
        </Switch>
      </Router>
    </div>
  );
}

export default AuthenticatedApp;
