'use client'

import { useEffect, useState } from 'react';
import Card from '../components/Cards/Monster/monster';
import Link from 'next/link';
import css from './monsters.module.css';
import Alert from '../components/Alert/alert';

import '../globals.css';

/**
 * Componente principal para la página de listado de monstruos.
 * Gestiona la carga de datos, estados de carga y visualización de monstruos.
 * 
 * @component
 * @return {JSX.Element} Página de listado de monstruos o mensajes de estado
 */
export default function Page() {
    const [monsters, setMonsters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        /**
         * Función asincrónica para obtener los datos de monstruos desde la API.
         * Realiza la petición, maneja errores y actualiza los estados correspondientes.
         * 
         * @async
         * @function
         * @throws {Error} Cuando la respuesta de la API no es exitosa
         * @return {Promise<void>}
         */
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
        return <Alert isLoading={true} />;
    }

    if (monsters.length === 0) {
        return <Alert isEmpty={true} />;
    }

    return (

        <>
            <h1>MONSTRUOS</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {monsters.map((monster) => (
                    <Card key={monster._id} data={monster} />
                ))}

                {/**link de creacion de un nuevo objeto */}
                <Link href="/monsters/create">
                    <div className={`relative flex flex-col my-6 shadow-sm border-3 rounded-lg w-96 h-[571.5] cursor-pointer hover:shadow-lg transition-shadow duration-300 ${css.newItem}`}>
                        <div className='flex justify-center items-center rounded-lg h-full w-full'>
                            <div className="text-center">
                                <img src='/triforce.svg' className="object-cover w-auto h-fill mx-auto" alt="Añadir material" />
                                <p className="text-white font-semibold mt-3">Añadir nuevo monstruo</p>
                            </div>
                        </div>
                    </div>
                </Link>

            </div>
        </>

    );
}