import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../store/useAuthStore";
import { loginSchema, type LoginFormData } from "../schema/LoginSchema";
import { authService } from "../service/auth";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [errorServidor, setErrorServidor] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setErrorServidor("");
      const respuesta = await authService.login(data);
      login(respuesta.access_token, respuesta.user_name, respuesta.user_role);
      
      console.log("Login exitoso:", respuesta);
      
      // 3. ¡Agrega esta línea para redirigir a la tienda/dashboard!
      navigate("/dashboard"); 

    } catch (err) {
      console.error("Error de login:", err);
      setErrorServidor("Credenciales incorrectas o error de conexión");
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-[#fff7fa] px-4 py-10">
      <div className="flex flex-col w-full items-center justify-center relative">
        <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-[#fd8dbb]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-20 w-96 h-96 rounded-full bg-[#f8d8ff]/30 blur-3xl pointer-events-none" />

        <div className="w-full max-w-md relative z-10 flex flex-col items-center">
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="h-14 flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-105">
              <img
                alt="AuraShop Logo"
                className="h-12 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida/AEtjO1VbXX6I_L9MzicJd9I-mbsNoktQOf254YlulYIxjiwgWWw58Mu84AaOaSZ1Nlfc6P-zofXIa7j5_L-dFQy67S-pAsnxfjYeMwfbVCjdEfp8i8Y0F0DUKsEtuFYQhlXtlEHIJmw5MGwP5_RA-hw0tChUUn_fb1nDioFPlwBJkEVRh8h4we1g_Iqck_DGWpLnBdoSRz-zfS3xCk364HujXJjVY5X5BKvnUPsrFr21Bcn2du_bl5j96ZRuH_s"
              />
            </div>
            <span className="text-[11px] font-semibold tracking-widest text-[#9a3d68] uppercase px-3 py-1 rounded-full bg-[#f0e5eb] mb-2">
              Boutique & Comercio Exclusivo
            </span>
            <h1 className="text-2xl font-semibold text-[#3e002f] tracking-tight">
              Bienvenido de nuevo
            </h1>
            <p className="text-[13px] text-[#51434a] mt-1">
              Inicia sesión en tu cuenta para continuar con tu experiencia
            </p>
          </div>

          <div className="w-full bg-white rounded-xl shadow-xl p-8 sm:p-10 transition-all duration-300">
            {errorServidor && (
              <div className="text-[#ba1a1a] p-3 mb-4 rounded bg-[#ba1a1a]/10 text-center text-sm font-medium">
                {errorServidor}
              </div>
            )}

            <form
              className="flex flex-col gap-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-semibold text-[#1f1a1e] flex items-center justify-between"
                  htmlFor="email"
                >
                  <span>Correo electrónico</span>
                  <span className="text-[#9a3d68] text-[11px] font-medium">Requerido</span>
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-[#83737a] text-lg pointer-events-none select-none">
                    mail
                  </span>
                  <input
                    {...register("email")}
                    id="email"
                    type="email"
                    placeholder="usuario@tienda.com"
                    style={{ boxShadow: 'inset 0 0 0 1px rgba(88, 24, 69, 0.18)' }}
                    className="w-full bg-white text-[15px] text-[#1f1a1e] rounded-lg pl-10 pr-4 py-2.5 transition-all duration-200 outline-none placeholder:text-[#d5c1ca] focus:bg-[#fff7fa] focus:ring-2 focus:ring-[#721C47]/20"
                  />
                </div>
                {errors.email && (
                  <span className="text-[#ba1a1a] text-xs">{errors.email.message}</span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-semibold text-[#1f1a1e]"
                  htmlFor="password"
                >
                  Contraseña
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-[#83737a] text-lg pointer-events-none select-none">
                    lock
                  </span>
                  <input
                    {...register("password")}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    style={{ boxShadow: 'inset 0 0 0 1px rgba(88, 24, 69, 0.18)' }}
                    className="w-full bg-white text-[15px] text-[#1f1a1e] rounded-lg pl-10 pr-12 py-2.5 transition-all duration-200 outline-none placeholder:text-[#d5c1ca] focus:bg-[#fff7fa] focus:ring-2 focus:ring-[#721C47]/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-[#83737a] hover:text-[#581845] p-1 rounded transition-colors focus:outline-none cursor-pointer flex items-center"
                    aria-label="Mostrar u ocultar contraseña"
                  >
                    <span className="material-symbols-outlined text-lg select-none">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
                {errors.password && (
                  <span className="text-[#ba1a1a] text-xs">{errors.password.message}</span>
                )}
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none group">
                  <input
                    className="peer sr-only"
                    id="remember"
                    type="checkbox"
                  />
                  <div 
                    className="w-4 h-4 rounded bg-white peer-checked:bg-[#581845] flex items-center justify-center transition-all duration-150 shadow-sm"
                    style={{ boxShadow: 'inset 0 0 0 1.5px rgba(88, 24, 69, 0.3)' }}
                  >
                    <span className="material-symbols-outlined text-white text-[13px] opacity-0 peer-checked:opacity-100 transition-opacity font-bold select-none">
                      check
                    </span>
                  </div>
                  <span className="text-[13px] text-[#51434a] group-hover:text-[#1f1a1e] transition-colors">
                    Recordarme
                  </span>
                </label>
                <button
                  type="button"
                  className="text-[11px] font-medium text-[#9a3d68] hover:text-[#581845] transition-colors cursor-pointer"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              <button
                className="w-full mt-2 bg-[#581845] hover:bg-[#78214c] text-white text-sm font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                type="submit"
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? "Verificando..." : "Iniciar Sesión"}</span>
                <span className="material-symbols-outlined text-base select-none">arrow_forward</span>
              </button>
            </form>

            <div className="relative my-7 flex items-center justify-center">
              <div className="w-full h-px bg-[#e1d7dd]" />
              <span className="absolute bg-white px-3 text-[11px] font-medium text-[#83737a] uppercase tracking-wider">
                O continúa con
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-lg bg-[#fbf1f7] hover:bg-[#f5ebf1] transition-all duration-150 active:scale-[0.98] group cursor-pointer"
                type="button"
              >
                <svg className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                </svg>
                <span className="text-xs font-semibold text-[#1f1a1e]">Google</span>
              </button>
              <button
                className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-lg bg-[#fbf1f7] hover:bg-[#f5ebf1] transition-all duration-150 active:scale-[0.98] group cursor-pointer"
                type="button"
              >
                <svg className="w-4 h-4 shrink-0 fill-[#1f1a1e] transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.89c.65-.79 1.1-1.9 0.98-3.01-.95.04-2.09.63-2.76 1.42-.58.68-1.1 1.77-.96 2.83 1.06.08 2.13-.53 2.74-1.24z" />
                </svg>
                <span className="text-xs font-semibold text-[#1f1a1e]">Apple</span>
              </button>
            </div>
          </div>

          <div className="mt-8 text-center flex items-center justify-center gap-1.5">
            <span className="text-[15px] text-[#51434a]">¿No tienes una cuenta?</span>
            <button type="button" className="text-sm font-semibold text-[#581845] hover:text-[#9a3d68] transition-colors underline-offset-4 hover:underline cursor-pointer">
              Regístrate aquí
            </button>
          </div>

          <div className="mt-8 flex items-center gap-6 text-[#51434a] text-[11px] font-medium opacity-80 flex-wrap justify-center">
            <button type="button" className="hover:text-[#3e002f] transition-colors cursor-pointer">Privacidad</button>
            <span className="w-1 h-1 rounded-full bg-[#83737a]" />
            <button type="button" className="hover:text-[#3e002f] transition-colors cursor-pointer">Términos de Servicio</button>
            <span className="w-1 h-1 rounded-full bg-[#83737a]" />
            <button type="button" className="hover:text-[#3e002f] transition-colors cursor-pointer">Ayuda & Soporte</button>
          </div>
        </div>
      </div>
    </main>
  );
}