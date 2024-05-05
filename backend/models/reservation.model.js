import { Schema, model, models } from "mongoose";
import Dish from './dish.model';

const reservationSchema = new Schema({
    
    dishes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dish',
        required: true
    }],
    
    total_price: {
        type: Number,
        required: true,
        min: 0
    },
    numberOfPeople: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const Reservation =models.Reservation || model("Reservation", reservationSchema);

export default Reservation;