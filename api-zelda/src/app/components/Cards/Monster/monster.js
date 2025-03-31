import { useState } from 'react';
import { useRouter } from 'next/navigation';
import css from './monster.module.css';
import Modal from "@/app/components/Modals/Monster/monster";
import Delete from "@/app/components/Modals/Delete/delete";
import Link from 'next/link';

/**
 * Componente para mostrar la información de un monstruo en forma de tarjeta.
 * Permite visualizar detalles, editar y eliminar un monstruo.
 * Incluye un modal para ver información detallada y otro para confirmar eliminación.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.data - Datos del monstruo a mostrar
 * @param {string} props.data.name - Nombre del monstruo
 * @param {string} props.data.category - Categoría del monstruo
 * @param {Array<string>} props.data.common_locations - Ubicaciones donde se encuentra el monstruo
 * @param {string} props.data.description - Descripción detallada del monstruo
 * @param {Array<string>} props.data.drops - Objetos que deja caer el monstruo
 * @param {string} props.data.image - URL de la imagen del monstruo
 * @param {string} props.data.id_num - Identificador único del monstruo
 * @param {Function} [props.onDelete] - Función callback a ejecutar cuando se elimina el monstruo
 * @return {JSX.Element} Tarjeta con información del monstruo
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
        description,
        drops,
        image,
        id_num,
    } = data;

    /**
     * Maneja la eliminación de un monstruo mediante una petición a la API.
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
            const response = await fetch(`http://localhost:3001/monsters/${id_num}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el monstruo');
            }

            // Si se proporciona una función onDelete, la llamamos para actualizar la UI
            if (onDelete) {
                onDelete(id_num);
            }

            router.refresh();

        } catch (error) {
            console.error('Error:', error);
            alert('Ocurrió un error al intentar eliminar el monstruo');
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

                {drops && drops.length > 0 && (
                    <p className={`text-sm ${css.description}`}>
                        <strong>Objetos que deja caer:</strong> {drops.join(", ")}
                    </p>
                )}

                {common_locations && common_locations.length > 0 && (
                    <p className={`text-sm ${css.description}`}>
                        <strong>Ubicaciones comunes:</strong> {common_locations.join(", ")}
                    </p>
                )}
            </div>
            
            <div className='flex flex-row justify-between'>
                <div className="px-4 pb-4 pt-0 mt-2">
                    <Link href={`/monsters/${encodeURIComponent(id_num)}`}>
                        <button id={css.editar} className="rounded-md py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:shadow-none active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                            Editar monstruo
                        </button>
                    </Link>
                </div>

                <div className="px-4 pb-4 pt-0 mt-2">
                    <button id={css.delete}
                        className="rounded-md py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg disabled:opacity-50"
                        type="button"
                        onClick={() => setShowDeleteModal(true)}
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Eliminando...' : 'Eliminar'}
                    </button>
                </div>
            </div>

            {/* Modal de confirmación de eliminación */}
            <Delete
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                itemName={name}
            />
        </div>
    );
}