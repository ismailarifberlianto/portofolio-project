import { useEffect, useState } from "react";
import Container from "../layout/Container";
import ProjectCard from "../common/ProjectCard";
import { getProjects } from "../../services/projectService";
import "./Projects.css";

const FILTERS = [
  { value: "", label: "All" },
  { value: "solo", label: "Solo" },
  { value: "team", label: "Team" },
];

function Projects() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("");
  const [status, setStatus] = useState("loading"); // loading | success | error

  useEffect(() => {
    let ignore = false;

    setStatus("loading");
    getProjects(filter ? { category: filter } : {})
      .then((res) => {
        if (!ignore) {
          setProjects(res.data || []);
          setStatus("success");
        }
      })
      .catch(() => {
        if (!ignore) setStatus("error");
      });

    return () => {
      ignore = true;
    };
  }, [filter]);

  return (
    <section id="projects" className="projects-section">
      <Container>
        <h2 className="section-title">Projects</h2>

        <div className="projects-section__filters">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              className={`filter-chip ${filter === f.value ? "is-active" : ""}`}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {status === "loading" && <p className="projects-section__hint">Loading projects...</p>}
        {status === "error" && (
          <p className="projects-section__hint">
            Failed to load projects. Make sure the backend is running at{" "}
            {import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api"}.
          </p>
        )}
        {status === "success" && projects.length === 0 && (
          <p className="projects-section__hint">No projects in this category yet.</p>
        )}

        {status === "success" && projects.length > 0 && (
          <div className="projects-section__grid">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

export default Projects;