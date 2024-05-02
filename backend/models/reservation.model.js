import { Schema, model, models } from "mongoose";

const reservationSchema = new Schema({
    total_price: {
        type: Number,
        required: true,
        min: 0
    },
    time: {
        type: String,
        required: true
    },
    number_of_person: {
        type: Number,
        required: true,
        min: 1
    },
    date: {
        type: Date,
        required: true
    }
});

const Reservation =models.Reservation || model("Reservation", reservationSchema);

export default Reservation;