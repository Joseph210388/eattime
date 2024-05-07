import { Schema, model, models } from "mongoose";
import User from './user.model';

const reservationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dishDetail: [{
        dishName: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
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