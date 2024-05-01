import React from "react";


export default function Contact(){
    return(
        <div>
            <section className="mb-24 flex flex-col">
            <div id="map" className="relative h-[300px] overflow-hidden bg-cover bg-[50%] bg-no-repeat w-100">
                <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11672.945750644447!2d-122.42107853750231!3d37.7730507907087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858070cc2fbd55%3A0xa71491d736f62d5c!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1619524992238!5m2!1sen!2sus"
                width="100%" height="480" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
            </div>
            <div className="container px-6 md:px-12 m-auto">
                <div className="block rounded-lg bg-[hsla(0,0%,100%,0.8)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] md:py-16 md:px-12 -mt-[100px] backdrop-blur-[30px] border border-gray-300">
                <div className="flex flex-wrap">
                    {/* Formulario */}
                    <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-6/12 lg:px-6">
                        <h2 className="my-6 text-2xl tracking-tight font-extrabold text-stone-900 sm:text-3xl md:text-4xl">Contacta con Nosotros</h2>
                    <form>
                    <div className="relative mb-6" data-te-input-wrapper-init>
                        <label
                            for="username"
                            className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-red-600 focus-within:ring-1 focus-within:ring-red-600"
                        >
                            <input
                                type="text"
                                id="Username"
                                className="peer w-full border-none bg-transparent p-3 placeholder-transparent focus:border-transparent  focus:outline-none focus:ring-0"
                                placeholder="Username"
                            />
                            <span
                                className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-slate-50 p-0.5 text-neutral-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                            >
                                Username
                            </span>
                        </label>
                    </div>
                    <div className="relative mb-6" data-te-input-wrapper-init>
                        <label
                            for="email"
                            className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-red-600 focus-within:ring-1 focus-within:ring-red-600"
                        >
                            <input
                                type="email"
                                id="email"
                                className="peer w-full border-none bg-transparent p-3 placeholder-transparent focus:border-transparent  focus:outline-none focus:ring-0"
                                placeholder="Email"
                            />
                            <span
                                className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-neutral-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                            >
                                Email
                            </span>
                        </label>
                    </div>
                    <div className="relative mb-6" data-te-input-wrapper-init>
                        <label
                            for="username"
                            className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-red-600 focus-within:ring-1 focus-within:ring-red-600"
                        >
                            <textarea
                                id="Username"
                                className="peer w-full border-none bg-transparent p-3 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                                placeholder="Descripcion"
                            ></textarea>
                            <span
                                className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-neutral-500 transition-all peer-placeholder-shown:left-1.2  peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                            >
                                Descripción
                            </span>
                        </label>
                    </div>
                    
                    <button type="submit"
                        className="mb-6 w-full rounded bg-red-700 hover:bg-red-500 text-white px-6 pt-2.5 pb-2 text-s font-medium uppercase leading-normal   lg:mb-0">
                        Enviar
                    </button>
                </form>
            </div>
            {/* Información de contacto */}
                    <div className="w-full shrink-0 grow-0 basis-auto lg:w-6/12">
                    <div className="flex flex-wrap">
                        <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:w-6/12">
                            <div className="flex items-start">
                                <div className="shrink-0">
                                    <div className="inline-block rounded-md bg-red-600 p-4 text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-building-fill text-white" viewBox="0 0 16 16">
                                        <path d="M3 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3v-3.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V16h3a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm1 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5M4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5"/>
                                    </svg>
                                    </div>
                                </div>
                                <div className="ml-6 grow">
                                    <p className="mb-2 font-bold">Dirrección</p>
                                    <p className="text-sm text-neutral-500">C/ Geary Blvd 109</p>
                                </div>
                            </div>
                        </div>
                        <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:w-6/12">
                            <div className="flex items-start">
                                <div className="shrink-0">
                                    <div className="inline-block rounded-md bg-red-600 p-4 text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-fill text-white" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                                    </svg>
                                    </div>
                                </div>
                                <div className="ml-6 grow">
                                    <p className="mb-2 font-bold">Telefono</p>

                                    <p className="text-sm text-neutral-500">1-600-890-4567</p>
                                </div>
                            </div>
                        </div>
                        <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:w-6/12">
                            <div className="flex items-start">
                                <div className="shrink-0">
                                    <div className="inline-block rounded-md bg-red-600 p-4 text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill text-white" viewBox="0 0 16 16">
                                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
                                    </svg>
                                    </div>
                                </div>
                                <div className="ml-6 grow">
                                    <p className="mb-2 font-bold">Correo</p>
                                    <p className="text-sm text-neutral-500">example@gmail.com</p>
                                </div>
                            </div>
                        </div>
                        <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:w-6/12">
                            <div className="flex items-start">
                                <div className="shrink-0">
                                    <div className="inline-block rounded-md bg-red-600 p-4 text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-phone-fill text-white" viewBox="0 0 16 16">
                                        <path d="M3 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm6 11a1 1 0 1 0-2 0 1 1 0 0 0 2 0"/>
                                    </svg>
                                    </div>
                                </div>
                                <div className="ml-6 grow">
                                    <p className="mb-2 font-bold">Celular</p>
                                    <p className="text-sm text-neutral-500">600-89-45-67</p>
                                </div>
                            </div>
                        </div>
                        {/* Otros detalles de contacto */}
                        {/* ... */}
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>
        </div>
    );
}