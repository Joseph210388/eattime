'use server'

import { mongoConnect } from "../connection";
import Dish from "../models/dish.model";

/* Obtener todos los platillos */

export async function getAllDish(){
    try{
        /* hacer la conexion */
        await mongoConnect();
        /* Buscar los platillos */
        const dishes = await Dish.find();
        /* retornar dishes*/
        return JSON.parse(JSON.stringify(dishes))
    }catch(error){
        console.error("Error al obtener los platillos:", error);
        throw error;
    }
}