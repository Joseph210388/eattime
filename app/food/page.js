'use client'
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { format } from 'date-fns';
import Slider from "@/components/slider/slider";

export default function Food(){

    const { user } = useUser();
    const [fechaActual, setFechaActual] = useState(new Date());

    useEffect(() => {
        const intervalo = setInterval(() => {
            // Actualizar la fecha cada segundo
            setFechaActual(new Date());
        }, 1000);


        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(intervalo);
    }, []);

    return(
        <>
            <div className="bg-stone-200 flex-1 p-5 h-screen overflow-auto">
                <div>
                    {/* Slider */}
                    <Slider/>
                    {/* TITULO */}
                    <span className="flex items-center">
                        <span className="h-px flex-1 bg-red-700"></span>
                        <h1 className="text-3xl mb-2 font-semibold px-6">
                            Selecciona tus platillos <span className="text-red-700">{user?.firstName} {user?.lastName}</span>
                        </h1>
                        <span className="h-px flex-1 bg-red-700"></span>
                    </span>
                    {/* Fecha actual */}
                    <div className="flex flex-col text-left px-6 sm:text-center">
                        <span>Hoy</span>
                        <span>{format(fechaActual, 'dd/MM/yyyy')}</span>
                    </div>
                </div>
                {/* Platilos disponibles */}
                <div className="">
                    {/* Filtros */}

                    {/* para modificar los platillos hay que ir a foods componets */}
                </div>
            </div>
        </>
    );   
}
