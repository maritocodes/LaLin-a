"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// --- COMPONENTE PARA EL TEXTO (OPACIDAD + BLUR) ---
function TextBlock({
  children,
  targetRef,
}: {
  children: React.ReactNode;
  targetRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.45, 0.55, 1],
    [0.3, 1, 1, 0.3],
  );
  const blurValue = useTransform(
    scrollYProgress,
    [0, 0.45, 0.55, 1],
    [10, 0, 0, 10],
  );
  const filter = useTransform(blurValue, (v) => `blur(${v}px)`);

  return (
    <motion.div style={{ opacity, filter }} className="flex flex-col">
      {children}
    </motion.div>
  );
}

// --- COMPONENTE PARA LA IMAGEN (OPACIDAD + BRIGHTNESS) ---
function ImageBlock({
  src,
  className,
  targetRef,
}: {
  src: string;
  className: string;
  targetRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  // La opacidad acompaña al brillo para un efecto más suave
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.45, 0.55, 1],
    [0.2, 1, 1, 0.2],
  );
  // El brillo pasa de 0.3 (oscuro) a 1 (normal) y vuelve a 0.3 al salir
  const brightness = useTransform(
    scrollYProgress,
    [0, 0.45, 0.55, 1],
    [0.2, 1, 1, 0.2],
  );
  const filter = useTransform(brightness, (v) => `brightness(${v})`);

  return (
    <motion.img src={src} className={className} style={{ opacity, filter }} />
  );
}

// --- COMPONENTE PRINCIPAL ---
export default function About() {
  const left = useRef<HTMLDivElement | null>(null);
  const mid = useRef<HTMLDivElement | null>(null);
  const right = useRef<HTMLDivElement | null>(null);

  return (
    <section className="w-full text-primary">
      {/* LEFT */}
      <div
        ref={left}
        className="h-screen flex items-center justify-start px-20 gap-4"
      >
        <ImageBlock src="/gin_xmas.jfif" className="w-104" targetRef={left} />

        <TextBlock targetRef={left}>
          <p className="bonito text-3xl whitespace-nowrap">
            has llegado a un espacio de
          </p>
          <p className="gordo text-4xl">
            escucha <br /> reflexión <br /> y diálogo
          </p>
        </TextBlock>
      </div>

      {/* MIDDLE */}
      <div
        ref={mid}
        className="h-screen flex items-center justify-center gap-4"
      >
        <TextBlock targetRef={mid}>
          <p className="bonito text-3xl whitespace-nowrap text-right">
            donde distintos <br /> roces comparten
          </p>
          <p className="gordo text-4xl text-right">
            experiencias <br /> miradas <br /> y preguntas
          </p>
        </TextBlock>

        <ImageBlock src="/gin_xmas.jfif" className="w-112" targetRef={mid} />
      </div>

      {/* RIGHT */}
      <div ref={right} className="h-screen flex items-center justify-end px-20">
        <div className="text-right flex flex-col items-end">
          <ImageBlock src="/gin_xmas.jfif" className="w-96" targetRef={right} />

          <TextBlock targetRef={right}>
            <p className="bonito text-3xl">sobre el</p>
            <p className="gordo text-4xl">presente</p>
            <p className="bonito text-3xl">
              que estamos viviendo <br /> y de dónde partimos
            </p>
          </TextBlock>
        </div>
      </div>
    </section>
  );
}
