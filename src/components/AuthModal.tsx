"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export default function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !name)) {
      toast.error("Por favor completa todos los campos requeridos");
      return;
    }

    login(email, isLogin ? email.split("@")[0] : name);
    toast.success(isLogin ? "¡Sesión iniciada con éxito!" : "¡Cuenta registrada con éxito!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl relative">
        <h2 className="text-2xl font-bold mb-4">{isLogin ? "Iniciar Sesión" : "Crear Cuenta"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium mb-1">Nombre Completo</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Juan Pérez"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1">Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="usuario@udb.edu.sv"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
            {isLogin ? "Entrar" : "Registrarse"}
          </button>
        </form>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="w-full mt-3 text-sm text-blue-600 hover:underline text-center block"
        >
          {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
        </button>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold">
          ✕
        </button>
      </div>
    </div>
  );
}