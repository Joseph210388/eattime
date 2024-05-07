'use server';
import { mongoConnect } from "../connection";
import User from "../models/user.model";
import Dish from "../models/dish.model";

/* obtener todos los platillos en cart */
export async function getCartItems(_id) {
    try {
        /* hacer la conexion */
        await mongoConnect();

        /* Busca al usuario por su id */
        const user = await User.findById(_id);

        if (!user || !user.cart) {
            throw new Error("No se encontró el carrito del usuario");
        }
        /* Devolver los items del carrito del usuario */
        return user.cart;
    }catch{
        console.error("Error al obtener los platillos del carrito:", error);
        throw error;
    }
}

/* Añadir un platillo al carrito */
export async function addDishToCart(_id, dishId) {
    try {
        /* Hacer la conexión */
        await mongoConnect();
        
        /* Buscar el carrito del usuario actual (asumimos que ya se ha autenticado) */
        const user = await User.findById(_id);
        
        if (!user) {
            throw new Error("No se encontró el usuario");
        }
        // Verificar si el carrito existe en el usuario
        if (!user.cart) {
            // Si no existe, crear un carrito vacío
            user.cart = [];
        }
        
        /* Verificar si el platillo ya está en el carrito */
        const existingItem = user.cart.find(item => item.dishId.toString() === dishId.toString());
        
        /* Si el platillo ya está en el carrito, incrementar su cantidad */
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            /* Si el platillo no está en el carrito, agregarlo */
            const dish = await Dish.findById(dishId);
            if(!dish){
                throw new Error(`El plato no encontrado`);
            }
            user.cart.push({ 
                dishId: dish._id, 
                quantity: 1, 
                dishName: dish.name, 
                dishImage: dish.image, 
                dishPrice: dish.price, 
                dishCategory: dish.category 
            });
        }
        
        /* Guardar el carrito actualizado en la base de datos */
        await user.save();
        
        // Devolver los elementos del carrito actualizados
        return user.cart;
    } catch (error) {
        console.error("Error al añadir un platillo al carrito:", error);
        throw error;
    }
}