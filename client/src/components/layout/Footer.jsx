import "./Footer.css";

const YEAR = new Date().getFullYear();

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p>© {YEAR} astro. Built with React + Express.</p>
        <div className="footer__social">
          <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="mailto:hello@example.com">Email</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;