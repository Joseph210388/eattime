import { Schema, model, models } from "mongoose";
import Reservation from "./reservation.model";
import Dish from "./dish.model";

const UserSchema = new Schema ({
    clerkId: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    cart: [{
        dishId: {
            type: Schema.Types.ObjectId,
            ref: 'Dish',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        dishName: {
            type: String,
            required: true
        },
        dishImage: {
            type: String,
            required: true
        },
        dishPrice: {
            type: Number,
            required: true
        },
        dishCategory: {
            type: String,
            required: true
        }
    }],
    reservation: [{
        type: Schema.Types.ObjectId, 
        ref: "Reservation"
    }]
})

const User = models.User || model('User', UserSchema)

export default User;