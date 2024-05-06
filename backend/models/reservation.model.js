import { Schema, model, models } from "mongoose";
import Cart from './cart.model';
import User from './user.model';

const reservationSchema = new Schema({
    
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cartId: {
        type: Schema.Types.ObjectId,
        ref: 'Cart',
        required: true
    },
    items: [{
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

// Antes de guardar la reserva, calcular el precio total
reservationSchema.pre('save', async function(next) {
    try {
        // Obtener el carrito asociado a esta reserva
        const cart = await Cart.findById(this.cartId).populate('items.dishId');

        // Mapear los items del carrito a los items de la reserva con los nombres de los platillos
        this.items = cart.items.map(item => ({
            dishName: item.dishId.name,
            quantity: item.quantity
        }));

        // Calcular el precio total basado en los precios de los platillos en el carrito
        this.total_price = cart.items.reduce((total, item) => {
            return total + (item.dishId.price * item.quantity);
        }, 0);

        next();
    } catch (error) {
        next(error);
    }
});

const Reservation =models.Reservation || model("Reservation", reservationSchema);

export default Reservation;