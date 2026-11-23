import { useState } from "react";
import Layout from "./components/Layout";
import type { NuevoTurno, Turno } from "./types";
import FormularioTurno from "./components/FormularioTurno";
import FilaTurnos from "./components/FilaTurnos";

function App() {

    const [turnos, setTurnos] = useState<Turno[]>([])

    function agregarTurnos(datos: NuevoTurno){
        setTurnos([...turnos, { 
            id: crypto.randomUUID(), // Genera un ID para el nuevo turno
            ...datos, // Agrega los datos del nuevo turno
            estado: 'pendiente'
        }])
    }

    return (
        <Layout>
            <FormularioTurno 
                onAgregar={agregarTurnos}
            />
            <FilaTurnos 
                turnos={turnos}
            />
        </Layout>
    )
}

export default App
