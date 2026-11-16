import { useState } from "react";
import Layout from "./components/Layout";
import type { Turno } from "./types";
import FormularioTurno from "./components/FormularioTurno";
import FilaTurnos from "./components/FilaTurnos";

function App() {

    const [turnos] = useState<Turno[]>([])

    return (
        <Layout>
            <FormularioTurno />
            <FilaTurnos 
                turnos={turnos}
            />
        </Layout>
    )
}

export default App
