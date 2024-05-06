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
        /* crea un carrito asociado al usaurio */
        const newCart = await Cart.create({ userId: newUser._id });

        return JSON.parse(JSON.stringify(newUser));
    }catch(error){
        console.log(error);
    }
}