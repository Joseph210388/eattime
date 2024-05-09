'use server';
import { mongoConnect } from "../connection";
import Dish from "../models/dish.model";
import Cart from "../models/cart.model";
import User from "../models/user.model";

/* crea un carrito */
export async function createCart(userId){
    try {
        /* conectar la base de datos */
        console.log("Intentando conectar a la base de datos...");
        await mongoConnect();
        console.log("Conexión a la base de datos establecida correctamente.");

        console.log("UserID:", userId);

        // Verificar si el usuario ya tiene un carrito existente
        const existingCart = await findCartByUserId(userId);
        if (existingCart) {
            console.log("¡Ya existe un carrito para este usuario!");
            return existingCart; // Devolver el carrito existente si ya hay uno
        }

        /* crear un nuevo carrito asociado al usuario */
        console.log("Creando un nuevo carrito para el usuario...");
        const cart = await Cart.create({userId: userId});
        console.log("Nuevo carrito creado:", cart);

        return JSON.parse(JSON.stringify(cart));

    } catch (error) {
        console.error("Error al crear el carrito:", error);
        throw new Error('Error al crear el carrito.');
    }
}
/* Encuentra un carrito por userId */
export async function findCartByUserId(userId) {
    try {
        // Conectar a la base de datos
        await mongoConnect();

        // Buscar el carrito por userId
        const cart = await Cart.findOne({ userId });

        // Si no se encuentra el carrito, retornar null
        return cart ? JSON.parse(JSON.stringify(cart)) : null;
    } catch (error) {
        console.error("Error al encontrar el carrito:", error);
        throw new Error('Error al encontrar el carrito.');
    }
}

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
export async function addDishToCart(userId, cartId, dishId) {
    try {
      // Hace la conexión a la base de datos
      await mongoConnect();
  
      // Verifica si el platillo existe
      const dish = await Dish.findOne({ _id: dishId });
      if (!dish) {
        throw new Error('Platillo no encontrado.');
      }
  
      // Busca el carrito del usuario
      let cart = await Cart.findById(cartId);
  
      // Si el carrito no existe, lanza un error
      if (!cart) {
        throw new Error('Carrito no encontrado.');
      }
  
      // Verifica si el platillo ya está en el carrito
      const existingItemIndex = cart.items.findIndex(item => String(item.dishId) === dishId);
  
      // Si el platillo ya está en el carrito, actualiza la cantidad
      if (existingItemIndex !== -1) {
        cart.items[existingItemIndex].quantity += 1;
      } else {
        // Si el platillo no está en el carrito, lo añade
        cart.items.push({
          dishId: dish._id,
          dishName: dish.name,
          dishImage: dish.image,
          dishPrice: dish.price,
          dishCategory: dish.category,
          quantity: 1 // Añade una cantidad inicial de 1
        });
      }
  
      // Guarda el carrito actualizado en la base de datos
      await cart.save();
  
      // Retorna el carrito actualizado
      return cart;
    } catch (error) {
      console.error('Error al añadir el platillo al carrito:', error);
      throw new Error('Error al añadir el platillo al carrito.');
    }
  }

// Elimina un platillo del carrito
export async function deleteCartItem(userId, dishId) {
  try {
      // Encuentra el carrito del usuario por userId
      const cart = await Cart.findOne({ userId });

      // Si no se encuentra el carrito, lanza un error
      if (!cart) {
          throw new Error("Carrito no encontrado.");
      }

      // Elimina el platillo del carrito
      const updatedItems = cart.items.filter(item => String(item.dishId) !== dishId);
      cart.items = updatedItems;
      await cart.save();

      return true; // Indica que se eliminó el platillo correctamente
  } catch (error) {
      console.error("Error al eliminar el platillo del carrito:", error);
      throw new Error("Error al eliminar el platillo del carrito.");
  }
}
// Elimina todos los productos del carrito del usuario
export async function deleteAllCartItems(userId) {
  try {
      // Encuentra el carrito del usuario por su ID
      const cart = await Cart.findOne({ userId });

      // Si no se encuentra el carrito, lanza un error
      if (!cart) {
          throw new Error("Carrito no encontrado.");
      }

      // Establece el arreglo de ítems como vacío para eliminar todos los productos del carrito
      cart.items = [];
      await cart.save();

      return true; // Indica que se eliminaron todos los productos del carrito correctamente
  } catch (error) {
      console.error('Error al eliminar todos los productos del carrito:', error);
      throw new Error('Error al eliminar todos los productos del carrito.');
  }
}