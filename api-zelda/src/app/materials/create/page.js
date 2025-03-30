'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateMaterial() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: '',
        hearts_recovered: 0,
        cooking_effect: '',
        id_num: '',
        category: 'materiales',
        common_locations: []
    });

    const [newLocation, setNewLocation] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleAddLocation = () => {
        if (newLocation.trim()) {
            setFormData(prev => ({
                ...prev,
                common_locations: [...prev.common_locations, newLocation.trim()]
            }));
            setNewLocation('');
        }
    };

    const handleRemoveLocation = (index) => {
        setFormData(prev => ({
            ...prev,
            common_locations: prev.common_locations.filter((_, i) => i !== index)
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            // Validaciones básicas
            if (!formData.name.trim()) {
                throw new Error('El nombre es obligatorio');
            }
            
            if (!formData.id_num.trim()) {
                throw new Error('El ID numérico es obligatorio');
            }
            
            console.log('Enviando datos:', formData);

            const response = await fetch('http://localhost:3001/materials', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const responseText = await response.text();
            console.log('Respuesta del servidor (texto):', responseText);
            
            let responseData;
            try {
                responseData = JSON.parse(responseText);
                console.log('Respuesta del servidor (JSON):', responseData);
            } catch (e) {
                console.log('La respuesta no es JSON válido');
            }

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${responseData?.error?.message || responseData?.message || 'Error desconocido'}`);
            }

            // Éxito - navegar de vuelta a la lista
            router.push('/materials');
        } catch (error) {
            console.error('Error completo:', error);
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 bg-[#2A201F] border-3 border-[#CE9C39] rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-6 text-[#CE9C39] border-b border-[#CE9C39] pb-2">CREAR NUEVO MATERIAL</h1>
            
            {error && (
                <div className="bg-[#3a2d2b] border-l-4 border-[#CC0914] text-[#b8a070] p-4 mb-4" role="alert">
                    <p className="font-bold text-[#CC0914]">Error</p>
                    <p>{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        {/* input ID */}
                        <div>
                            <label htmlFor="id_num" className="block text-sm font-medium text-[#CE9C39]">ID Numérico</label>
                            <input
                                type="text"
                                id="id_num"
                                name="id_num"
                                value={formData.id_num}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-[#CE9C39] rounded-md shadow-sm focus:outline-none focus:ring-[#CE9C39] focus:border-[#CE9C39] bg-[#3a2d2b] text-[#b8a070]"
                                required
                            />
                        </div>

                        {/* input de nombre */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-[#CE9C39]">Nombre</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-[#CE9C39] rounded-md shadow-sm focus:outline-none focus:ring-[#CE9C39] focus:border-[#CE9C39] bg-[#3a2d2b] text-[#b8a070]"
                                required
                            />
                        </div>

                        {/* input URL de imagen */}
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-[#CE9C39]">URL de la Imagen</label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-[#CE9C39] rounded-md shadow-sm focus:outline-none focus:ring-[#CE9C39] focus:border-[#CE9C39] bg-[#3a2d2b] text-[#b8a070]"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        {/* input Categoría */}
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-[#CE9C39]">Categoría</label>
                            <input
                                type="text"
                                id="category"
                                name="category"
                                value={formData.category}
                                className="mt-1 block w-full px-3 py-2 border border-[#CE9C39] rounded-md shadow-sm focus:outline-none focus:ring-[#CE9C39] focus:border-[#CE9C39] bg-[#3a2d2b] text-[#b8a070]"
                                required
                                disabled
                            />
                        </div>

                        {/* input Efecto al cocinar */}
                        <div>
                            <label htmlFor="cooking_effect" className="block text-sm font-medium text-[#CE9C39]">Efecto al cocinar</label>
                            <input
                                type="text"
                                id="cooking_effect"
                                name="cooking_effect"
                                value={formData.cooking_effect}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-[#CE9C39] rounded-md shadow-sm focus:outline-none focus:ring-[#CE9C39] focus:border-[#CE9C39] bg-[#3a2d2b] text-[#b8a070]"
                            />
                        </div>

                        {/* input Recuperación de corazones */}
                        <div>
                            <label htmlFor="hearts_recovered" className="block text-sm font-medium text-[#CE9C39]">Recuperación de corazones</label>
                            <input
                                type="number"
                                id="hearts_recovered"
                                name="hearts_recovered"
                                step="0.50"
                                min="0"
                                value={formData.hearts_recovered}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-[#CE9C39] rounded-md shadow-sm focus:outline-none focus:ring-[#CE9C39] focus:border-[#CE9C39] bg-[#3a2d2b] text-[#b8a070]"
                            />
                        </div>
                    </div>
                </div>

                {/* input Descripción */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-[#CE9C39]">Descripción</label>
                    <textarea
                        id="description"
                        name="description"
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-[#CE9C39] rounded-md shadow-sm focus:outline-none focus:ring-[#CE9C39] focus:border-[#CE9C39] bg-[#3a2d2b] text-[#b8a070]"
                        required
                    />
                </div>

                {/* input Ubicaciones comunes */}
                <div>
                    <label className="block text-sm font-medium text-[#CE9C39]">Ubicaciones comunes</label>
                    <div className="flex mt-1">
                        <input
                            type="text"
                            value={newLocation}
                            onChange={(e) => setNewLocation(e.target.value)}
                            className="block w-full px-3 py-2 border border-[#CE9C39] rounded-l-md shadow-sm focus:outline-none focus:ring-[#CE9C39] focus:border-[#CE9C39] bg-[#3a2d2b] text-[#b8a070]"
                            placeholder="Añadir ubicación..."
                        />
                        <button
                            type="button"
                            onClick={handleAddLocation}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-[#11458C] hover:bg-[#11448ca6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CE9C39]"
                        >
                            Añadir
                        </button>
                    </div>

                    <div className="mt-2 space-y-2">
                        {formData.common_locations.map((location, index) => (
                            <div key={index} className="flex items-center justify-between px-3 py-2 bg-[#3a2d2b] rounded-md border border-[#CE9C39]">
                                <span className="text-[#b8a070]">{location}</span>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveLocation(index)}
                                    className="text-[#CC0914] hover:text-[#cc0913b4]"
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Botones de acción */}
                <div className="flex space-x-4 pt-4 border-t border-[#CE9C39]">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#11458C] hover:bg-[#11448ca6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CE9C39] shadow-md hover:shadow-lg"
                    >
                        {isSubmitting ? 'Guardando...' : 'Crear Material'}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push('/materials')}
                        className="inline-flex items-center px-4 py-2 border border-[#CE9C39] text-sm font-medium rounded-md text-[#CE9C39] bg-[#2A201F] hover:bg-[#3a2d2b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CE9C39]"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}