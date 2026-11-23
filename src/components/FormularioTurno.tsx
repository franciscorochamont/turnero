import { Plus, User } from "lucide-react";
import { servicios } from '../data/servicios';
import type { NuevoTurno } from "../types";
import { useRef, useState, type ChangeEvent, type SubmitEvent } from 'react'
import Button from "./Button";
import MensajeError from "./MensajeError";

type FormularioTurnoProps = {
    onAgregar: (turno: NuevoTurno) => void
}

export default function FormularioTurno({ onAgregar }: FormularioTurnoProps) {

    const [nombre, setNombre] = useState('')
    const [servicioId, setServicioId] = useState('')
    const [error, setError] = useState(false)
    // Ref al <input> de nombre. Empieza en null porque en el primer render
    // el input aún no existe en el DOM; React guarda el nodo al montarlo.
    const nombreref = useRef<HTMLInputElement>(null)

    function handleChangeNombre(e: ChangeEvent<HTMLInputElement>){
        setNombre(e.target.value)
    }
    
    function handleChangeServicio(e: ChangeEvent<HTMLSelectElement>){
        setServicioId(e.target.value)
    }

    function handleAgregar(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault()

        // Busca en el catálogo el servicio elegido en el select.
        // Si no se eligió ninguno (servicioId === ''), find devuelve undefined.
        const servicio = servicios.find((service) => service.id === servicioId)

        // Validación: el nombre no puede estar vacío ni ser solo espacios,
        // y debe haber un servicio. Si falla, se muestra el error y se corta
        // aquí para no perder lo que el usuario ya escribió.
        if (nombre.trim() === '' || !servicio) {
            setError(true)
            return
        }

        // Datos válidos: se envían al padre (App), que es quien agrega el turno
        // a la fila y le asigna id y estado. El formulario solo manda los datos.
        setError(false)
        onAgregar({
            cliente: nombre.trim(),
            servicio,
        })

        // Limpia el formulario: como los inputs son controlados,
        // vaciar el estado vacía lo que se ve en pantalla.
        setNombre('')
        setServicioId('')

        // Devuelve el foco al nombre para registrar al siguiente cliente sin
        // usar el ratón. El ?. cubre el caso en que nombreref.current sea null.
        nombreref.current?.focus()
    }

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
                <form 
                    className="flex flex-col gap-5"
                    onSubmit={handleAgregar}
                >
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
                                value={nombre}
                                onChange={handleChangeNombre}
                                ref={nombreref} // React guarda este nodo en nombreref.current
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
                            value={servicioId}
                            onChange={handleChangeServicio}
                        >
                            <option value='' disabled>Seleccione un servicio</option>
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
                    { error && <MensajeError /> }
                    <Button type="submit">Agregar Turno</Button>
                </form>
            </section>
        </div>
    )
}


