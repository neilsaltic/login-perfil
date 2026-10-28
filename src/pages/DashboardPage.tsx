import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { PerfilService } from "../service/perfil";
import { PerfilModal } from "../components/PerfilModal"; // Asegúrate de importar tu modal de perfil

export function DashboardPage() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const usuarioNombre = useAuthStore((state) => state.usuarioNombre);
  const usuarioAvatar = useAuthStore((state) => state.usuarioAvatar);
  const actualizarPerfil = useAuthStore((state) => state.actuaizarPerfil);

  const [isPerfilOpen, setIsPerfilOpen] = useState(false);

  useEffect(() => {
    PerfilService.obtener()
      .then((perfil) => actualizarPerfil(perfil.name, perfil.avatar_url))
      .catch(() => {});
  }, [actualizarPerfil]);

  const handleCerrarSesion = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50/50 text-slate-900">
      {/* Header fijo arriba */}
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Sección Izquierda: Logo y Títulos */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#4A154B] flex items-center justify-center text-white font-bold shadow-sm">
              <span className="text-lg tracking-wider">A</span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-gray-900 tracking-tight">
                  AuraShop
                </h1>
                <span className="text-gray-300">|</span>
                <span className="text-xs font-semibold text-[#4A154B] uppercase tracking-wider">
                  Panel
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Sistema de gestión comercial
              </p>
            </div>
          </div>

          {/* Sección Derecha: Avatar, Perfil y Cerrar Sesión */}
          <div className="flex items-center gap-4 text-sm font-semibold">
            {/* Avatar o Iniciales */}
            {usuarioAvatar ? (
              <img
                src={usuarioAvatar}
                alt="Foto de perfil"
                className="w-10 h-10 rounded-xl object-cover shadow-sm border border-gray-100"
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-[#4A154B]/10 text-[#4A154B] flex items-center justify-center font-bold">
                {usuarioNombre ? usuarioNombre.charAt(0).toUpperCase() : "U"}
              </div>
            )}

            <span className="hidden sm:block text-gray-800">
              {usuarioNombre ?? "Usuario"}
            </span>

            {/* Botón Mi Perfil */}
            <button
              className="rounded-xl bg-gray-100 px-3.5 py-2 text-xs font-bold text-gray-700 hover:bg-[#4A154B]/10 hover:text-[#4A154B] transition-colors"
              type="button"
              onClick={() => setIsPerfilOpen(true)}
            >
              Mi Perfil
            </button>

            {/* Botón Cerrar Sesión con color institucional */}
            <button
              onClick={handleCerrarSesion}
              className="px-4 py-2 rounded-xl bg-[#4A154B] hover:bg-[#3b113c] text-white text-xs font-bold transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A154B]/50"
              type="button"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="p-6 max-w-7xl mx-auto">
        <div className="mb-8 mt-2">
          <p className="mb-1 text-xs font-bold tracking-wider text-[#4A154B] uppercase">
            Tu cuenta y panel
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Bienvenido, {usuarioNombre || "Usuario"} 👋
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Aquí tienes un resumen de la actividad comercial de AuraShop.
          </p>
        </div>

        {/* Tarjetas del Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Tarjeta Productos */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-base font-bold text-[#4A154B] mb-2 flex items-center gap-2">
              📦 Productos
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Gestiona el catálogo completo
            </p>
            <span className="text-3xl font-extrabold text-gray-900">124</span>
          </div>

          {/* Tarjeta Pedidos */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-base font-bold text-[#4A154B] mb-2 flex items-center gap-2">
              🛒 Pedidos
            </h3>
            <p className="text-sm text-gray-500 mb-4">Últimas transacciones</p>
            <span className="text-3xl font-extrabold text-gray-900">18</span>
          </div>

          {/* Tarjeta Clientes */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-base font-bold text-[#4A154B] mb-2 flex items-center gap-2">
              👥 Clientes
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Registro de compradores
            </p>
            <span className="text-3xl font-extrabold text-gray-900">56</span>
          </div>
        </div>
      </main>

      {/* Modal para editar el perfil */}
      {isPerfilOpen && <PerfilModal onClose={() => setIsPerfilOpen(false)} />}
    </div>
  );
}
