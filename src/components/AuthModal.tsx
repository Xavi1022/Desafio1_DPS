"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { UserCheck, LogIn } from "lucide-react";

export default function AuthModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { login, register } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || (!isLogin && !name)) {
      toast.error("Por favor completa todos los campos requeridos");
      return;
    }

    if (isLogin) {
      const success = login(email, password);
      if (success) {
        toast.success("¡Sesión iniciada con éxito!");
        setEmail("");
        setPassword("");
        onClose();
      } else {
        toast.error("El correo no está registrado o la contraseña es incorrecta.");
      }
    } else {
      const success = register(email, name, password);
      if (success) {
        toast.success("¡Cuenta registrada con éxito!");
        setEmail("");
        setName("");
        setPassword("");
        onClose();
      } else {
        toast.error("El correo electrónico ya está registrado. Intenta iniciar sesión.");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-slate-800 mx-auto border border-slate-100">
        <div className="flex items-center gap-2 mb-2 text-indigo-600">
          {isLogin ? <LogIn className="w-5 h-5" /> : <UserCheck className="w-5 h-5" />}
          <span className="text-xs font-bold tracking-wider uppercase">
            {isLogin ? "Acceso de usuario" : "Registro de cliente"}
          </span>
        </div>

        <h2 className="text-2xl font-black mb-6 text-slate-900">
          {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Nombre Completo
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-slate-200 rounded-xl p-3 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
                placeholder="Ingresa nombre completo"
              />
            </div>
          )}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-200 rounded-xl p-3 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
              placeholder="Ingresa tu correo"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-slate-200 rounded-xl p-3 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-md active:scale-98 mt-2"
          >
            {isLogin ? "Entrar" : "Registrarse"}
          </button>
        </form>

        <button
          onClick={() => setIsLogin(!isLogin)}
          className="w-full mt-4 text-xs font-bold text-indigo-600 hover:text-indigo-800 text-center block transition"
        >
          {isLogin ? "¿No tienes cuenta? Regístrate gratis" : "¿Ya tienes cuenta? Inicia sesión"}
        </button>

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 font-bold text-lg"
        >
          ✕
        </button>
      </div>
    </div>
  );
}