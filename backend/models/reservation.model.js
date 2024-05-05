import { Schema, model, models } from "mongoose";
import Dish from './dish.model';
import User from './user.model';

const reservationSchema = new Schema({
    
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        dishId: {
            type: Schema.Types.ObjectId,
            ref: 'Dish',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        }
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