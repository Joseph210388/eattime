

import React from "react";
import { getDishById } from "@/backend/actions/dish";



const DishDetailPage= async({params: {id}}) => {
    
    const dish = await getDishById(id);
    

    return (
        <>
                <h1>{dish.name}</h1>
                <p>{dish.description}</p>
                <p>{dish.price}</p>
        </>
    );
}

export default DishDetailPage;