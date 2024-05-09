import { Schema, model, models } from "mongoose";

const reservationSchema = new Schema({
    userId: {
        type: String,
        required: true
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
    reservationDate: {
        type: Date, 
        required: true
    },
    reservationTime: {
        type: String, 
        required: true
    }
});


const Reservation =models.Reservation || model("Reservation", reservationSchema);

export default Reservation;