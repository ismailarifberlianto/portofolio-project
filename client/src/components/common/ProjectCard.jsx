import "./ProjectCard.css";

function ProjectCard({ project }) {
  const { title, description, techStack = [], category, thumbnailUrl, _id } = project;

  return (
    // Active on Milestone 6
    <a href={`/project/${_id}`} className="project-card">
      <div className="project-card__thumb">
        {thumbnailUrl ? (
          <img src={thumbnailUrl} alt={title} loading="lazy" />
        ) : (
          <div className="project-card__thumb-placeholder">No Image</div>
        )}
        <span className={`project-card__badge project-card__badge--${category}`}>
          {category === "team" ? "Team" : "Solo"}
        </span>
      </div>
      <div className="project-card__body">
        <h3>{title}</h3>
        <p>{description}</p>
        {techStack.length > 0 && (
          <ul className="project-card__tech">
            {techStack.slice(0, 4).map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        )}
      </div>
    </a>
  );
}

export default ProjectCard;