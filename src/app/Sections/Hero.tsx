import EditableMedia from "../Components/admin/EditableMedia";

// 1. Añadimos = {} para que, si no recibe nada, sea un objeto vacío y no 'undefined'
const Hero = ({ mediaData = {} }: { mediaData?: any }) => {
  return (
    <section className="w-full h-screen relative">
      <EditableMedia
        uploadType="hero"
        // 2. Añadimos la interrogación (?) para evitar errores
        initialSrc={mediaData?.hero_src || "/default-video.mp4"}
        initialPosX={mediaData?.hero_posX}
        initialPosY={mediaData?.hero_posY}
        initialZoom={mediaData?.hero_zoom}
        initialBrightness={mediaData?.hero_brightness}
        className="w-full h-screen"
      />

      <div className="absolute top-1/2 left-1/2 -translate-y-2/3 -translate-x-1/2 pointer-events-none z-10 text-secondary flex flex-col items-end gap-6">
        <h1 className="font-cassey text-[32rem] h-[34rem] relative">
          <span className="text-[16rem] absolute top-34 -left-26">la</span>
          liña
        </h1>

        <img
          className="h-20 w-auto -translate-x-1"
          src="/voz_nomada.svg"
          alt="La voz nómada de canarias"
        />
      </div>
    </section>
  );
};

export default Hero;