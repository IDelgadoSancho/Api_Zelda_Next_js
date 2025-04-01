'use client'

import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

export default function WebSocketPage() {
    const [socket, setSocket] = useState(null);
    const [itemId, setItemId] = useState(42); // id predeterminado
    const [voteCount, setVoteCount] = useState(0);
    const [voteMessage, setVoteMessage] = useState('');
    const [connected, setConnected] = useState(false);
    const [isVoting, setIsVoting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Conectar al servidor de WebSocket cuando el componente se monta
    useEffect(() => {
        const socketInstance = io("http://localhost:3001");
        
        socketInstance.on("connect", () => {
            console.log("Conectado a WebSocket");
            setConnected(true);
        });
        
        socketInstance.on("disconnect", () => {
            setConnected(false);
        });
        
        // El evento vote:update viene del servidor socket.io
        socketInstance.on("vote:update", ({ id_num, total }) => {
            console.log(`WebSocket recibió actualización: item=${id_num}, total=${total}`);
            if (parseInt(id_num) === parseInt(itemId)) {
                console.log(`Actualizando voto para item #${id_num} a ${total}`);
                setVoteCount(total);
            }
        });
        
        setSocket(socketInstance);
        return () => {
            socketInstance.disconnect();
        };
    }, [itemId]);
    
    // Cargar el recuento inicial de votos cuando el componente se monta o cuando cambia el ID
    useEffect(() => {
        const fetchVoteCount = async () => {
            setIsLoading(true);
            try {
                // Obtener todos los votos y filtrar por el ID actual
                const response = await fetch("http://localhost:3001/votes");
                if (response.ok) {
                    const allVotes = await response.json();
                    const materialVote = allVotes.find(vote => parseInt(vote.id_num) === parseInt(itemId));
                    
                    if (materialVote) {
                        console.log(`Cargando votos iniciales para item #${itemId}: ${materialVote.total}`);
                        setVoteCount(materialVote.total);
                    } else {
                        // Si no hay votos para este item, establecer a 0
                        console.log(`No hay votos para item #${itemId}`);
                        setVoteCount(0);
                    }
                } else {
                    console.error("Error al cargar votos: respuesta no válida");
                    setVoteCount(0);
                }
            } catch (error) {
                console.error("Error al cargar votos:", error);
                setVoteCount(0);
            } finally {
                setIsLoading(false);
            }
        };

        fetchVoteCount();
    }, [itemId]);

    const handleVote = async () => {
        setIsVoting(true);
        setVoteMessage('');
        
        const voteData = {
            id_num: parseInt(itemId),
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
                setVoteMessage("Voto registrado!");
            } else {
                setVoteMessage("Error al registrar el voto");
            }
        } catch (error) {
            console.error("Error al votar:", error);
            setVoteMessage("Error de conexión");
        } finally {
            setIsVoting(false);
        }
    };

    // Manejar cambio de ID del ítem
    const handleItemIdChange = (e) => {
        const newId = e.target.value;
        setItemId(newId);
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-[#2A201F] border-3 border-[#CE9C39] rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-6 text-[#CE9C39] border-b border-[#CE9C39] pb-2">
                PRUEBA DE WEBSOCKETS
            </h1>
            
            <div className="space-y-6">
                <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <p className="text-[#CE9C39]">
                        Estado: {connected ? 'Conectado' : 'Desconectado'}
                    </p>
                </div>
                
                <div className="flex flex-col space-y-2">
                    <label htmlFor="item-id" className="text-[#CE9C39]">ID del ítem:</label>
                    <div className="flex">
                        <input 
                            type="number" 
                            id="item-id" 
                            value={itemId}
                            onChange={handleItemIdChange}
                            className="px-3 py-2 border border-[#CE9C39] rounded-md shadow-sm focus:outline-none bg-[#3a2d2b] text-[#b8a070] w-full"
                        />
                    </div>
                </div>
                
                <div className="bg-[#3a2d2b] p-4 border border-[#CE9C39] rounded-md">
                    <h2 className="text-[#CE9C39] text-xl font-bold">
                        Ítem #{itemId}
                    </h2>
                    <p className="text-[#b8a070] mt-2">
                        Votos actuales: 
                        {isLoading ? (
                            <span className="ml-2 inline-block animate-pulse">Cargando...</span>
                        ) : (
                            <span className="font-bold ml-2">{voteCount}</span>
                        )}
                    </p>
                    <button 
                        onClick={handleVote}
                        disabled={isVoting || !connected}
                        className={`mt-4 px-4 py-2 bg-[#CE9C39] text-[#2A201F] rounded transition-colors flex items-center gap-2
                            ${isVoting || !connected ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#ac8230]'}`}
                    >
                        {isVoting ? 'Votando...' : 'Votar'}
                    </button>
                    {voteMessage && (
                        <p className="mt-2 text-[#b8a070]">{voteMessage}</p>
                    )}
                </div>
                
                
            </div>
        </div>
    );
}