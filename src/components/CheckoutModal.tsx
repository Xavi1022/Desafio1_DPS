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
    
    // Generar PDF de Factura
    generateInvoicePDF(cart, email);

    // Simulación de envío por correo electrónico y confirmación visual
    toast.success("¡Compra realizada con éxito!");
    toast.info(`Factura enviada por correo electrónico a: ${email}`);

    clearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
        <h2 className="text-xl font-bold mb-4">Resumen de Compra</h2>
        
        <div className="space-y-2 max-h-48 overflow-y-auto mb-4 border-b pb-2">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>{item.quantity}x {item.title}</span>
              <span>${(item.price * (item.quantity || 1)).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between font-bold text-lg mb-6">
          <span>Total a Pagar:</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <div className="flex gap-3">
          <button onClick={onClose} className="w-1/2 border py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
            Cancelar
          </button>
          <button
            onClick={handleConfirmPurchase}
            className="w-1/2 bg-blue-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition"
          >
            Confirmar y Pagar
          </button>
        </div>
      </div>
    </div>
  );
}