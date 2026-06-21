const Contact = () => {
  return (
    <section id="contact" className="flex items-end justify-center my-32 gap-12">
      <img
        src="/logotipo_escuchalo.svg"
        alt="logotipo la liña escuchalo como quieras"
      />

      <div className="text-primary flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="inline-flex gap-2 items-center">
            <img
              className="h-2/3 translate-y-0.5"
              src="/email.svg"
              alt="email"
            />
            <p className="bonito text-xl">info@laliña.es</p>
          </div>

          <div className="inline-flex gap-2 items-center">
            <img className="h-2/3 translate-y-0.5" src="/msg.svg" alt="msg" />
            <p className="bonito text-xl">@lavoznomada</p>
          </div>
        </div>

        <div className="inline-flex justify-between w-full">
          <a>
            <img src="/apple-podcast.svg" alt="Apple Podcast" />
          </a>
          <a>
            <img src="/spotify.svg" alt="Spotify" />
          </a>
          <a>
            <img src="/youtube.svg" alt="YouTube" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
