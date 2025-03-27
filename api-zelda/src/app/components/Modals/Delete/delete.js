"use client";

export default function Delete({ isOpen, onClose, onConfirm, itemName }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
            onClick={onClose}>
            <div className="bg-white w-full max-w-md rounded-lg shadow-xl p-6"
                onClick={e => e.stopPropagation()}>
                <div className="text-center">
                    <svg className="mx-auto mb-4 w-14 h-14 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>

                    <h3 className="text-xl font-medium text-gray-900 mb-2">¿Estás seguro?</h3>
                    <p className="text-gray-500 mb-6">
                        ¿Realmente deseas eliminar <span className="font-semibold">{itemName}</span>?
                        <br />Esta acción no se puede deshacer.
                    </p>

                    <div className="flex justify-center space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={onConfirm}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        >
                            Sí, eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}