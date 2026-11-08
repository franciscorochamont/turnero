// Types for the application

export type EstadoTurno = "pendiente" | "atendiendo" | "atendido" | "ausente"

export type Servicio = {
    id: string;
    nombre: string;
    duracionMin: number;
}

export type Turno = {
    id: string;
    cliente: string;
    servicio: Servicio;
    estado: EstadoTurno;
}
