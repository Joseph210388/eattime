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
                                            <div className="w-fit border border-red-500 rounded-xl p-4">
                                                <p className="font-bold">Id: <span className="text-gray-500">{user?.id}</span></p>
                                                <p className="font-bold">Cliente: <span className="text-gray-500">{user?.firstName} {user?.lastName}</span></p>
                                                <p className="font-bold">Precio: </p><span>{reservation.total_price}€</span>
                                                <p>Fecha: {reservation. reservationDate.slice(0, 10)}</p>
                                                <p>Hora: {reservation.reservationTime}</p>
                                                <p>Personas: {reservation.numberOfPeople}</p>
                                                {/* Mostrar otros detalles de la reserva según sea necesario */}
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