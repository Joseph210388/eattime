'use client';

import React, {useState} from "react";


export default function Cart(){

    /* Supongamos que tienes un estado para almacenar los productos en el carrito */
    const [cartItems, setCartItems] = useState([]);

    /* Función para eliminar un producto del carrito */
    const removeFromCart = (index) => {
        const updatedCart = [...cartItems];
        updatedCart.splice(index, 1);
        setCartItems(updatedCart);
    };

    return(
        <div className="bg-stone-200 h-screen">
            <h1>Cart</h1>
            {/* Verifica si hay productos en el carrito */}
            {cartItems.length > 0 ? (
                // Si hay productos, mapea sobre ellos para mostrarlos
                <ul>
                    {cartItems.map((item, index) => (
                        <li key={index}>
                            <span>{item.name}</span> {/* Supongamos que cada elemento del carrito tiene un atributo 'name' */}
                            <button onClick={() => removeFromCart(index)}>Remove</button>
                        </li>
                    ))}
                </ul>
            ) : (
                // Si no hay productos en el carrito, muestra un mensaje indicando que está vacío
                <p>Your cart is empty</p>
            )}
        </div>
    );
}