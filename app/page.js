/* imagen */
import Image from "next/image";
import Logo from '../public/icons/logo.png';


export default function Home() {
  return (
    <>
    <div className="relative z-0 bg-stone-600 h-screen text-white overflow-hidden">
        <div className="absolute inset-0">
        <video
          src="https://videos.pexels.com/video-files/2894881/2894881-uhd_3840_2160_24fps.mp4" 
          autoPlay
          loop
          muted
          className="object-cover object-center w-full h-full"
        ></video>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
          <Image src={Logo} width={60} height={70} className="m-5" alt="TayPay Logo" />
          <h1 className="text-5xl font-bold leading-tight mb-4">Explosión de sabores de Perú</h1>
          <h2 className="text-2xl font-bold leading-tight mb-4">Delicia Peruana</h2>
          <p className="text-lg text-gray-300 mb-8">Sabor a la tradición, en el corazón del Amazonas.</p>
          <a href="/food" className="bg-red-700 text-white-900 hover:bg-white hover:text-black py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">Haz tu Reserva</a>
        </div>
      </div>
    </>
  );
}
