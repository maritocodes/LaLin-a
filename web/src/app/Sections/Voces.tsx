const Voces = () => {
  return (
    <section id="voces" className="py-8 mb-20 gap-8 flex flex-col items-center">
      <div className="w-4/9 h-[5px] bg-gray-300"></div>

      <h3 className="font-courier-prime font-bold text-4xl">VOCES</h3>

      <div className="inline-flex gap-8 h-130 text-white font-courier-prime">
        <div className="translate-y-28 w-80 h-92 pr-8 bg-voces space-y-2 pt-4">
          <p className="text-right">psicóloga</p>
          <img
            className="h-24 w-full object-cover object-[0px_-140px]"
            src="/gin_xmas.jfif"
            alt="Marta"
          />
          <p className="text-4xl px-4">Marta</p>
        </div>
        <div className="translate-y-12 w-80 h-92 bg-voces pl-8 space-y-2 pt-32">
          <p className="text-4xl px-4 text-right ">Pedro</p>
          <img
            className="h-24 w-full object-cover object-[0px_-140px]"
            src="/gin_xmas.jfif"
            alt="Pedro"
          />
          <p className="text-left">biólogo marino</p>
        </div>
        <div className="self-end w-80 h-92 bg-voces pr-8 space-y-2 pt-40">
          <p className="text-right">periodista</p>
          <img
            className="h-24 w-full object-cover object-[0px_-140px]"
            src="/gin_xmas.jfif"
            alt="Andrea"
          />
          <p className="text-4xl px-4">Andrea</p>
        </div>
        <div className="w-80 h-92 bg-voces pl-8 space-y-2 pt-4">
          <p className="text-left">noleo quepone</p>
          <img
            className="h-24 w-full object-cover object-[0px_-140px]"
            src="/gin_xmas.jfif"
            alt="Marcos"
          />
          <p className="text-4xl text-right px-4">Marcos</p>
        </div>
      </div>

      <div className="w-4/9 h-[5px] bg-gray-300 mt-8"></div>
    </section>
  );
};

export default Voces;
