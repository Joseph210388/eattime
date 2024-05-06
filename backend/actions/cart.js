'use server';
import { mongoConnect } from "../connection";
import Cart from "../models/cart.model";
import Dish from "../models/dish.model";


/* obtener todos los platillos en cart */
export async function getCartItems(userId) {
    try {
        /* hacer la conexion */
        await mongoConnect();

        let cart;
        if (userId) {
            // Si se proporciona un userId, buscar el carrito asociado a ese usuario
            cart = await Cart.findOne({ userId });
        } else {
            // Si no se proporciona un userId, buscar cualquier carrito (esto podría ser útil para propósitos de administración o depuración)
            cart = await Cart.findOne();
        }
        
        if (!cart) {
            // Si no se encuentra el carrito, retornar un array vacío
            return [];
        }
        
        // Devolver los items del carrito
        return JSON.parse(JSON.stringify(cart.items)); // Devolvemos solo los items del carrito
    } catch (error) {
        console.error("Error al obtener los platillos del carrito:", error);
        throw error;
    }
}

/* Añadir un platillo al carrito */
export async function addDishToCart(dishId) {
    try {
        /* Hacer la conexión */
        await mongoConnect();
        
        /* Buscar el carrito del usuario actual (asumimos que ya se ha autenticado) */
        const cart = await Cart.findOne();
        
        /* Si el carrito no existe, lanzar un error */
        if (!cart) {
            throw new Error("No se encontró el carrito del usuario");
        }
        
        /* Verificar si el platillo ya está en el carrito */
        const existingItem = cart.items.find(item => item.dishId.toString() === dishId.toString());
        
        /* Si el platillo ya está en el carrito, incrementar su cantidad */
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            /* Si el platillo no está en el carrito, agregarlo */
            const dish = await Dish.findById(dishId);
            cart.items.push({ 
                dishId: dish._id, 
                quantity: 1, 
                dishName: dish.name, 
                dishImage: dish.image, 
                dishPrice: dish.price, 
                dishCategory: dish.category 
            });
        }
        
        /* Guardar el carrito actualizado en la base de datos */
        await cart.save();
        
        /* Retornar el carrito actualizado */
        return JSON.parse(JSON.stringify(cart));
    } catch (error) {
        console.error("Error al añadir un platillo al carrito:", error);
        throw error;
    }
}