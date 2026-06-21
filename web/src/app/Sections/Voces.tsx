"use client";

import { useEffect, useRef, useState } from "react";

const Voces = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="voces"
      className="py-8 mb-20 gap-8 flex flex-col items-center overflow-hidden"
    >
      {/* LINEA + TITULO */}
      <div
        className={`w-4/9 h-[5px] bg-gray-300 transition-all duration-700
        ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
      />

      <h3
        className={`font-courier-prime font-bold text-4xl transition-all duration-700 delay-150
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        VOCES
      </h3>

      {/* CARDS */}
      <div className="inline-flex gap-8 h-130 text-white font-courier-prime">

        {/* MARTA */}
        <div
          className={`translate-y-28 w-80 h-92 pr-8 bg-voces space-y-2 pt-4
          transition-all duration-700 delay-200
          ${show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"}`}
        >
          <p className="text-right">psicóloga</p>
          <img className="h-24 w-full object-cover object-[0px_-140px]" src="/gin_xmas.jfif" />
          <p className="text-4xl px-4">Marta</p>
        </div>

        {/* PEDRO */}
        <div
          className={`translate-y-12 w-80 h-92 bg-voces pl-8 space-y-2 pt-32
          transition-all duration-700 delay-300
          ${show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-32"}`}
        >
          <p className="text-4xl px-4 text-right">Pedro</p>
          <img className="h-24 w-full object-cover object-[0px_-140px]" src="/gin_xmas.jfif" />
          <p className="text-left">biólogo marino</p>
        </div>

        {/* ANDREA */}
        <div
          className={`self-end w-80 h-92 bg-voces pr-8 space-y-2 pt-40
          transition-all duration-700 delay-400
          ${show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-40"}`}
        >
          <p className="text-right">periodista</p>
          <img className="h-24 w-full object-cover object-[0px_-140px]" src="/gin_xmas.jfif" />
          <p className="text-4xl px-4">Andrea</p>
        </div>

        {/* MARCOS */}
        <div
          className={`w-80 h-92 bg-voces pl-8 space-y-2 pt-4
          transition-all duration-700 delay-500
          ${show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-52"}`}
        >
          <p className="text-left">noleo quepone</p>
          <img className="h-24 w-full object-cover object-[0px_-140px]" src="/gin_xmas.jfif" />
          <p className="text-4xl text-right px-4">Marcos</p>
        </div>

      </div>

      {/* LINEA ABAJO */}
      <div
        className={`w-4/9 h-[5px] bg-gray-300 mt-8 transition-all duration-700 delay-500
        ${show ? "opacity-100" : "opacity-0"}`}
      />
    </section>
  );
};

export default Voces;