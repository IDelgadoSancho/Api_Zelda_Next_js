'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EditMaterialPage({ params }) {
    const router = useRouter();
    const [material, setMaterial] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        category: 'materiales',
        description: '',
        cooking_effect: '',
        hearts_recovered: 0,
        common_locations: [],
    });
    const [newLocation, setNewLocation] = useState('');

    // obtener la id
    const { id } = params;

    useEffect(() => {
        async function fetchMaterial() {
            try {
                const response = await fetch(`http://localhost:3001/materials/${id}`);
                if (!response.ok) {
                    throw new Error('No se pudo cargar el material');
                }

                const data = await response.json();
                setMaterial(data);
                setFormData({
                    name: data.name || '',
                    category: data.category || '',
                    description: data.description || '',
                    cooking_effect: data.cooking_effect || '',
                    hearts_recovered: data.hearts_recovered || 0,
                    common_locations: data.common_locations || [],
                });
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchMaterial();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3001/materials/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('No se pudo actualizar el material');
            }

            router.push('/materials');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (loading) {
        return <div className="p-4">Cargando...</div>;
    }

    if (!material) {

        return <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
            <p class="font-bold">Warning</p>
            <p>No se han encontrado materiales</p>
        </div>
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Editar Material: {material.name}</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* imagen del material */}
                    <div className="mb-6">
                        <div className="h-64 rounded-lg overflow-hidden border border-gray-200">
                            <img
                                src={material.image}
                                alt={`${material.name} image`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        {/* input de nombre */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* input Categoría */}
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoría</label>
                            <input
                                type="text"
                                id="category"
                                name="category"
                                value={formData.category}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                                disabled
                            />
                        </div>

                        {/* input Efecto al cocinar */}
                        <div>
                            <label htmlFor="cooking_effect" className="block text-sm font-medium text-gray-700">Efecto al cocinar</label>
                            <input
                                type="text"
                                id="cooking_effect"
                                name="cooking_effect"
                                value={formData.cooking_effect}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* input Recuperación de corazones */}
                        <div>
                            <label htmlFor="hearts_recovered" className="block text-sm font-medium text-gray-700">Recuperación de corazones</label>
                            <input
                                type="number"
                                id="hearts_recovered"
                                name="hearts_recovered"
                                step="0.50"
                                min="0"
                                value={formData.hearts_recovered}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* input Descripción */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
                    <textarea
                        id="description"
                        name="description"
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                {/* input Ubicaciones comunes */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Ubicaciones comunes</label>
                    <div className="flex mt-1">
                        <input
                            type="text"
                            value={newLocation}
                            onChange={(e) => setNewLocation(e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Añadir ubicación..."
                        />
                        <button
                            type="button"
                            onClick={handleAddLocation}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Añadir
                        </button>
                    </div>

                    <div className="mt-2 space-y-2">
                        {formData.common_locations.map((location, index) => (
                            <div key={index} className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-md">
                                <span>{location}</span>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveLocation(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* input Botones de acción */}
                <div className="flex space-x-4">
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Guardar cambios
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push('/materials')}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}