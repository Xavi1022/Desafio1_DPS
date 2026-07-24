"use client";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { generateInvoicePDF } from "@/utils/generateInvoice";
import { toast } from "sonner";

export default function CheckoutModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();

  if (!isOpen) return null;

  const total = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  const handleConfirmPurchase = () => {
    const email = user ? user.email : "cliente@correo.com";
    
    generateInvoicePDF(cart, email);

    toast.success("¡Compra realizada con éxito!");
    toast.info(`Factura enviada por correo electrónico a: ${email}`);

    clearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl text-gray-900">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Resumen de Compra</h2>
        
        <div className="space-y-2 max-h-48 overflow-y-auto mb-4 border-b border-gray-200 pb-3">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between text-sm text-gray-800">
              <span className="font-medium">{item.quantity}x {item.title}</span>
              <span className="font-bold">${(item.price * (item.quantity || 1)).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between font-bold text-lg mb-6 text-gray-900">
          <span>Total a Pagar:</span>
          <span className="text-blue-600">${total.toFixed(2)}</span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="w-1/2 border border-gray-300 py-2.5 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirmPurchase}
            className="w-1/2 bg-blue-600 text-white py-2.5 rounded-lg text-sm font-bold hover:bg-blue-700 transition"
          >
            Confirmar y Pagar
          </button>
        </div>
      </div>
    </div>
  );
}