import { Schema, model, models } from "mongoose";
import User from './user.model';

const reservationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    dishDetail: [{
        dishName: {
            type: String
        },
        quantity: {
            type: Number
        }
        
    }],
    total_price: {
        type: Number,
        min: 0
    },
    numberOfPeople: {
        type: Number
    },
    date: {
        type: Date
    }
});


const Reservation =models.Reservation || model("Reservation", reservationSchema);

export default Reservation;