export const ModalError = ({ isOpen, onClose, title, message }: { isOpen: boolean, onClose: () => void, title: string, message: string }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className=" bg-gray-200 dark:bg-gray-900  rounded-lg p-6 max-w-sm w-full m-4">
                <h2 className="text-lg font-semibold mb-4">{title}</h2>
                <p className=" mb-6">{message}</p>
                <button
                    onClick={onClose}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
                >
                    Fechar
                </button>
            </div>
        </div>
    );
};
