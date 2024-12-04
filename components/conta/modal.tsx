import Link from "next/link";
import { AiOutlineCheckCircle } from "react-icons/ai";  // Importando o ícone de check
import React, { useEffect, useState } from "react";

export const Modal = ({ isOpen, onClose, title, message }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-gray-200 dark:bg-gray-900 rounded-lg shadow-lg p-6 w-11/12 sm:w-2/5">
                {/* Ícone com animação de scale */}
                <div className="flex justify-center animate-pulse mb-4">
                    <AiOutlineCheckCircle
                        className={`text-green-500 text-8xl transition-all duration-500 ease-in-out ${
                            isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
                        }`}
                    />
                </div>
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <p className="mb-6">{message}</p>
                <div className="flex justify-end">
                    <Link href={"/"}>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                            Fechar
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
