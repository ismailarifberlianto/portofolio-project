import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import About from "../components/sections/About";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import Hero from "../components/sections/hero";

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
      </main>
      <Footer />
    </>
  );
}

export default Home;