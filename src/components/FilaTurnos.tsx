import { Scissors } from "lucide-react";
import type { Turno } from "../types";

type FilaTurnosProps = {
    turnos: Turno[]
}

export default function FilaTurnos({ turnos } : FilaTurnosProps) {

    return (
        <div>
            <div className="flex gap-2 items-center">
                <Scissors className="text-primario" width={20} />
                <p className="uppercase font-bold text-xs text-primario">
                    Operación en curso
                </p>
            </div>
            {turnos.length === 0 
                ? (
                    <p>No hay Clientes</p>
                ) : (
                    <p>{turnos.length} clientes en espera</p>
                )
            }
        </div>
  )

}


