import type { Component } from "solid-js";
import styles from "./App.module.css";
import { Router, Route, Routes } from "@solidjs/router";
import AIAssistant from "./components/page/AIAssistant";
import Framwork from "./components/framework";

const App: Component = () => {
  return (
    <Framwork>
      <Router>
        <Routes>
          <Route path="/" component={AIAssistant} />
        </Routes>
      </Router>
    </Framwork>
  );
};

export default App;
