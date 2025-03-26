'use client'

import { useEffect, useState } from 'react';
import Card from '../components/Card/card';

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
        return <p>No se encontraron materiales o ocurrió un error.</p>;
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