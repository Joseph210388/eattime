import { Schema, model, models } from "mongoose";

const paymentSchema = new Schema({
    amount: {
        type: Number,
        required: true,
        min: 0
    }
});

const Payment =models.Payment || model ("Payment", paymentSchema);

export default Payment;
