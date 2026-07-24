"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export default function AuthModal({
  isOpen,
  onClose,
  isRequired = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  isRequired?: boolean;
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
        onClose();
      } else {
        toast.error("Usuario no registrado o credenciales incorrectas. Regístrate primero.");
      }
    } else {
      const success = register(email, name, password);
      if (success) {
        toast.success("¡Cuenta registrada con éxito!");
        onClose();
      } else {
        toast.error("El correo electrónico ya está registrado. Inicia sesión.");
      }
    }
  };

  return (
    <div className={isRequired ? "" : "fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"}>
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl relative text-gray-900 mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">{isLogin ? "Iniciar Sesión" : "Crear Cuenta"}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre Completo</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Juan Pérez"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="usuario@udb.edu.sv"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-bold hover:bg-blue-700 transition">
            {isLogin ? "Entrar" : "Registrarse"}
          </button>
        </form>

        <button
          onClick={() => setIsLogin(!isLogin)}
          className="w-full mt-4 text-sm text-blue-600 font-medium hover:underline text-center block"
        >
          {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
        </button>

        {!isRequired && (
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 font-bold text-lg">
            ✕
          </button>
        )}
      </div>
    </div>
  );
}