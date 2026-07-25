"use client";

import { ShoppingCart, User, LogOut } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function Header({
  onOpenCart,
  onOpenAuth,
}: {
  onOpenCart: () => void;
  onOpenAuth: () => void;
}) {
  const { cart } = useCart();
  const { user, logout } = useAuth();

  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <h1 className="text-xl font-bold text-blue-600">OmniMarket</h1>

        <div className="flex items-center gap-4">
          <button
            onClick={onOpenCart}
            className="relative p-2 text-gray-700 hover:text-blue-600 transition"
            aria-label="Carrito"
          >
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-800">
                Hola, {user.name}
              </span>
              <button
                onClick={logout}
                className="p-2 text-red-500 hover:text-red-700 transition"
                title="Cerrar Sesión"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
            >
              <User className="w-4 h-4" />
              Ingresar
            </button>
          )}
        </div>
      </div>
    </header>
  );
}