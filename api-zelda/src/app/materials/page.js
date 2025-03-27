'use client'

import { useEffect, useState } from 'react';
import Card from '../components/Cards/Material/material';

export default function Page() {
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMaterials() {
            const endpoint = 'http://localhost:3001/materials';

            try {
                const response = await fetch(endpoint);

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                setMaterials(data);
            } catch (err) {
                console.error(err.message);
                setMaterials([]);
            } finally {
                setLoading(false);
            }
        }

        fetchMaterials();
    }, []);

    if (loading) {
        return <p>Cargando materiales...</p>;
    }

    if (materials.length === 0) {
        return (

            <>
                <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                    <p class="font-bold">Warning</p>
                    <p>No se han encontrado materiales</p>
                </div>
            </>

        )
    }

    return (

        <>
            <h1 className="text-2xl font-bold mb-4">Materials</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {materials.map((material) => (
                    <Card key={material._id} data={material} />
                ))}
            </div>
        </>

    );
}