'use client';

import React from "react";
import { addDishToCart } from "../../backend/actions/cart";
import { useUser } from "@clerk/nextjs";

const AddToCartButton = ({ dishId }) => {
  const { user } = useUser();
    const userId= user?.id; ///user.id = en mi clerkId modelo
  const handleAddToCart = async () => {
    try {
      if (!userId) {
        throw new Error("ID de usuario no disponible");
      }
      await addDishToCart(userId, dishId);
      alert("Platillo añadido al carrito exitosamente");
    } catch (error) {
      console.error("Error al añadir platillo al carrito:", error);
      alert("Error al añadir platillo al carrito");
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className="block w-fit rounded-xl bg-red-800 text-white p-4 text-sm font-medium transition hover:scale-105"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
