'use client';
import Link from "next/link";
import React from "react";

const Filtronav: React.FC = () => {
    
  
  return (     
     <div className="flex justify-center space-x-4">
    <Link
      href="/publish"
      className="m-6 text-black px-6 py-6  text-lg shadow-md hover:bg-blue-700 transition-all"
    >

        Buscar Documento
      </Link>
      
    </div>
  );
};

export default Filtronav;
