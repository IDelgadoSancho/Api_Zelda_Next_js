import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
                    {name.toUpperCase()}
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
                {
                    common_locations && common_locations.length > 0 && (
                        <p className={`text-sm ${css.description}`}>
                            <strong>Ubicaciones comunes:</strong> {common_locations.join(", ")}
                        </p>
                    )
                }
            </div >

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
        </div >
    );
}