import Container from "../layout/Container";
import Card from "../common/Card";
import "./About.css";

function About() {
  return (
    <section id="about" className="about-section">
      <Container>
        <h2 className="section-title">Tentang Saya</h2>
        <Card className="about-section__card">
          <p>
            Saya seorang pengembang web yang fokus membangun aplikasi
            full-stack — dari desain antarmuka sampai API dan database di
            belakangnya. Terbiasa bekerja baik secara individu maupun dalam
            tim, dan senang belajar hal baru di ekosistem JavaScript.
          </p>
        </Card>
      </Container>
    </section>
  );
}

export default About;