import Container from "../layout/Container";
import Card from "../common/Card";
import "./Skills.css";

const SKILL_GROUPS = [
  { title: "Frontend", items: ["React", "Vite", "JavaScript", "HTML/CSS"] },
  { title: "Backend", items: ["Node.js", "Express.js", "JWT"] },
  { title: "Database", items: ["MongoDB Atlas", "Mongoloquent"] },
  { title: "Tools", items: ["Git", "ImageKit", "Nginx", "PM2"] },
];

function Skills() {
  return (
    <section id="skills" className="skills-section">
      <Container>
        <h2 className="section-title">Skills</h2>
        <div className="skills-section__grid">
          {SKILL_GROUPS.map((group) => (
            <Card key={group.title} className="skills-section__group">
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Skills;