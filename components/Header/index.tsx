'use client'; 

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Header = () => {
    const pathname = usePathname();  

    return (
        <div className="bg-transparent w-full py-1">
            <div className="max-w-7xl mx-auto md:px-4 px-1">
                <div className=" rounded-md flex justify-between items-center px-6 py-3 space-x-4">
                    <h1 className="text-xl font-semibold">Meu ID</h1>

                    <nav className="flex space-x-2  border-2 dark:border-white/30 p-1 rounded-2xl">
                        <Link
                            href="/"
                            className={`px-4 py-2 rounded-xl ${
                                pathname === '/' ? 'bg-blue-500 hover:bg-blue-500 text-white ' : 'dark:hover:bg-gray-600'
                            } hover:bg-gray-100 hover:px-6 transition-all duration-300 ease-in-out `}
                        >
                            Home
                        </Link>
                        <Link
                            href="/perfil"
                            className={`px-4 py-2 rounded-xl  ${
                                pathname === '/perfil' ? 'bg-blue-500 hover:bg-blue-500 text-white' : 'dark:hover:bg-gray-600 '
                            } hover:bg-gray-100 hover:px-6 transition-all duration-300 ease-in-out `}
                        >
                            Perfil
                        </Link>
                    </nav>

                    <div className="flex space-x-4">
                        <button className="px-4 py-2 border-2 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-700 dark:bg-gray-800  dark:border-gray-700 hover:px-6 transition-all duration-300 ease-in-out">Login</button>
                        <button className="px-4 py-2 border  rounded-2xl bg-black text-white hover:bg-blue-600 dark:hover:bg-white/80 dark:bg-white dark:text-black hover:px-6 transition-all duration-300 ease-in-out">Inscrever-se</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
