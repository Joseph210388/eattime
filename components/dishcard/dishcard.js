'use client';

import React from "react";
import Link from "next/link";

export default function DishCard({dish}){
    return(

        <>
            <div  className="group relative block overflow-hidden">
                <Link href={`/dish/${dish._id}`}>
                    <img
                        src={dish.image}
                        alt=""
                        className="h-64 w-full rounded-t-xl object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                    />
                </Link>

                <div className="relative border rounded-b-xl border-gray-100 bg-white p-6">
                    <span className="whitespace-nowrap rounded-xl bg-red-800 text-white px-3 py-1.5 text-xs font-medium"> {dish.category} </span>
                    
                    
                        <h3 className="mt-4 text-lg font-medium  text-gray-900">
                            <Link href={`/dish/${dish._id}`} className="hover:text-red-700 hover:underline ">
                                {dish.name}
                            </Link>
                        </h3>
                    
                    <p className="mt-1.5 text-sm text-gray-700">{dish.price}€</p>

                    <form className="mt-4">
                    <button
                        className="block w-full rounded bg-red-800 text-white p-4 text-sm font-medium transition hover:scale-105"
                    >
                        Add to Cart
                    </button>
                    </form>
                </div>
            </div>
        </>
    );
}