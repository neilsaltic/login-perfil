import { api } from "../lib/axios";

export interface PerfilFormData {
  name: string;
}

export interface UserProfile {
  id: number;
  email: string;
  name: string;
  rol: string;
  avatar_url: string | null;
}

export const PerfilService = {
  obtener: () => api.get<UserProfile>("/auth/me").then((r) => r.data),

  actualizar: (datos: PerfilFormData, foto?: File) => {
    const formdata = new FormData();
    formdata.append("name", datos.name);
    if (foto) {
      formdata.append("foto", foto);
    }
    return api.put<UserProfile>("/auth/perfil", formdata).then((r) => r.data);
  },
};
