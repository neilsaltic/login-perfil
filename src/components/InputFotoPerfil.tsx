import React, { useEffect, useState } from "react";

interface Props {
  fotoActual?: string | null;
  iniciales: string;
  onchange: (file: File | undefined) => void;
}

export function InputFotoPerfil({ fotoActual, iniciales, onchange }: Props) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    //validamos que exista
    if (!file) {
      return;
    }
    //validamos que el archivo sea una imagen
    if (!file.type.startsWith("image/")) {
      alert("Pro favor Selecciona un archivo que sea Imagen");
    }

    //validamos que no sea muy pesado y no sea mas grande que 5 mb
    if (file.size > 5 * 1024 * 1024) {
      alert(" La imagen es muy grande, no debe de superar los 5MB");
    }
    //creamos una URL temporal, aun no se sube a la red
    setPreview(URL.createObjectURL(file));

    onchange(file);
  };

  const quitarSeleccion = () => {
    setPreview(null);
    onchange(undefined);
  };

  const imagenMostrada = preview ?? fotoActual;

  return (
    <div className="flex flex-col items-center gap-2">
      <label className="cursor-pointer group relative inline-block">
        {/* Contenedor del avatar con los tonos y bordes de AuraShop (#4A154B) */}
        <div className="relative h-28 w-28 rounded-full overflow-hidden border-4 border-[#4A154B]/30 shadow-md bg-[#4A154B]/10">
          {imagenMostrada ? (
            <img
              src={imagenMostrada}
              alt="Avatar de perfil"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="grid h-full w-full place-items-center text-2xl font-bold text-[#4A154B]">
              {iniciales}
            </span>
          )}

          {/* Overlay al pasar el mouse para cambiar la foto */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white text-xs font-semibold px-2 text-center">
              Cambiar foto
            </span>
          </div>
        </div>

        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
        />
      </label>

      {/* Botón para remover la seleccion temporal */}
      {preview && (
        <button
          type="button"
          onClick={quitarSeleccion}
          className="text-xs font-semibold text-rose-600 hover:text-rose-700 transition"
        >
          Quitar foto
        </button>
      )}
    </div>
  );
}
