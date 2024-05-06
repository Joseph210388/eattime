'use client';

import React, { useEffect, useState } from "react";
import { getCartItems } from "../../backend/actions/cart";


export default function Cart(){

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        async function fetchCartItems() {
            try {
                const items = await getCartItems(); // Obtener los platillos del carrito
                setCartItems(items);
            } catch (error) {
                console.error("Error al obtener los platillos del carrito:", error);
            }
        }
    
        if (cartItems.length === 0) { // Agregar esta condición para evitar llamadas recursivas
            fetchCartItems();
        }
    }, [cartItems]); // Ahora el useEffect se ejecuta cuando cambia cartItems, pero no en el montaje inicial
    

    return(
        <div className="bg-stone-200 h-screen">
            <h1 className="text-3xl font-semibold text-center pt-8 mb-4">Cart</h1>
            <div className="mx-auto max-w-md">
                {cartItems.length === 0 ? (
                    <p className="text-gray-600 text-center">No hay platillos en el carrito</p>
                ) : (
                    <ul>
                        {cartItems.map((items, index) => (
                            <li key={index}>
                                <div className="flex items-center justify-between border-b border-gray-300 py-2">
                                    <div>
                                        <p className="text-gray-900">{items.dishName}</p>
                                        <p className="text-gray-500">{items.dishCategory}</p>
                                    </div>
                                    <p className="text-gray-900">{items.dishPrice}€</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}