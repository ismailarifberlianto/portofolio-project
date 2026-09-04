import Container from "../layout/Container";
import Card from "../common/Card";
import "./About.css";

function About() {
  return (
    <section id="about" className="about-section">
      <Container>
        <h2 className="section-title">About Me</h2>
        <Card className="about-section__card">
          <p>
            I'm a web developer focused on building full-stack applications —
            from the user interface all the way to the API and database
            behind it. Comfortable working both solo and in a team, and
            always excited to learn new things in the JavaScript ecosystem.
          </p>
        </Card>
      </Container>
    </section>
  );
}

export default About;