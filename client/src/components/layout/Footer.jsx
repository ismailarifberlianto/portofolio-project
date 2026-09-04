import "./Footer.css";

const YEAR = new Date().getFullYear();

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p>© {YEAR} ismail.dev | Built with React + Express</p>
        <div className="footer__social">
          <a href="https://github.com/ismailarifberlianto" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/ismailarifberlianto" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="mailto:ismail.aberlianto@gmail.com">Email</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;