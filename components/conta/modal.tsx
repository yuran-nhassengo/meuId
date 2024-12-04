import Link from "next/link";
import React from "react";

export const Modal = ({ isOpen, onClose, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-gray-200 dark:bg-gray-900 rounded-lg shadow-lg p-6 w-11/12 sm:w-96">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <p className=" mb-6">{message}</p>
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

