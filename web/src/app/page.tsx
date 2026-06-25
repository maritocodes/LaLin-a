import Hero from "./Sections/Hero";
import About from "./Sections/About"
import Voces from "./Sections/Voces"
import Highlight from "./Sections/Highlight"
import Contact from "./Sections/Contact"
import Header from "./Components/Header"
import { getMedia } from "@/lib/media";
import ExitAdminButton from "./Components/admin/ExitAdminButton";

export default async function Home() {
  const media = await getMedia()

  return (
    <div>
      <Header />
      <Hero mediaData={media} />
      <About />
      <Voces mediaData={media} />
      <Highlight mediaData={media} />
      <Contact />

      <ExitAdminButton />
    </div>
  );
}
