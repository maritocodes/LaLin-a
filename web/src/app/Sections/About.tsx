const About = () => {
  return (
    <section id="about" className="w-full h-192 my-20 relative text-primary">
      <div className="absolute -translate-y-40" id=""/>
      {/** LEFT */}
      <div className="inline-flex w-fit gap-4">
        <img src="/gin_xmas.jfif" alt="" className="w-104 bg-red-500" />
        <div className="flex flex-col w-fit">
          <p className="bonito  whitespace-nowrap text-3xl">
            has llegado a un espacio de
          </p>
          <p className="gordo text-4xl">
            escucha <br /> reflexión <br /> y diálogo
          </p>
        </div>
      </div>

      {/** BOTTOM **/}
      <div className="inline-flex w-fit gap-4 absolute top-80 -translate-x-58">
        <div className="text-end flex flex-col w-fit absolute -translate-x-7/10 top-1/2 -translate-y-1/2">
          <p className="bonito  whitespace-nowrap text-3xl">
            donde distintos <br /> roces comparten
          </p>
          <p className="gordo text-4xl">
            experiencias <br /> miradas <br /> y preguntas
          </p>
        </div>
        <img src="/gin_xmas.jfif" alt="" className="w-112 bg-red-500" />
      </div>

      {/** RIGHT */}
      <div className="flex flex-col text-right items-end w-fit gap-4 absolute top-20 right-20">
        <img src="/gin_xmas.jfif" alt="" className="w-96 bg-red-500" />
        <div className="flex flex-col w-fit">
          <p className="bonito text-3xl">sobre el</p>
          <p className="gordo text-4xl">presente</p>
          <p className="bonito text-3xl">
            que estamos viviendo <br /> y de dónde partimos
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
