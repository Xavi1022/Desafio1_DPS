"use client";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Trash2, Plus, Minus } from "lucide-react";
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
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col p-6 shadow-2xl text-gray-900">
        <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-3">
          <h2 className="text-xl font-bold text-gray-900">Carrito de Compras</h2>
          <button onClick={onClose} className="text-gray-500 text-xl hover:text-black font-bold">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500 my-10 font-medium">El carrito está vacío</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex-1 pr-2">
                  <h4 className="font-bold text-sm text-gray-900">{item.title}</h4>
                  <p className="text-xs text-gray-600 font-semibold">${item.price.toFixed(2)} c/u</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 border border-gray-300 rounded hover:bg-gray-100 text-gray-800"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-gray-900 px-1">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 border border-gray-300 rounded hover:bg-gray-100 text-gray-800"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-sm text-gray-900">
                    ${(item.price * (item.quantity || 1)).toFixed(2)}
                  </span>
                  <button
                    onClick={() => {
                      removeFromCart(item.id);
                      toast.info(`${item.title} eliminado del carrito`);
                    }}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-gray-200 pt-4 mt-auto">
          <div className="flex justify-between text-lg font-bold mb-4 text-gray-900">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            disabled={cart.length === 0}
            onClick={handleProcessCheckout}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-bold disabled:bg-gray-300 hover:bg-green-700 transition shadow-sm"
          >
            Procesar Compra
          </button>
        </div>
      </div>
    </div>
  );
}