'use server';
import { mongoConnect } from "../connection";
import Dish from "../models/dish.model";
import Cart from "../models/cart.model"

/* obtener todos los platillos en cart */
export async function getCartItems(userId) {
  try {
      // Hace la conexión a la base de datos
      await mongoConnect();

      // Busca el carrito del usuario
      const cart = await Cart.findOne({ userId }).populate('items.dishId');
      
      // Si no se encuentra el carrito o está vacío, retorna un arreglo vacío
      if (!cart || !cart.items.length) {
          return [];
      }

      // Retorna los platillos del carrito
      return cart.items.map(item => ({
          dishId: item.dishId._id,
          dishName: item.dishName,
          dishImage: item.dishImage,
          dishPrice: item.dishPrice,
          dishCategory: item.dishCategory,
          quantity: item.quantity
      }));
  } catch (error) {
      console.log(error);
      throw new Error('Error al obtener los platillos del carrito.');
  }
}

// Función para añadir un platillo al carrito
export async function addDishToCart(userId,id) {
  try {
      // Hace la conexión a la base de datos
      await mongoConnect();

      // Verifica si el platillo existe
      const dish = await Dish.findOne({_id: id});
      if (dish === null) {
          throw new Error('Platillo no encontrado.');
      }

      // Busca el carrito del usuario
      let cart = await Cart.findOne({ userId });

      // Si el carrito no existe, lo crea
      if (!cart) {
          cart = await Cart.create({ userId, items: [] });
      }

      // Verifica si el platillo ya está en el carrito
      const existingItemIndex = cart.items.findIndex(item => String(item.dishId) === id);

      // Si el platillo ya está en el carrito, actualiza la cantidad
      if (existingItemIndex !== -1) {
          cart.items[existingItemIndex].quantity += quantity;
      } else {
          // Si el platillo no está en el carrito, lo añade
          cart.items.push({
              dishId: dish._id,
              dishName: dish.name,
              dishImage: dish.image,
              dishPrice: dish.price,
              dishCategory: dish.category,
              quantity
          });
      }

      // Retorna el carrito actualizado
      return cart;
  } catch (error) {
      console.log(error);
      throw new Error('Error al añadir el platillo al carrito.');
  }
}