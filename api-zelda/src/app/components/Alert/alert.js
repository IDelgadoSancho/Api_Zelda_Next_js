import css from './alert.module.css';

export default function Alert({ isLoading, isEmpty }) {
    // Si está cargando, mostrar mensaje de carga
    if (isLoading) {
        return (
            <div className={`flex items-center justify-center p-4 ${css.position}`}>
            <img src="/navi.gif"
                className='h-auto w-25 mr-5'></img>
            <p className="font-bold text-3xl">LOADING...</p>
            </div>
        );
    }

    // Si la colección está vacía, mostrar mensaje de advertencia
    if (isEmpty) {
        return (
            <div className={css.alert} role="alert">
                <img src="/navi.png" className='h-auto w-60 mb-15'></img>
                <p className="font-bold text-2xl text-[#CE9C39]">HEY! LISTEN!</p>
                <p className='text-1xl'>No se han encontrado elementos</p>
            </div>
        );
    }
}
