import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Container from "../components/layout/Container";
import ExternalLink from "../components/common/ExternalLink";
import { getProjectById } from "../services/projectService";
import "./ProjectDetail.css";

function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let ignore = false;
    setStatus("loading");

    getProjectById(id)
      .then((res) => {
        if (!ignore) {
          setProject(res.data);
          setStatus("success");
        }
      })
      .catch((err) => {
        if (!ignore) {
          setErrorMessage(err.message || "Failed to load this project.");
          setStatus("error");
        }
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  return (
    <>
      <Navbar />
      <main className="project-detail">
        <Container>
          <Link to="/#projects" className="project-detail__back">
            ← Back to Projects
          </Link>

          {status === "loading" && <p>Loading project...</p>}
          {status === "error" && <p>{errorMessage}</p>}

          {status === "success" && project && (
            <article className="project-detail__content">
              <div className="project-detail__header">
                <span
                  className={`project-detail__badge project-detail__badge--${project.category}`}
                >
                  {project.category === "team" ? "Team" : "Solo"}
                </span>
                <h1>{project.title}</h1>
                {project.role && (
                  <p className="project-detail__role">Role: {project.role}</p>
                )}
              </div>

              {project.thumbnailUrl && (
                <img
                  className="project-detail__thumbnail"
                  src={project.thumbnailUrl}
                  alt={project.title}
                />
              )}

              <p className="project-detail__description">{project.description}</p>

              {project.techStack?.length > 0 && (
                <div className="project-detail__section">
                  <h2>Tech Stack</h2>
                  <ul className="project-detail__tech">
                    {project.techStack.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                </div>
              )}

              {project.images?.length > 0 && (
                <div className="project-detail__section">
                  <h2>Screenshots</h2>
                  <div className="project-detail__gallery">
                    {project.images.map((img, i) => (
                      <img
                        key={img.fileId || i}
                        src={img.url}
                        alt={`${project.title} screenshot ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="project-detail__links">
                {project.liveUrl && (
                  <ExternalLink href={project.liveUrl} className="project-detail__link">
                    Live Demo
                  </ExternalLink>
                )}
                {project.repoUrl && (
                  <ExternalLink
                    href={project.repoUrl}
                    className="project-detail__link project-detail__link--secondary"
                  >
                    Source Code
                  </ExternalLink>
                )}
              </div>
            </article>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default ProjectDetail;