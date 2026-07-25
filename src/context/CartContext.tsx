"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/data/products";

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Recuperar el carrito de localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem("cart_items_db");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Guardar en localStorage cada vez que cambie el carrito
  const updateCartState = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("cart_items_db", JSON.stringify(newCart));
  };

  const addToCart = (product: Product) => {
    const existingIndex = cart.findIndex((item) => item.id === product.id);

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity = (updated[existingIndex].quantity || 1) + 1;
      updateCartState(updated);
    } else {
      updateCartState([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: string) => {
    updateCartState(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    const updated = cart
      .map((item) => {
        if (item.id === id) {
          const newQty = (item.quantity || 1) + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter((item): item is CartItem => item !== null);

    updateCartState(updated);
  };

  const clearCart = () => {
    updateCartState([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
  return context;
};