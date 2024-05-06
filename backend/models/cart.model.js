import { Schema, model, models } from "mongoose";
import User from './user.model';
import Dish from "./dish.model";

const cartSchema = new Schema({
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
    }]
});

const Cart = models.Cart || model("Cart", cartSchema);

export default Cart;