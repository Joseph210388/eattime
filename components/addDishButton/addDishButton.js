'use client';

import React from "react";

const AddToCartButton = ({dish})=>{
    const addToCart = async ()=>{
        try {
            /* aqui puede implementar la logica para agregar el platillo al carrito */
            console.log("Adding dish to cart:", dish);
            /* se almacena el platillo en el localStorange */
            const cart = JSON.parse(localStorage.getItem("cart"))||[];
            localStorage.setItem("cart", JSON.stringify([...cart, dish]));
            alert("Dish added to cart successfully");

        } catch (error) {
            console.error("Error adding dish to cart:", error);
            alert("Error adding dish to cart. Please try again.");
        }
    }
    return(
        <button onClick={addToCart}>Add to Cart</button>
    );
}

export default AddToCartButton;