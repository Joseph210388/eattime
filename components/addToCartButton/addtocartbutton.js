'use client';

import React, { useEffect, useState } from "react";
import { addDishToCart, findCartByUserId, createCart  } from "../../backend/actions/cart";
import { useUser } from "@clerk/nextjs";


const AddToCartButton = ({ dishId }) => {
    const { user } = useUser();
    const userId = user?.id;
    const [cartId, setCartId] = useState(null);

    useEffect(() => {
        const getCartId = async () => {
            try {
                if (!userId) {
                    throw new Error("ID de usuario no disponible");
                }

                // Busca el carrito del usuario por su ID
                const cart = await findCartByUserId(userId);
                if (!cart) {
                    // Si no hay carrito para este usuario, crea uno nuevo
                    const newCart = await createCart(userId);
                    setCartId(newCart._id);
                } else {
                    setCartId(cart._id);
                }
            } catch (error) {
                console.error("Error al obtener o crear el carrito:", error);
            }
        };

        getCartId();
    }, [userId]);

    const handleAddToCart = async () => {
        try {
            if (!userId || !cartId) {
                throw new Error("ID de usuario o de carrito no disponible");
            }

            // Llama a la función addDishToCart pasando userId, cartId y dishId
            await addDishToCart(userId, cartId, dishId);

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

