"use client";

import { useState } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";
import CartDrawer from "@/components/CartDrawer";
import CheckoutModal from "@/components/CheckoutModal";
import { productsData } from "@/data/products";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const categories = Array.from(new Set(productsData.map((p) => p.category)));

  const filteredProducts =
    selectedCategory === "Todas"
      ? productsData
      : productsData.filter((p) => p.category === selectedCategory);

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <Header onOpenCart={() => setIsCartOpen(true)} />

          <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-3">Catálogo de Productos</h2>
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>

            {/* Grid responsiva Mobile-First */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </main>

          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            onCheckout={() => setIsCheckoutOpen(true)}
          />

          <CheckoutModal
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
          />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}