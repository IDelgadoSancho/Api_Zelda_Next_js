'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateMonster() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: '',
        drops: [],
        id_num: '',
        category: 'monsters',
        common_locations: []
    });

    const [newLocation, setNewLocation] = useState('');
    const [newDrop, setNewDrop] = useState('');
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

    const handleAddDrop = () => {
        if (newDrop.trim()) {
            setFormData(prev => ({
                ...prev,
                drops: [...prev.drops, newDrop.trim()]
            }));
            setNewDrop('');
        }
    };

    const handleRemoveDrop = (index) => {
        setFormData(prev => ({
            ...prev,
            drops: prev.drops.filter((_, i) => i !== index)
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

            const response = await fetch('http://localhost:3001/monsters', {
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
            router.push('/monsters');
        } catch (error) {
            console.error('Error completo:', error);
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Crear Nuevo Monstruo</h1>
            
            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                    <p className="font-bold">Error</p>
                    <p>{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="id_num" className="block text-sm font-medium">ID Numérico</label>
                    <input
                        type="text"
                        id="id_num"
                        name="id_num"
                        value={formData.id_num}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="name" className="block text-sm font-medium">Nombre</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="category" className="block text-sm font-medium">Categoría</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        required
                        disabled
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium">Descripción</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="image" className="block text-sm font-medium">URL de la imagen</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>

                {/* Sección de objetos que deja caer (drops) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Objetos que deja caer</label>
                    <div className="flex mt-1">
                        <input
                            type="text"
                            value={newDrop}
                            onChange={(e) => setNewDrop(e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Añadir objeto..."
                        />
                        <button
                            type="button"
                            onClick={handleAddDrop}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Añadir
                        </button>
                    </div>

                    <div className="mt-2 space-y-2">
                        {formData.drops.map((drop, index) => (
                            <div key={index} className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-md">
                                <span>{drop}</span>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveDrop(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                    </div>
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

                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        {isSubmitting ? 'Guardando...' : 'Guardar Monstruo'}
                    </button>

                    <button
                        type="button"
                        onClick={() => router.push('/monsters')}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}
