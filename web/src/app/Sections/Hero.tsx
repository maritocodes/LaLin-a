const Hero = () => {
  return (
    <section className="w-full h-screen relative">
      <video
        className="w-full h-screen object-cover bg-blue-800"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="#" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute top-1/2 left-1/2 gap-6 -translate-y-2/3 text-secondary -translate-x-1/2 flex flex-col items-end">
        <h1 className="font-cassey text-[32rem] h-[34rem] relative">
          <span className="text-[16rem] absolute top-34 -left-26">la</span>
          liña
        </h1>
        {/* <img
          className="h-64 w-auto"
          src="/logotipo_secondary.svg"
          alt="logotipo la liña"
        /> */}
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
