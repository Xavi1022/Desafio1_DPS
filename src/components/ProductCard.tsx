"use client";

import Image from "next/image";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product);
    toast.success(`${product.title} agregado al carrito`);
  };

  return (
    <div className="bg-white rounded-lg border p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition">
      {/* Imagen a la izquierda obligatoria usando next/image */}
      <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
        <Image
          src={product.urlImage}
          alt={product.title}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>

      <div className="flex-1 min-w-0">
        <span className="text-xs text-blue-600 font-semibold uppercase">{product.category}</span>
        <h3 className="font-bold text-gray-800 text-sm md:text-base truncate">{product.title}</h3>
        <p className="text-xs text-gray-500 line-clamp-2 mt-1">{product.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-bold text-lg text-gray-900">${product.price.toFixed(2)}</span>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-md hover:bg-blue-700 font-medium"
          >
            + Carrito
          </button>
        </div>
      </div>
    </div>
  );
}