import { Plus, User } from "lucide-react";
import { servicios } from "../data/servicios";

// FRA-11: agregar la prop onAgregar(datos: NuevoTurno) y el onSubmit del form.
export default function FormularioTurno() {
  return (
    <div className="flex flex-col gap-10">
        <section className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
                <Plus className="text-primario" width={20} />
                <p className="uppercase font-bold text-xs text-primario">
                    Nuevo Turno
                </p>
            </div>
            <div className="flex flex-col gap-2">
                <h2 className="text-xl text-texto">
                    Agrega un cliente a la fila
                </h2>
                <p className="text-sm text-muted font-light">
                    Registra sus datos para mantener el orden de llegada.
                </p>
            </div>
        </section>
        <section>
            <form className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <label htmlFor="nombre">Nombre del cliente</label>
                    <div className="relative max-w-2xl">
                        <User
                            aria-hidden="true"
                            className="pointer-events-none absolute top-1/2 left-3 
                            -translate-y-1/2 text-muted"
                            width={18}
                        />
                        <input
                            type="text"
                            className="w-full rounded-xl border border-borde 
                            py-2 pr-2 pl-10 shadow-sm outline-none 
                            focus:border-primario focus:ring-2 focus:ring-primario/30"
                            placeholder="Ej. Carlos Mendoza"
                            id="nombre"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="servicio">Servicio</label>
                    <select 
                        className="w-full rounded-xl border border-borde 
                        shadow-sm outline-none  focus:border-primario 
                        focus:ring-2 focus:ring-primario/30 p-2"
                        id="servicio"
                    >
                        {servicios.map((servicio) => (
                            <option
                                key={servicio.id}
                                value={servicio.id}
                            >
                                {servicio.nombre} {servicio.duracionMin} min
                            </option>
                        ))}
                    </select>
                </div>
            </form>
        </section>
    </div>
  )
}


