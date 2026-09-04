import Container from "../layout/Container";
import Button from "../common/Button";
import "./Hero.css";

function Hero() {
  return (
    <section id="top" className="hero-section">
      <Container className="hero-section__inner">
        <p className="hero-section__eyebrow">Halo, saya</p>
        <h1 className="hero-section__name">Astro</h1>
        <p className="hero-section__role">Full-Stack Web Developer</p>
        <p className="hero-section__tagline">
          Membangun aplikasi web yang rapi, cepat, dan enak dipakai — dari
          frontend sampai backend.
        </p>
        <div className="hero-section__cta">
          <Button as="a" href="#projects" variant="primary">
            Lihat Projek
          </Button>
          <Button as="a" href="#contact" variant="secondary">
            Hubungi Saya
          </Button>
        </div>
      </Container>
    </section>
  );
}

export default Hero;