'use client'

import { useEffect, useState } from 'react';
import css from './materials.module.css';
import Card from '../components/Cards/Material/material';
import Link from 'next/link';
import '../globals.css';

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
                <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                    <p className="font-bold">Warning</p>
                    <p>No se han encontrado materiales</p>
                </div>
            </>

        )
    }

    return (

        <>
            <h1>MATERIALES</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {materials.map((material) => (
                    <Card key={material._id} data={material} />
                ))}

                {/**link de creacion de un nuevo objeto */}
                <Link href="/materials/create">
                    <div className={`relative flex flex-col my-6 shadow-sm border-3 rounded-lg w-96 h-[571.5] cursor-pointer hover:shadow-lg transition-shadow duration-300 ${css.newItem}`}>
                        <div className='flex justify-center items-center rounded-lg h-full w-full'>
                            <div className="text-center">
                                <img src='/triforce.svg' className="object-cover w-auto h-fill mx-auto" alt="Añadir material" />
                                <p className="text-white font-semibold mt-3">Añadir nuevo material</p>
                            </div>
                        </div>
                    </div>
                </Link>

            </div>
        </>

    );
}