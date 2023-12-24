import { Router, useRoutes } from "@solidjs/router";
import type { Component } from "solid-js";
import Framwork from "./components/framework/framework";
import { routes } from "./router/routes";

const App: Component = () => {
  const Routes = useRoutes(routes);
  return (
    <Router>
      <Framwork>
        <Routes />
      </Framwork>
    </Router>
  );
};

export default App;
