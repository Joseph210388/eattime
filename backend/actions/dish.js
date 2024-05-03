'use server';

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
/* obtener un platillo por ID */
export async function getDishById(id) {
    try {
        await mongoConnect();
        const dish = await Dish.findOne({_id: id});
        return JSON.parse(JSON.stringify(dish));
    } catch (error) {
        console.error("Error al obtener el platillo por ID:", error);
        throw error;
    }
}