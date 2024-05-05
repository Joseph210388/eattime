import { Schema, model, models } from "mongoose";
import User from './user.model';

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
        }
    }]
});

const Cart = models.Cart || model("Cart", cartSchema);

export default Cart;