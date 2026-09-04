import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import { getProjects, deleteProject } from "../../services/projectService";
import "./Dashboard.css";

function Dashboard() {
  const { logout } = useAuth();
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  function loadProjects() {
    setStatus("loading");
    getProjects()
      .then((res) => {
        setProjects(res.data || []);
        setStatus("success");
      })
      .catch((err) => {
        setError(err.message || "Failed to load projects");
        setStatus("error");
      });
  }

  useEffect(() => {
    loadProjects();
  }, []);

  async function handleDelete(id, title) {
    if (!window.confirm(`Delete project "${title}"? This can't be undone.`)) return;

    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.message || "Failed to delete project");
    }
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-dashboard__header">
        <h1>Projects</h1>
        <div className="admin-dashboard__actions">
          <Link to="/admin/projects/new" className="admin-dashboard__add-btn">
            + New Project
          </Link>
          <button type="button" onClick={logout} className="admin-dashboard__logout-btn">
            Logout
          </button>
        </div>
      </header>

      {status === "loading" && <p>Loading projects...</p>}
      {status === "error" && <p className="admin-dashboard__error">{error}</p>}

      {status === "success" && projects.length === 0 && (
        <p>No projects yet. Click "New Project" to add one.</p>
      )}

      {status === "success" && projects.length > 0 && (
        <table className="admin-dashboard__table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Tech Stack</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id}>
                <td>{project.title}</td>
                <td>
                  <span
                    className={`admin-dashboard__badge admin-dashboard__badge--${project.category}`}
                  >
                    {project.category === "team" ? "Team" : "Solo"}
                  </span>
                </td>
                <td>{(project.techStack || []).join(", ")}</td>
                <td className="admin-dashboard__row-actions">
                  <Link to={`/admin/projects/${project._id}/edit`}>Edit</Link>
                  <button type="button" onClick={() => handleDelete(project._id, project.title)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;