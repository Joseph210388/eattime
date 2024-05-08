'use client';

import React, { useEffect, useState } from "react";
import { getCartItems, deleteCartItem} from "../../backend/actions/cart";
import { useUser } from "@clerk/nextjs";


export default function Cart(){

    const [cartItems, setCartItems] = useState([]);
    const { user } = useUser();
    const userId = user?.id;
    const [totalPrice, setTotalPrice] = useState(0);
    

    useEffect(() => {
        async function fetchCartItems() {
            try {
                if (cartItems.length === 0 && userId) {
                    const items = await getCartItems(userId); // Obtener los platillos del carrito
                    setCartItems(items);
                }
            } catch (error) {
                console.error("Error al obtener los platillos del carrito:", error);
            }
        }
        fetchCartItems();
    }, [userId]); // Ahora el useEffect se ejecuta cuando cambia cartItems, pero no en el montaje inicial
    const calculateTotalPriceDish =(dishPrice, quantity) =>{
        return (dishPrice  * quantity).toFixed(2);
    };
   // Función para aumentar la cantidad de un platillo
    const increaseQuantity = (index) => {
        const updatedCartItems = [...cartItems];
        if (updatedCartItems[index].quantity < 10) { // Verifica si la cantidad actual es menor que 10
            updatedCartItems[index].quantity++;
            setCartItems(updatedCartItems);
        }
    };

    // Función para disminuir la cantidad de un platillo
    const decreaseQuantity = (index) => {
        const updatedCartItems = [...cartItems];
        if (updatedCartItems[index].quantity > 1) { // Verifica si la cantidad actual es mayor que 1
            updatedCartItems[index].quantity--;
            setCartItems(updatedCartItems);
        }
    };

    // Calcular el precio total del carrito
    useEffect(() => {
        let total = 0;
        cartItems.forEach((item) => {
            total += item.dishPrice * item.quantity;
        });
        setTotalPrice(total.toFixed(2));
    }, [cartItems]);
    ///funcion para eliminar el producto
    const handleDeleteItem = (itemId) => {
        try {
            // Eliminar el elemento del carrito
            deleteCartItem(userId, itemId);
            window.location.reload();
        } catch (error) {
            console.error("Error al eliminar el platillo del carrito:", error);
        }
    };

    return(
        <div className="bg-stone-200 h-screen p-10">
            <span className="flex items-center">
                <span className="h-px flex-1 bg-red-700"></span>
                    <h1 className="text-3xl mb-2 font-semibold px-6">
                            Selecciona tus platillos
                    </h1>
                <span className="h-px flex-1 bg-red-700"></span>
            </span>
            <div className="grid grid-cols-4 gap-8 ">
                <div className="col-span-4 lg:col-span-3">
                    {cartItems.length === 0 ? (
                        <p className="text-gray-600 text-center">No hay platillos en el carrito</p>
                    ) : (
                        <ul>
                            {cartItems.map((items, index) => (
                                <li key={index}>
                                    <div className="flex items-center justify-between border-b border-gray-300 py-2">
                                        <div className="flex gap-4">
                                            {/* boton para aumentar o disminuir la cantidad */}
                                            <div className="flex gap-3 items-center">
                                                {/* Botones para aumentar o disminuir la cantidad */}
                                                <button className="bg-red-700 text-white p-2 text-lg rounded-l-lg" onClick={() => decreaseQuantity(index)}>-</button>
                                                <span>{items.quantity}</span>
                                                <button className="bg-red-700 text-white p-2 text-lg rounded-r-lg" onClick={() => increaseQuantity(index)}>+</button>
                                            </div>
                                            <img
                                                src={items.dishImage}
                                                alt="item Image"
                                                className="w-16 h-16 "
                                            />
                                            <div>
                                                <p className="text-gray-900">{items.dishName}</p>
                                                <p className="text-gray-500">{items.dishCategory}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <p className="text-gray-900">
                                                {calculateTotalPriceDish(items.dishPrice, items.quantity)}€</p> {/* Pasar dishPrice y quantity como argumentos */}
                                            <button className="bg-red-700 p-2 rounded-lg" onClick={() => handleDeleteItem(items.dishId)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-white bi bi-trash3-fill" viewBox="0 0 16 16">
                                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                            </svg></button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                                <div className="pt-5 flex justify-end">
                                    {/* poner el total de todos los platillos que estan en el carrito */}
                                    <h5>Precio Total: {totalPrice}€</h5>
                                </div>
                        </ul>
                    )}

                </div>
                <div className="col-3" >
                    <h3>Formulario de pago</h3>
                </div>

            </div>
        </div>
    );
}