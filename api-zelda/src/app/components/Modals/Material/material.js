"use client";

export default function Modal({ data, onClose }) {
    const {
        name,
        category,
        common_locations,
        cooking_effect,
        description,
        hearts_recovered,
        image,
    } = data;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
            onClick={onClose}>
            <div className="bg-white w-full max-w-3xl rounded-lg shadow-xl"
                onClick={e => e.stopPropagation()}>

                {/* header del modal */}
                <div className="flex justify-between items-center border-b border-gray-200 p-4">
                    <h2 className="text-2xl font-bold text-slate-800">{name}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                {/* contenido del modal */}
                <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/3">
                            <div className="h-64 rounded-lg overflow-hidden">
                                <img src={image} alt={`${name}_img`} className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="md:w-2/3">
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-slate-800">Categoría</h3>
                                <p className="text-slate-600">{category}</p>
                            </div>

                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-slate-800">Descripción</h3>
                                <p className="text-slate-600">{description}</p>
                            </div>

                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-slate-800">Efecto al cocinar</h3>
                                <p className="text-slate-600">{cooking_effect || "Sin efectos especiales"}</p>
                            </div>

                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-slate-800">Recuperación de corazones</h3>
                                <div className="flex items-center">
                                    <p className="text-slate-600 mr-2">{hearts_recovered}</p>
                                    {hearts_recovered > 0 && (
                                        <div className="flex">
                                            {[...Array(Math.floor(hearts_recovered))].map((_, i) => (
                                                <span key={i} className="text-red-500 text-xl">
                                                    <img src="/heart.png" className="w-10 h-auto" alt="hearts" />
                                                </span>
                                            ))}
                                            {hearts_recovered % 1 !== 0 && (
                                                <span className="text-red-500 text-xl">
                                                    <img src="/half-heart.png" className="w-10 h-auto" alt="hearts" />
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {common_locations && common_locations.length > 0 && (
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold text-slate-800">Ubicaciones comunes</h3>
                                    <ul className="list-disc list-inside text-slate-600">
                                        {common_locations.map((location, index) => (
                                            <li key={index}>{location}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* footer del modal */}
                <div className="border-t border-gray-200 p-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-slate-800 rounded-md hover:bg-gray-300"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}