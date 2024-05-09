'use client';
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { getReservationsByUser } from "../../backend/actions/reservation";

export default function Reservation(){

    const { user } = useUser();
    const userId = user?.id;
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchReservations() {
            try {
                const userReservations = await getReservationsByUser(userId);
                setReservations(userReservations);
            } catch (error) {
                console.error("Error al obtener las reservas del usuario:", error);
            }
        }
        if (userId) {
            fetchReservations();
        }
    }, [userId]);

    return(
        <>
            <div className="bg-stone-200 lg:h-screen p-3 md:p-10">
                <span className="flex items-center">
                    <span className="h-px flex-1 bg-red-700"></span>
                        <h1 className="text-3xl mb-2 font-semibold px-6">
                            Reservas de {user?.firstName} {user?.lastName}
                        </h1>
                    <span className="h-px flex-1 bg-red-700"></span>
                </span>

                    <div className="flex flex-col pt-6 lg:flex-row ">
                        <div className="lg:w-3/5 lg:px-12 py-8 lg:py-3">
                            {reservations.length === 0 ? (
                                <p>No tienes reservas.</p>
                            ) : (
                                <ul>
                                    {reservations.map((reservation, index) => (
                                        <li key={index}>
                                            <div className="w-fit flex gap-12 bg-white border border-red-500 rounded-xl p-4">
                                                <div>
                                                        <p className="font-bold">Id: </p><span className="text-gray-500 font-bold">{reservation._id}</span>
                                                        <p className="font-bold">Nombre del Cliente: </p><span className="font-bold text-gray-500">{user?.firstName} {user?.lastName}</span>
                                                        <p className="font-bold">Platillos:</p>
                                                    <ul>
                                                        {reservation.dishDetail.map((dish, dishIndex) => (
                                                            <li key={dishIndex} className="flex gap-2 items-center">
                                                                <p className="text-sm">{dish.quantity}X </p><p>{dish.dishName} </p>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold">Precio: </p><span>{reservation.total_price}€</span>
                                                    <div>
                                                        <p className="font-bold">Fecha y Hora: </p><p>{reservation. reservationDate.slice(0, 10)} </p><span>{reservation.reservationTime}</span>
                                                    </div>
                                                    <p className="font-bold">Personas:</p> <span>{reservation.numberOfPeople}</span>
                                                    {/* Mostrar otros detalles de la reserva según sea necesario */}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

            </div>
        </>
    );
}