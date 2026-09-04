import { Link } from "react-router";
import Container from "../layout/Container";
import Button from "../common/Button";
import "./Hero.css";

function Hero() {
  return (
    <section id="top" className="hero-section">
      <Container className="hero-section__inner">
        <p className="hero-section__eyebrow">Hi, I'm</p>
        <h1 className="hero-section__name">Astro</h1>
        <p className="hero-section__role">Full-Stack Web Developer</p>
        <p className="hero-section__tagline">
          I build clean, fast, and user-friendly web applications — from the
          frontend all the way down to the backend.
        </p>
        <div className="hero-section__cta">
          <Button as={Link} to="/#projects" variant="primary">
            View Projects
          </Button>
          <Button as={Link} to="/#contact" variant="secondary">
            Contact Me
          </Button>
        </div>
      </Container>
    </section>
  );
}

export default Hero;