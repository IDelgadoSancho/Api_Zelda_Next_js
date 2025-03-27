'use client'

import { useEffect, useState } from 'react';
import Card from '../components/Cards/Monster/monster';

export default function Page() {
    const [monsters, setMonsters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMonsters() {
            const endpoint = 'http://localhost:3001/monsters';

            try {
                const response = await fetch(endpoint);

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                setMonsters(data);
            } catch (err) {
                console.error(err.message);
                setMonsters([]);
            } finally {
                setLoading(false);
            }
        }

        fetchMonsters();
    }, []);

    if (loading) {
        return <p>Cargando mounstros...</p>;
    }

    if (monsters.length === 0) {
        return (

            <>
                <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                    <p class="font-bold">Warning</p>
                    <p>No se han encontrado mounstros</p>
                </div>
            </>

        )
    }

    return (

        <>
            <h1 className="text-2xl font-bold mb-4">Monsters</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {monsters.map((monster) => (
                    <Card key={monster._id} data={monster} />
                ))}
            </div>
        </>

    );
}