"use client";

export default function Modal({ data, onClose }) {
    const {
        name,
        category,
        common_locations,
        description,
        drops,
        image,
    } = data;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
            onClick={onClose}>
            <div className="w-full max-w-3xl rounded-lg shadow-xl border-3 border-[#CE9C39] bg-[#2A201F]"
                onClick={e => e.stopPropagation()}>

                {/* header del modal */}
                <div className="flex justify-between items-center border-b border-[#CE9C39] p-4">
                    <h2 className="text-2xl font-bold text-[#CE9C39]">{name}</h2>
                    <button
                        onClick={onClose}
                        className="text-[#CE9C39] hover:text-[#b8a070] focus:outline-none"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                {/* contenido del modal */}
                <div className="p-6 text-[#CE9C39]">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/3">
                            <div className="h-64 rounded-lg overflow-hidden border border-[#CE9C39]">
                                <img src={image} alt={`${name}_img`} className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="md:w-2/3">
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-[#CE9C39]">Categoría</h3>
                                <p className="text-[#b8a070]">{category}</p>
                            </div>

                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-[#CE9C39]">Descripción</h3>
                                <p className="text-[#b8a070]">{description}</p>
                            </div>

                            {drops && drops.length > 0 && (
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold text-[#CE9C39]">Objetos que deja caer</h3>
                                    <ul className="list-disc list-inside text-[#b8a070]">
                                        {drops.map((drop, index) => (
                                            <li key={index}>{drop}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {common_locations && common_locations.length > 0 && (
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold text-[#CE9C39]">Ubicaciones comunes</h3>
                                    <ul className="list-disc list-inside text-[#b8a070]">
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
                <div className="border-t border-[#CE9C39] p-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-[#11458C] text-white rounded-md hover:bg-[#11448ca6] transition-all shadow-md hover:shadow-lg"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}