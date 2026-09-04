import { Routes, Route } from "react-router";
import Home from "../pages/Home";
import ProjectDetail from "../pages/ProjectDetail";
import ScrollToHash from "./ScrollToHash";

function AppRoutes() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Routes>
    </>
  );
}

export default AppRoutes;