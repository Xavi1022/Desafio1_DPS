"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, User as UserIcon, LogOut } from "lucide-react";
import AuthModal from "./AuthModal";

export default function Header({ onOpenCart }: { onOpenCart: () => void }) {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">E-Store UDB</h1>

        <div className="flex items-center gap-4">
          <button onClick={onOpenCart} className="relative p-2 text-gray-700 hover:text-blue-600">
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Hola, {user.name}</span>
              <button onClick={logout} className="p-2 text-red-500 hover:text-red-700">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthOpen(true)}
              className="flex items-center gap-1 text-sm bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700"
            >
              <UserIcon className="w-4 h-4" /> Ingresar
            </button>
          )}
        </div>
      </div>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </header>
  );
}