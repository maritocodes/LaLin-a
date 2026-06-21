"use client";
import { motion } from "framer-motion";

interface HighlightInterface {
  day: number;
  month: number;
  title: string;
}

const Highlight = (props: HighlightInterface) => {
  // Configuración de la animación (variantes)
  const faderInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  } as const;

  return (
    // La sección ahora es un HTML normal, ya no controla los disparadores
    <section
      id="highlight"
      className="h-screen flex flex-col justify-between pl-24 py-12 text-accent bg-blue-100"
    >
      {/** DATE - Se anima de forma independiente */}
      <motion.p 
        variants={faderInLeft} 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }} // Se dispara al verse el 50% de la fecha
        className="text-9xl"
      >
        {String(props.day).padStart(2, "0")}/ <br />{" "}
        {String(props.month).padStart(2, "0")}
      </motion.p>

      {/** CONTENEDOR INFERIOR - Se anima solo cuando el usuario llega aquí abajo */}
      <motion.div 
        variants={faderInLeft} 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} // Se dispara al verse el 30% del bloque inferior
        className="flex flex-col items-start"
      >
        <img className="w-auto h-12 mb-4" src="/podcast.svg" alt="PODCAST" />
        <h4 className="text-8xl w-1/2">{props.title}</h4>
      </motion.div>
    </section>
  );
};

export default Highlight;