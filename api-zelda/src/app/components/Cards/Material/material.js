import { useState } from 'react';
import { useRouter } from 'next/navigation';
import css from './material.module.css';
import Modal from "@/app/components/Modals/Material/material";
import Delete from "@/app/components/Modals/Delete/delete";
import Link from 'next/link';

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
        <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
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

            <div className="p-4">
                <h6 className="mb-2 text-slate-800 text-xl font-semibold">
                    {name} ({category})
                </h6>
                <p className={`text-slate-600 leading-normal font-light mb-2 ${css.description}`}>
                    {description}
                </p>
                <p className={`text-slate-600 text-sm ${css.description}`}>
                    <strong>Efecto al cocinar:</strong> {cooking_effect}
                </p>
                <p className={`text-slate-600 text-sm ${css.description}`}>
                    <strong>Recuperación de corazones:</strong> {hearts_recovered}
                </p>
                {common_locations && common_locations.length > 0 && (
                    <p className={`text-slate-600 text-sm ${css.description}`}>
                        <strong>Ubicaciones comunes:</strong> {common_locations.join(", ")}
                    </p>
                )}
            </div>

            <div className='flex flex-row justify-between'>
                <div className="px-4 pb-4 pt-0 mt-2">
                    <Link href={`/materials/${encodeURIComponent(id_num)}`}>
                        <button className="rounded-md bg-blue-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                            Editar material
                        </button>
                    </Link>
                </div>

                <div className="px-4 pb-4 pt-0 mt-2">
                    <button
                        className="rounded-md bg-red-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg hover:bg-red-700 disabled:opacity-50"
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