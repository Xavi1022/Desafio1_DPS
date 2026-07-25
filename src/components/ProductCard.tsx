"use client";

import Image from "next/image";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { ShoppingBag } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.title} añadido al carrito`, {
      description: `$${product.price.toFixed(2)}`,
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-300 flex flex-row overflow-hidden group h-full">
      <div className="relative w-2/5 min-w-[130px] sm:min-w-[160px] bg-slate-100 overflow-hidden">
        <Image
          src={product.urlImage}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 40vw, 20vw"
        />
        <span className="absolute top-2.5 left-2.5 bg-indigo-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs shadow-xs">
          {product.category}
        </span>
      </div>

      {/* Información a la derecha */}
      <div className="p-4 sm:p-5 flex flex-col justify-between w-3/5 flex-1">
        <div>
          <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-indigo-600 transition-colors line-clamp-2">
            {product.title}
          </h3>
          <p className="text-slate-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <span className="text-base sm:text-lg font-extrabold text-slate-900">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3 py-2 rounded-xl transition-all shadow-xs active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">+ Carrito</span>
          </button>
        </div>
      </div>
    </div>
  );
}