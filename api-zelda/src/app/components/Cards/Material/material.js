import css from './material.module.css';

export default function Card({ data }) {
    const {
        name,
        category,
        common_locations,
        cooking_effect,
        description,
        hearts_recovered,
        image,
    } = data;

    return (
        <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
            <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
                <img src={image} alt={`${name}_img`} className="object-cover w-full h-full" />
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
            <div className='flex flex-row'>
                <div className="px-4 pb-4 pt-0 mt-2">
                    <button className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                        Editar
                    </button>
                </div>
                <div className="px-4 pb-4 pt-0 mt-2">
                    <button className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}