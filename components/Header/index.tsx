'use client'; 

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react'; // Importar useState e useEffect

export const Header = () => {
  const pathname = usePathname();
  const [isSticky, setSticky] = useState(false);

  // Função para monitorar a rolagem da página
  const handleScroll = () => {
    setSticky(window.scrollY > 100); // Adiciona a classe sticky quando o scroll passar de 100px
  };

  // Adiciona e remove o event listener corretamente
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Cleanup - remove o event listener quando o componente for desmontado
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // O useEffect roda apenas uma vez ao montar o componente

  return (
    <div
      className={`w-full ${
        isSticky
          ? 'sticky top-0 left-0 dark:bg-black bg-gray-50 right-0 border-b'
          : 'dark:bg-black bg-gray-50 duration-300 transition-colors ease-in-out'
      } fixed top-0 left-0 right-0 z-50`}
    >
      <div className="max-w-7xl mx-auto md:px-4 px-2">
        <div className="rounded-md flex justify-between items-center md:px-6 py-2 space-x-2">
          <h1 className="text-xl font-semibold">Meu ID</h1>

          <nav className="flex space-x-2 border-2 dark:border-white/30 p-1 rounded-2xl">
            <Link
              href="/"
              className={`px-4 py-2 rounded-xl ${
                pathname === '/'
                  ? 'bg-blue-500 hover:bg-blue-500 text-white'
                  : 'dark:hover:bg-gray-600 hover:bg-gray-100'
              } hover:px-6 transition-all duration-300 ease-in-out `}
            >
              Home
            </Link>
            <Link
              href="/perfil"
              className={`px-4 py-2 rounded-xl ${
                pathname === '/perfil'
                  ? 'bg-blue-500 hover:bg-blue-500 text-white'
                  : 'dark:hover:bg-gray-600 hover:bg-gray-100'
              } hover:px-6 transition-all duration-300 ease-in-out `}
            >
              Perfil
            </Link>
          </nav>

          <div className="flex space-x-2">
            <Link
              href="/login"
              className={`rounded-2xl ${
                pathname === '/login'
                  ? 'bg-blue-500 text-white dark:hover:text-inherit hover:bg-blue-500'
                  : 'dark:hover:bg-gray-700 hover:bg-gray-200'
              } transition-all duration-50 ease-in-out`}
            >
              <button className="px-4 py-2 border-2 rounded-2xl hover:bg-inherit dark:hover:bg-inherit dark:border-gray-700 hover:px-6 transition-all duration-300 ease-in-out ">
                Login
              </button>
            </Link>
            <button className="px-4 py-2 border rounded-2xl bg-black text-white hover:bg-blue-600 dark:hover:bg-white/80 dark:bg-white dark:text-black hover:px-6 transition-all duration-300 ease-in-out">
              Inscrever-se
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
