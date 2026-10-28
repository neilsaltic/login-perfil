import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  usuarioNombre: string | null;
  usuarioRol: string | null;
  usuarioAvatar: string | null;
  autenticado: boolean;

  login: (token: string, nombre: string, rol: string) => void;
  logout: () => void;
  esAdmin: () => boolean;
  actuaizarPerfil: (nombre: string, avatar: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      usuarioNombre: null,
      usuarioRol: null,
      usuarioAvatar: null,
      autenticado: false,

      login: (token: string, nombre: string, rol: string) => {
        set({
          token: token,
          usuarioNombre: nombre,
          usuarioRol: rol,
          autenticado: true,
        });
      },

      actuaizarPerfil: (nombre: string, avatar: string | null) =>
        set({ usuarioNombre: nombre, usuarioAvatar: avatar }),

      logout: () => {
        set({
          token: null,
          usuarioNombre: null,
          usuarioRol: null,
          usuarioAvatar: null,
          autenticado: false,
        });
      },
      esAdmin: () => {
        return get().usuarioRol === "admin";
      },
    }),
    { name: "mercado-auth-storage" },
  ),
);
