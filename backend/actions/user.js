'use server';
import { mongoConnect } from "../connection";
import User from "../models/user.model";

/* Logica para crear usuario */
export async function createUser (user){
    try{
        /* hacer la conexion */
        await mongoConnect();
        /* crear un nuevo usuario utilizando el modelo de usuario */
        const newUser = await User.create(user);
        

        return JSON.parse(JSON.stringify(newUser));
    }catch(error){
        console.log(error);
    }
}