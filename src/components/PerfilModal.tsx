import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/useAuthStore";
import { PerfilService, type PerfilFormData } from "../service/perfil";
import { InputFotoPerfil } from "./InputFotoPerfil";

interface PerfilModalProps {
  onClose: () => void;
}

export function PerfilModal({ onClose }: PerfilModalProps) {
  const usuarioNombre = useAuthStore((s) => s.usuarioNombre);
  const usuarioAvatar = useAuthStore((s) => s.usuarioAvatar);
  const actualizarPerfil = useAuthStore((s) => s.actuaizarPerfil);

  const [fotoArchivo, setFotoArchivo] = useState<File | undefined>();
  const [mensajeExito, setMensajeExito] = useState("");
  const [errorServidor, setErrorServidor] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PerfilFormData>({
    defaultValues: { name: usuarioNombre ?? "" },
  });

  const onSubmit = async (data: PerfilFormData) => {
    try {
      setErrorServidor("");
      setMensajeExito("");

      const perfil = await PerfilService.actualizar(data, fotoArchivo);
      actualizarPerfil(perfil.name, perfil.avatar_url);
      setMensajeExito("Se actualizó con éxito");
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      setErrorServidor("Error al conectar con el Servidor");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl text-slate-900 sm:p-8 animate-in fade-in zoom-in duration-200">
        {/* Encabezado del Modal */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold tracking-tight text-gray-900">
            Editar Mi Perfil
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 hover:bg-gray-200 transition"
          >
            ✕
          </button>
        </div>

        {/* Mensajes de éxito / error adaptados */}
        {mensajeExito && (
          <div className="mb-6 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium text-center">
            {mensajeExito}
          </div>
        )}

        {errorServidor && (
          <div className="mb-6 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-sm font-medium text-center">
            {errorServidor}
          </div>
        )}

        {/* Input de Foto de Perfil */}
        <div className="flex justify-center mb-6">
          <InputFotoPerfil
            fotoActual={usuarioAvatar}
            iniciales={(usuarioNombre ?? "").substring(0, 2).toUpperCase()}
            onchange={(file) => setFotoArchivo(file)}
          />
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nombre completo
            </label>
            <input
              {...register("name", { required: "El nombre es obligatorio" })}
              className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-[#4A154B] focus:ring-4 focus:ring-[#4A154B]/10"
            />
            {errors.name && (
              <span className="text-xs text-rose-500 mt-1 block">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Botones de acción con el color vino institucional */}
          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-11 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 h-11 rounded-xl bg-[#4A154B] hover:bg-[#3b113c] text-sm font-bold text-white shadow-md transition disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#4A154B]/50"
            >
              {isSubmitting ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
