'use client';

import React, { useEffect, useState } from "react";
import { getCartItems, deleteCartItem, deleteAllCartItems} from "../../backend/actions/cart";
import { useUser } from "@clerk/nextjs";
import {createReservation} from "../../backend/actions/reservation";
;


export default function Cart(){

    const [cartItems, setCartItems] = useState([]);
    const { user } = useUser();
    const userId = user?.id;
    const [totalPrice, setTotalPrice] = useState(0);
    const [reservationDate, setReservationDate] = useState('');
    const [reservationTime, setReservationTime] = useState('');
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
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
    }, [userId]); 
    
    // Ahora el useEffect se ejecuta cuando cambia cartItems, pero no en el montaje inicial
    const calculateTotalPriceDish =(dishPrice, quantity) =>{
        return (dishPrice  * quantity).toFixed(2);
    };
   // Función para aumentar la cantidad de un platillo
    const increaseQuantity = (index) => {
        const updatedCartItems = [...cartItems];
        if (updatedCartItems[index].quantity < 10) { 
            // Verifica si la cantidad actual es menor que 10
            updatedCartItems[index].quantity++;
            setCartItems(updatedCartItems);
        }
    };

    // Función para disminuir la cantidad de un platillo
    const decreaseQuantity = (index) => {
        const updatedCartItems = [...cartItems];
        if (updatedCartItems[index].quantity > 1) { 
            // Verifica si la cantidad actual es mayor que 1
            updatedCartItems[index].quantity--;
            setCartItems(updatedCartItems);
        }
    };

    // Obtener la fecha de mañana en el formato YYYY-MM-DD
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    const tomorrowFormatted = tomorrow.toISOString().split('T')[0];

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
    const handleSubmit = async () => {
        try {
            setIsSubmitting(true);
            const formattedDishDetail = cartItems.map(item => ({
                dishName: item.dishName,
                quantity: item.quantity
            }));
            const reservation = await createReservation(
                userId,
                formattedDishDetail,
                totalPrice,
                reservationDate,
                reservationTime,
                numberOfPeople
            );
            console.log('Reserva creada:', reservation);
        } catch (error) {
            console.log('Reserva creada');
            const confirmation = window.confirm('¡Reserva realizada con éxito! ¿Quieres ir a ver tus reservas?');
            if (confirmation) {
                await deleteAllCartItems(userId);
                // Redirigir al usuario a la página de reservas
                window.location.href = '/reservation';
            }
        }
    };
    const handlePaymentClick = () => {
        const isConfirmed = window.confirm('¿Estás seguro de que deseas realizar el pago?');
        if (isConfirmed) {
            handleSubmit(); // Llama a handleSubmit si la confirmación es true
        }
    };

    return(
        <div className="bg-stone-200 lg:h-screen p-3 md:p-10">
            <span className="flex items-center">
                <span className="h-px flex-1 bg-red-700"></span>
                    <h1 className="text-3xl mb-2 font-semibold px-6">
                        Carrito de {user?.firstName} {user?.lastName}
                    </h1>
                <span className="h-px flex-1 bg-red-700"></span>
            </span>
            <div className="flex flex-col pt-6 lg:flex-row ">
                <div className="lg:w-3/5 lg:px-12 py-8 lg:py-3">
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
                                    <h5 className="text-xl">Precio Total: {totalPrice}€</h5>
                                </div>
                        </ul>
                    )}

                </div>
                <div className="border-t lg:border-l lg:border-t-0 border-red-700 lg:w-2/5 lg:px-12 py-8 lg:py-3">
                    <h3 className="text-2xl font-bold">Resumen de la Reserva</h3>
                    {/* aqui poner el formulario de pago */}
                    <hr className="w-full h-0.5 bg-gray-300 my-2" />
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3 m-2">
                        <p className="font-bold">Id: <span className="text-gray-500">{user?.id}</span></p>
                        <p className="font-bold">Cliente: <span className="text-gray-500">{user?.firstName} {user?.lastName}</span></p>
                        <p className="font-bold">Complete los datos:</p>
                        <div className="flex gap-2 items-center">
                        {/* Hora y fecha de la reserva */}
                            <div className="flex flex-col">
                                <label htmlFor="reservationTime" className="font-bold">Hora:</label>
                                <input
                                    className="w-fit h-6 rounded"
                                    type="time"
                                    id="reservationTime"
                                    value={reservationTime}
                                    onChange={(e) => setReservationTime(e.target.value)}
                                    min="12:00" // Establecer el valor mínimo como las 12 del mediodía
                                    max="23:59" // Establecer el valor máximo como las 11:59 de la noche
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="reservationDate" className="font-bold">Fecha:</label>
                                <input
                                    className="w-fit h-6 rounded"
                                    type="date"
                                    id="reservationDate"
                                    value={reservationDate}
                                    onChange={(e) => setReservationDate(e.target.value)}
                                    min={tomorrowFormatted} 
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="numberOfPeople" className="font-bold">Personas:</label>
                                <input
                                    className="w-16 h-6 p-2 rounded"
                                    type="number"
                                    id="numberOfPeople"
                                    value={numberOfPeople}
                                    onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
                                    min="1"
                                    required
                                />
                            </div>
                        </div>
                        <p className="text-red-700 text-sm">Horario disponible: 12:00 - 23:59</p>
                        <hr className="w-full h-0.5 bg-gray-300 my-2"/>
                        <div className="flex flex-col">
                            <label htmlFor="cardNumber" className="font-bold">Nombre del Propietario:</label>
                            <input
                                className="w-100 h-6 p-2 rounded"
                                type="text"
                                id="cardName"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="cardNumber" className="font-bold">Número de Tarjeta:</label>
                            <input
                                className="w-100 h-6 p-2 rounded"
                                type="number"
                                id="cardNumber"
                                required
                            />
                        </div>
                        <div className="flex gap-2">
                            <div className="flex flex-col gap-2 ">
                                <label htmlFor="expirationDate" className="font-bold">Fecha de Caducidad:</label>
                                <input
                                    className="w-fit h-6 rounded p-2"
                                    type="month"
                                    id="expirationDate"
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="securityCode" className="font-bold">CVV:</label>
                                <input
                                 className="w-12 h-6 rounded p-2"
                                    type="text"
                                    id="securityCode"
                                    pattern="[a-zA-Z]{3}"
                                    maxLength="3"
                                    required
                                />
                            </div>
                            <hr />
                        </div>
                        <hr className="w-full h-0.5 bg-gray-300 my-2"/>
                        <p className="text-xl font-medium">Precio Total: {totalPrice}€</p>
                        <button
                            type="submit"
                            className="bg-red-700 text-white p-2 rounded"
                            onClick={handlePaymentClick} // Llama a handlePaymentClick en lugar de handleSubmit directamente
                            disabled={isSubmitting} // Deshabilita el botón mientras se está procesando la solicitud
                        >
                            {isSubmitting ? 'Reserva Hecha' : 'Pagar'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}