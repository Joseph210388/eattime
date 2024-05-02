import { Schema, model, models } from "mongoose";

const orderSchema = new Schema({
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
});

const Order =models.Order || model("Order", orderSchema);

export default Order;
