"use client";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

export default function CartDrawer({
  isOpen,
  onClose,
  onCheckout,
  onOpenAuth,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
  onOpenAuth: () => void;
}) {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const { user } = useAuth();

  if (!isOpen) return null;

  const total = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  const handleProcessCheckout = () => {
    if (!user) {
      toast.warning("Debes iniciar sesión o registrarte para procesar tu compra.");
      onClose();
      onOpenAuth();
      return;
    }
    onClose();
    onCheckout();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex justify-end transition-opacity">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl text-slate-800">
        {/* Cabecera estilizada */}
        <div className="bg-slate-900 text-white p-5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold">Carrito de Compras</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white font-bold text-lg">
            ✕
          </button>
        </div>

        {/* Lista de productos */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center text-slate-400 my-16 space-y-2">
              <ShoppingCart className="w-12 h-12 mx-auto text-slate-300" />
              <p className="font-medium text-sm">Tu carrito está vacío</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex-1 pr-3">
                  <h4 className="font-bold text-sm text-slate-800">{item.title}</h4>
                  <p className="text-xs text-indigo-600 font-semibold">${item.price.toFixed(2)} c/u</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 border border-slate-200 rounded-md hover:bg-slate-100 text-slate-700"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-slate-800 px-1">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 border border-slate-200 rounded-md hover:bg-slate-100 text-slate-700"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-extrabold text-sm text-slate-900">
                    ${(item.price * (item.quantity || 1)).toFixed(2)}
                  </span>
                  <button
                    onClick={() => {
                      removeFromCart(item.id);
                      toast.info(`${item.title} eliminado del carrito`);
                    }}
                    className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pie de carrito */}
        <div className="border-t border-slate-200 p-5 bg-slate-50 mt-auto">
          <div className="flex justify-between text-lg font-black mb-4 text-slate-900">
            <span>Total:</span>
            <span className="text-indigo-600">${total.toFixed(2)}</span>
          </div>
          <button
            disabled={cart.length === 0}
            onClick={handleProcessCheckout}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold disabled:bg-slate-300 hover:bg-indigo-700 transition shadow-md active:scale-98"
          >
            Procesar Compra
          </button>
        </div>
      </div>
    </div>
  );
}