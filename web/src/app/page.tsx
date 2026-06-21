import Hero from "./Sections/Hero";
import About from "./Sections/About"
import Voces from "./Sections/Voces"
import Highlight from "./Sections/Highlight"
import Contact from "./Sections/Contact"
import Header from "./Components/Header"

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <About />
      <Voces />
      <Highlight day={18} month={7} title="LA VIDA EN TRÁNSITO" />
      <Contact />
    </div>
  );
}
