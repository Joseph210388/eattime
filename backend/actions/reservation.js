'use server';
import { mongoConnect } from "../connection";
import Reservation from "../models/reservation.model";

export async function createReservation(userId, dishDetail, totalPrice, reservationDate, reservationTime, numberOfPeople) {
    try {
        await mongoConnect();
        const reservation = await Reservation.create({
            userId,
            dishDetail,
            total_price: totalPrice,
            reservationDate,
            reservationTime,
            numberOfPeople
        });
        return reservation;
    } catch (error) {
        console.error('Error al crear la reserva:', error);
        throw error;
    }
}
export async function findReservationByUser(userId){
    try {
        await mongoConnect();
        const reservations = await Reservation.findOne({ userId });
        return reservations;
    } catch (error) {
        console.error('Error al buscar reservaciones por usuario:', error);
        throw error;
    }
}
/* obtener los datos de la reserva */
export async function getReservationsByUser(userId) {
    try {
        await mongoConnect();
        const reservations = await Reservation.find({ userId });
        return JSON.parse(JSON.stringify(reservations));
    } catch (error) {
        console.error('Error al obtener las reservas del usuario:', error);
        throw error;
    }
}