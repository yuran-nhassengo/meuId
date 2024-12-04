'use client'
import Link from 'next/link';

export default function Introducao() {
    return (
      <section className=" py-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-extraboldmb-4">
            Perdeu um documento? Encontrou algo importante?
          </h1>
          <p className="text-lg  mb-6">
            Nossa plataforma conecta quem perdeu com quem encontrou. Seja publicando ou buscando documentos, 
            estamos aqui para tornar esse processo mais rápido, seguro e eficiente. Junte-se a nós e faça parte 
            dessa comunidade de ajuda mútua!
          </p>
          <div className="flex justify-center space-x-4">
           <Link
             href="/publish"
             className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg shadow-md hover:bg-blue-700 transition-all"
           >
             Saber mais
           </Link>
             </div>
           </div>
      </section>
    );
  }
  