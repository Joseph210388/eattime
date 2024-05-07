'use server';
import { mongoConnect } from "../connection";
import User from "../models/user.model";
import Cart from "../models/cart.model";

/* Logica para crear usuario */
export async function createUser (user){
    try{
        /* hacer la conexion */
        await mongoConnect();
        /* crear un nuevo usuario utilizando el modelo de usuario */
        const newUser = await User.create(user);

        // Crear un carrito asociado al nuevo usuario
        const newCart = await Cart.create({clerkIdUser: newUser.clerkId, items: [] });

        return JSON.parse(JSON.stringify(newUser));
    }catch(error){
        console.log(error);
    }
}
