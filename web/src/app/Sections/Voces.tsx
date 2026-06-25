"use client";

import { useEffect, useRef, useState } from "react";
import EditableMedia from "../Components/admin/EditableMedia";
import { ChevronLeft, ChevronRight, Edit2, Check, ArrowLeft, ArrowRight, Plus, Trash2, X } from "lucide-react";
import { useEditor } from "../Components/editor/EditorProvider"; 
import UploadButton from "../Components/upload/UploadButton";

// Array de respaldo por si la base de datos está vacía la primera vez
const FALLBACK_VOCES = [
  { id: "1", name: "Marta", role: "psicóloga", uploadType: "vocesMarta" },
  { id: "2", name: "Pedro", role: "biólogo marino", uploadType: "vocesPedro" },
  { id: "3", name: "Andrea", role: "periodista", uploadType: "vocesAndrea" },
  { id: "4", name: "Marcos", role: "noleo quepone", uploadType: "vocesMarcos" },
];

export default function Voces({ mediaData = {} }: { mediaData?: any }) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  
  const { isAdmin } = useEditor(); 
  
  // Leemos la lista de voces de la base de datos (o usamos el respaldo)
  const [voces, setVoces] = useState<any[]>(mediaData?.vocesList || FALLBACK_VOCES);
  
  // Estados para el Modo Edición y el Modal
  const [isEditMode, setIsEditMode] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Estados del Formulario de nueva voz
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newSrc, setNewSrc] = useState("");
  const [isSavingVoice, setIsSavingVoice] = useState(false);

  const [show, setShow] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShow(true);
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const checkArrows = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 2);
  };

  useEffect(() => {
    checkArrows(); 
    window.addEventListener("resize", checkArrows);
    return () => window.removeEventListener("resize", checkArrows);
  }, [voces]);

  const scrollByAmount = (amount: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current || isEditMode) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftPos(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; 
    scrollRef.current.scrollLeft = scrollLeftPos - walk;
  };

  const handleMouseUpOrLeave = () => setIsDragging(false);

  // --- API DE DATOS (GUARDAR LISTA ENTERA) ---
  const saveVocesListToDB = async (listToSave: any[]) => {
    try {
      await fetch("/api/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vocesList: listToSave }),
      });
    } catch (error) {
      console.error("Error al guardar el orden de las voces:", error);
    }
  };

  // --- FUNCIONES DE REORDENAMIENTO Y ELIMINACIÓN ---
  const moveVoice = (index: number, direction: "left" | "right") => {
    if (direction === "left" && index === 0) return;
    if (direction === "right" && index === voces.length - 1) return;
    const newVoces = [...voces];
    const targetIndex = direction === "left" ? index - 1 : index + 1;
    [newVoces[index], newVoces[targetIndex]] = [newVoces[targetIndex], newVoces[index]];
    setVoces(newVoces);
  };

  const removeVoice = (indexToRemove: number) => {
    if (!confirm("¿Seguro que quieres eliminar esta voz?")) return;
    const newVoces = voces.filter((_, idx) => idx !== indexToRemove);
    setVoces(newVoces);
  };

  // --- FUNCIÓN AÑADIR NUEVA VOZ DESDE EL POPUP ---
  const handleAddVoice = async () => {
    if (!newName.trim() || !newRole.trim()) {
      alert("Por favor, rellena el nombre y el rol.");
      return;
    }
    setIsSavingVoice(true);
    
    // Generamos un ID único y una clave de subida basada en la fecha actual
    const newId = Date.now().toString();
    const newUploadType = `voz_${newId}`;
    
    const newVoice = { 
      id: newId, 
      name: newName, 
      role: newRole, 
      uploadType: newUploadType,
      tempSrc: newSrc // Guardamos la URL localmente para que se vea hasta que recargue la página
    };

    const newList = [...voces, newVoice];
    setVoces(newList);

    try {
      await fetch("/api/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vocesList: newList,
          [`${newUploadType}_src`]: newSrc || "/gin_xmas.jfif",
          [`${newUploadType}_posX`]: 50,
          [`${newUploadType}_posY`]: 50,
          [`${newUploadType}_zoom`]: 1,
          [`${newUploadType}_brightness`]: 1,
        }),
      });
    } catch (error) {
      console.error("Error guardando la nueva voz", error);
    } finally {
      setIsSavingVoice(false);
      setShowAddModal(false);
      setNewName("");
      setNewRole("");
      setNewSrc("");
    }
  };

  // --- CÁLCULO DINÁMICO DE PLANTILLA ---
  const getTemplateByIndex = (index: number) => {
    const pos = index % 4; 
    if (pos === 0) return "A";
    if (pos === 1) return "B";
    if (pos === 2) return "C";
    return "D";
  };

  const getCardStyles = (template: string) => {
    switch (template) {
      case "A": return "translate-y-28 pr-8 pt-4"; 
      case "B": return "translate-y-12 pl-8 pt-32"; 
      case "C": return "self-end pr-8 pt-40"; 
      case "D": return "pl-8 pt-4"; 
      default: return "";
    }
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="voces"
        className="py-8 mb-20 gap-8 flex flex-col items-center overflow-hidden w-full relative"
      >
        <div
          className={`w-4/9 h-[5px] bg-gray-300 transition-all duration-700
          ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
        />
        
        {/* TÍTULO Y CONTROLES DEL MODO EDICIÓN */}
        <div className="flex flex-col items-center gap-4">
          <h3
            className={`font-courier-prime font-bold text-4xl transition-all duration-700 delay-150
            ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            VOCES
          </h3>

          {isAdmin && (
            <div className="flex gap-2 animate-in fade-in zoom-in duration-300">
              <button
                onClick={() => {
                  if (isEditMode) saveVocesListToDB(voces); // Guardar orden al finalizar
                  setIsEditMode(!isEditMode);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md border ${
                  isEditMode 
                    ? "bg-green-600 hover:bg-green-700 text-white border-green-500" 
                    : "bg-white/10 hover:bg-white/20 text-black backdrop-blur-md border-black/20"
                }`}
              >
                {isEditMode ? <><Check className="w-4 h-4" /> Finalizar Edición</> : <><Edit2 className="w-4 h-4" /> Modo Edición</>}
              </button>

              {/* BOTÓN AÑADIR VOZ (Solo visible en Modo Edición) */}
              {isEditMode && (
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all bg-black hover:bg-gray-800 text-white shadow-md border border-gray-700"
                >
                  <Plus className="w-4 h-4" /> Añadir Voz
                </button>
              )}
            </div>
          )}
        </div>

        <div 
          className={`relative w-full max-w-9/10 mt-8 transition-all duration-700 delay-300 
          ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
        >
          {canScrollLeft && (
            <button
              onClick={() => scrollByAmount(-400)}
              className="absolute -left-8 top-1/2 -translate-y-1/2 z-40 bg-black/50 hover:bg-black text-white p-3 rounded-full backdrop-blur-md transition-all active:scale-95"
            >
              <ChevronLeft className=" w-8 h-8" />
            </button>
          )}

          <div
            ref={scrollRef}
            onScroll={checkArrows}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className={`flex gap-8 h-130 text-white font-courier-prime overflow-x-auto 
              [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
              ${isEditMode ? "scroll-auto overflow-x-scroll" : isDragging ? "cursor-grabbing select-none scroll-auto" : "cursor-grab snap-x snap-mandatory scroll-smooth"}`}
          >
            {voces.map((voz, index) => {
              const currentTemplate = getTemplateByIndex(index);
              
              return (
                <div
                  key={voz.id}
                  className={`relative snap-center shrink-0 w-80 h-92 bg-voces space-y-2 transition-transform duration-300 
                    ${getCardStyles(currentTemplate)} ${isDragging ? "scale-[0.98]" : ""}`}
                >
                  {/* CONTROLES DE REORDENAMIENTO Y ELIMINACIÓN */}
                  {isEditMode && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex gap-1 z-50 bg-black/80 px-2 py-1 rounded-full border border-white/20 backdrop-blur-sm">
                      <button 
                        onClick={() => moveVoice(index, "left")} disabled={index === 0}
                        className="text-white hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed p-1 transition-colors" title="Izquierda"
                      ><ArrowLeft className="w-4 h-4" /></button>
                      
                      <button 
                        onClick={() => moveVoice(index, "right")} disabled={index === voces.length - 1}
                        className="text-white hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed p-1 transition-colors border-r border-white/20 pr-2 mr-1" title="Derecha"
                      ><ArrowRight className="w-4 h-4" /></button>
                      
                      <button 
                        onClick={() => removeVoice(index)}
                        className="text-red-400 hover:text-red-500 p-1 transition-colors" title="Eliminar Voz"
                      ><Trash2 className="w-4 h-4" /></button>
                    </div>
                  )}

                  <p className={currentTemplate === "A" || currentTemplate === "C" ? "text-right" : "text-left"}>
                    {voz.role}
                  </p>
                  
                  <div 
                    className="h-24 w-full relative"
                    onMouseDown={(e) => { if (isAdmin) e.stopPropagation(); }}
                  >
                    <EditableMedia
                      uploadType={voz.uploadType}
                      // Utilizamos el fallback tempSrc por si la acabamos de crear en esta sesión
                      initialSrc={mediaData?.[`${voz.uploadType}_src`] || voz.tempSrc || "/gin_xmas.jfif"}
                      initialPosX={mediaData?.[`${voz.uploadType}_posX`] ?? 50}
                      initialPosY={mediaData?.[`${voz.uploadType}_posY`] ?? 50}
                      initialZoom={mediaData?.[`${voz.uploadType}_zoom`] ?? 1}
                      initialBrightness={mediaData?.[`${voz.uploadType}_brightness`] ?? 1}
                      className={`h-full w-full ${!isAdmin ? "pointer-events-none" : ""}`}
                    />
                  </div>

                  <p className={`text-4xl px-4 ${currentTemplate === "B" || currentTemplate === "D" ? "text-right" : "text-left"}`}>
                    {voz.name}
                  </p>
                </div>
              );
            })}
          </div>

          {canScrollRight && (
            <button
              onClick={() => scrollByAmount(400)}
              className="absolute -right-8 top-1/2 -translate-y-1/2 z-40 bg-black/50 hover:bg-black text-white p-3 rounded-full backdrop-blur-md transition-all active:scale-95"
            >
              <ChevronRight className=" w-8 h-8" />
            </button>
          )}
        </div>

        <div
          className={`w-4/9 h-[5px] bg-gray-300 mt-8 transition-all duration-700 delay-500
          ${show ? "opacity-100" : "opacity-0"}`}
        />
      </section>

      {/* POPUP DE AÑADIR VOZ */}
      {showAddModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#111] border border-white/20 p-6 rounded-2xl w-full max-w-sm flex flex-col gap-5 text-white animate-in zoom-in-95 duration-200 font-courier-prime shadow-2xl">
            
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h4 className="text-xl font-bold uppercase tracking-wider">Nueva Voz</h4>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-400 uppercase tracking-widest">Nombre</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ej: Laura"
                  className="bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white outline-none focus:border-white transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-400 uppercase tracking-widest">Profesión / Rol</label>
                <input
                  type="text"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  placeholder="Ej: Antropóloga"
                  className="bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white outline-none focus:border-white transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1 border border-dashed border-white/20 p-4 rounded-md items-center justify-center">
                <label className="text-xs text-gray-400 uppercase tracking-widest mb-2 text-center w-full">Foto o Vídeo</label>
                {/* Utilizamos el UploadButton. Ponemos "temp_voice_upload" como clave temporal solo para que se suba el archivo y devuelva la URL */}
                {newSrc ? (
                  <div className="text-green-400 text-xs font-bold flex items-center gap-1"><Check className="w-3 h-3"/> Archivo cargado</div>
                ) : (
                  <UploadButton type="temp_voice_upload" onUploaded={(url) => setNewSrc(url)} />
                )}
              </div>
            </div>

            <button
              onClick={handleAddVoice}
              disabled={isSavingVoice}
              className="w-full bg-white text-black font-bold py-3 mt-2 rounded-lg hover:bg-gray-200 transition-all uppercase tracking-wider text-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSavingVoice ? "Guardando..." : "Guardar en Carrusel"}
            </button>

          </div>
        </div>
      )}
    </>
  );
}