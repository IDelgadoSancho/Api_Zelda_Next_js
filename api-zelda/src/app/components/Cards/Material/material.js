import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { io } from 'socket.io-client';
import css from './material.module.css';
import Modal from "@/app/components/Modals/Material/material";
import Delete from "@/app/components/Modals/Delete/delete";
import Link from 'next/link';

/**
 * Componente para mostrar la información de un material en forma de tarjeta.
 * Permite visualizar detalles, editar y eliminar un material.
 * Incluye un modal para ver información detallada y otro para confirmar eliminación.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.data - Datos del material a mostrar
 * @param {string} props.data.name - Nombre del material
 * @param {string} props.data.category - Categoría del material
 * @param {Array<string>} props.data.common_locations - Ubicaciones donde se encuentra el material
 * @param {string} props.data.cooking_effect - Efecto que produce al ser cocinado
 * @param {string} props.data.description - Descripción detallada del material
 * @param {number} props.data.hearts_recovered - Cantidad de corazones que recupera
 * @param {string} props.data.image - URL de la imagen del material
 * @param {string} props.data.id_num - Identificador único del material
 * @param {Function} [props.onDelete] - Función callback a ejecutar cuando se elimina el material
 * @return {JSX.Element} Tarjeta con información del material
 */
export default function Card({ data, onDelete }) {
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [voteCount, setVoteCount] = useState(0);
    const [isVoting, setIsVoting] = useState(false);
    const [voteMessage, setVoteMessage] = useState('');
    const router = useRouter();

    const {
        name,
        category,
        common_locations,
        cooking_effect,
        description,
        hearts_recovered,
        image,
        id_num,
    } = data;

    // Conectar al servidor de WebSocket cuando el componente se monta
    useEffect(() => {
        const socket = io("http://localhost:3001");

        socket.on("connect", () => {
            console.log("Conectado a WebSocket");
        });

        // Escuchar actualizaciones de votos para este material específico
        socket.on("vote:update", ({ id_num: updatedId, total }) => {
            console.log(`WebSocket recibió actualización: item=${updatedId}, total=${total}`);
            if (parseInt(updatedId) === parseInt(id_num)) {
                console.log(`Actualizando voto para ${name} a ${total}`);
                setVoteCount(total);
            }
        });

        return () => {
            socket.disconnect(); // Limpiar la conexión cuando el componente se desmonta
        };
    }, [id_num, name]);

    // Cargar el recuento inicial de votos cuando el componente se monta
    useEffect(() => {
        const fetchVoteCount = async () => {
            try {
                const response = await fetch("http://localhost:3001/votes");
                if (response.ok) {
                    const allVotes = await response.json();
                    // Buscar el voto correspondiente al material actual
                    const materialVote = allVotes.find(vote => parseInt(vote.id_num) === parseInt(id_num));
                    // Actualizar el contador si se encuentra
                    if (materialVote) {
                        console.log(`Cargando votos iniciales para ${name}: ${materialVote.total}`);
                        setVoteCount(materialVote.total);
                    }
                }
            } catch (error) {
                console.error("Error al cargar votos:", error);
            }
        };

        fetchVoteCount();
    }, [id_num, name]);

    /**
     * Maneja la eliminación de un material mediante una petición a la API.
     * Actualiza la interfaz de usuario después de la eliminación si es exitosa.
     * Notifica errores y gestiona los estados de carga durante el proceso.
     * 
     * @async
     * @function
     * @throws {Error} Si la respuesta de la API no es exitosa
     * @return {Promise<void>}
     */
    const handleDelete = async () => {
        setIsDeleting(true);

        try {
            const response = await fetch(`http://localhost:3001/materials/${id_num}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el material');
            }

            // Si se proporciona una función onDelete, la llamamos para actualizar la UI
            if (onDelete) {
                onDelete(id_num);
            }

            router.refresh();

        } catch (error) {
            console.error('Error:', error);
            alert('Ocurrió un error al intentar eliminar el material');
        } finally {
            setIsDeleting(false);
            setShowDeleteModal(false);
        }
    };

    /**
     * Maneja el envío de un voto para el material actual.
     * Envía una petición POST al servidor y actualiza el estado según la respuesta.
     * 
     * @async
     * @function
     * @return {Promise<void>}
     */
    const handleVote = async () => {
        setIsVoting(true);
        setVoteMessage('');

        const voteData = {
            id_num: parseInt(id_num),
            user_id: crypto.randomUUID(),
            value: 1
        };

        try {
            const response = await fetch("http://localhost:3001/votes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(voteData),
            });

            if (response.ok) {
                setVoteMessage("Voto correcto!");
                // setVoteCount(prevCount => prevCount + 1);
            } else {
                setVoteMessage("Error en el voto");
            }
        } catch (error) {
            console.error("Error al votar:", error);
            setVoteMessage("Error de conexión");
        } finally {
            setIsVoting(false);
        }
    };

    return (
        <div className={`relative flex flex-col my-6 shadow-sm border-3 rounded-lg w-96 ${css.card}`}>
            <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
                {/* evento para lanzar el modal al hacer clic en la imagen */}
                <div
                    className="cursor-pointer"
                    onClick={() => setShowModal(true)}
                >
                    <img src={image} alt={`${name}_img`} className="object-cover w-full h-full" />
                </div>

                {/* mostrar el modal */}
                {showModal && <Modal data={data} onClose={() => setShowModal(false)} />}
            </div>

            <div className="p-4" id="editar">
                <h6 className="mb-2 text-xl font-semibold">
                    {`${name.toUpperCase()}`}
                </h6>
                <p className={`leading-normal font-light mb-2 ${css.description}`}>
                    {description}
                </p>
                <p className={`text-sm ${css.description}`}>
                    <strong>Efecto al cocinar:</strong> {cooking_effect}
                </p>
                <div className={`text-sm ${css.description}`}>
                    <strong>Recuperación de corazones:</strong>
                    {hearts_recovered > 0 && (
                        <div className="flex">
                            {[...Array(Math.floor(hearts_recovered))].map((_, i) => (
                                <span key={i} className="text-red-500">
                                    <img src="/heart.png" className="w-8 h-auto" alt="hearts" />
                                </span>
                            ))}
                            {hearts_recovered % 1 !== 0 && (
                                <span className="text-red-500">
                                    <img src="/half-heart.png" className="w-8 h-auto" alt="hearts" />
                                </span>
                            )}
                        </div>
                    )}
                    {hearts_recovered <= 0 && (
                        <div className="flex">
                            <span className="text-red-500 mt-1 mb-1">No recupera</span>
                        </div>
                    )}
                </div>
                {common_locations && common_locations.length > 0 && (
                    <p className={`text-sm ${css.description}`}>
                        <strong>Ubicaciones comunes:</strong> {common_locations.join(", ")}
                    </p>
                )}

                {/* Sistema de votos */}
                <div className="mt-3 flex items-center">
                    <div className="mr-4">
                        <strong>Votos:</strong> <span className="text-[#CE9C39] font-bold">{voteCount}</span>
                    </div>
                    <button
                        onClick={handleVote}
                        disabled={isVoting}
                        className="px-3 py-1 bg-[#CE9C39] text-[#2A201F] rounded hover:bg-[#ac8230] transition-colors"
                    >
                        {isVoting ? 'Votando...' : 'Votar'}
                    </button>
                </div>
                {voteMessage && (
                    <p className="text-sm mt-1">
                        {voteMessage}
                    </p>
                )}
            </div>

            <div className='flex flex-row justify-between'>
                <div className="px-4 pb-4 pt-0 mt-2">
                    <Link href={`/materials/${encodeURIComponent(id_num)}`}>
                        <button id={css.editar} className="rounded-md py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                            Editar material
                        </button>
                    </Link>
                </div>

                <div className="px-4 pb-4 pt-0 mt-2">
                    <button id={css.delete}
                        className="rounded-md py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg hover:bg-red-700 disabled:opacity-50"
                        type="button"
                        onClick={() => setShowDeleteModal(true)}
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Eliminando...' : 'Eliminar'}
                    </button>
                </div>
            </div>

            {/* modal de confirmación de eliminación */}
            <Delete
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                itemName={name}
            />
        </div>
    );
}