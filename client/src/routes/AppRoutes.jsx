import { Routes, Route } from "react-router";
import Home from "../pages/Home";
import ProjectDetail from "../pages/ProjectDetail";
import Dashboard from "../pages/admin/Dashboard";
import ProjectForm from "../pages/admin/ProjectForm";
import ProtectedRoute from "./ProtectedRoute";
import ScrollToHash from "./ScrollToHash";
import Login from "../pages/admin/Login";

function AppRoutes() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetail />} />

        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/projects/new"
          element={
            <ProtectedRoute>
              <ProjectForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/projects/:id/edit"
          element={
            <ProtectedRoute>
              <ProjectForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default AppRoutes;