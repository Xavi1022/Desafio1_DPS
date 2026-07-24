"use client";

import { useCart } from "@/context/CartContext";
import { Trash2, Plus, Minus } from "lucide-react";
import { toast } from "sonner";

export default function CartDrawer({
  isOpen,
  onClose,
  onCheckout,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}) {
  const { cart, updateQuantity, removeFromCart } = useCart();

  if (!isOpen) return null;

  const total = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  const handleRemove = (id: number, name: string) => {
    removeFromCart(id);
    toast.info(`${name} eliminado del carrito`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <h2 className="text-xl font-bold">Carrito de Compras</h2>
          <button onClick={onClose} className="text-gray-500 text-lg hover:text-black">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500 my-10">El carrito está vacío</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-3">
                <div>
                  <h4 className="font-semibold text-sm">{item.title}</h4>
                  <p className="text-xs text-gray-500">${item.price} c/u</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 border rounded hover:bg-gray-100"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 border rounded hover:bg-gray-100"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-sm">${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                  <button
                    onClick={() => handleRemove(item.id, item.title)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t pt-4 mt-auto">
          <div className="flex justify-between text-lg font-bold mb-4">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            disabled={cart.length === 0}
            onClick={() => {
              onClose();
              onCheckout();
            }}
            className="w-full bg-green-600 text-white py-2 rounded-lg font-bold disabled:bg-gray-300 hover:bg-green-700 transition"
          >
            Procesar Compra
          </button>
        </div>
      </div>
    </div>
  );
}