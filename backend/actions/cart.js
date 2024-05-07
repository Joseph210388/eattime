'use server';
import { mongoConnect } from "../connection";
import User from "../models/user.model";
import Dish from "../models/dish.model";
import Cart from "../models/cart.model"

/* obtener todos los platillos en cart */
export async function getCartItems(clerkId) {
    try {
        /* hacer la conexion */
        await mongoConnect();

        /* Busca al usuario por su id */
        const user = await User.findById(clerkId);

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
export async function addDishToCart(dishId) {
    try {
      await mongoConnect(); // Conectar a la base de datos

      // Buscar al usuario 
        const user = await User.findById();
        if (!user) {
            console.error("Usuario no encontrado con el id:", user);
            throw new Error("Usuario no encontrado");
        }

        // Buscar el platillo por su ID
        const dishToAdd = await Dish.findById(dishId);
        if (!dishToAdd) {
            throw new Error("El platillo no existe");
        }

        // Añadir el plato al carrito del usuario
        cart.items.push({
            dishId: dishToAdd._id,
            quantity: 1,
            dishName: dishToAdd.name,
            dishImage: dishToAdd.image,
            dishPrice: dishToAdd.price,
            dishCategory: dishToAdd.category
        });

        await cart.save();
        return cart.items;
    } catch (error) {
      console.error("Error al agregar plato al carrito:", error);
    } finally {
      console.clear(); // Limpiar la consola
    }
  }