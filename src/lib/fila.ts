// Libreria para manejar la fila de los turnos.
// Aquí solo hay funciones puras: reciben datos, devuelven un resultado
// y no modifican nada. La espera es un valor DERIVADO: se calcula a partir
// de la fila cada vez que se necesita, nunca se guarda en el estado.

import type { Turno } from "../types";

// Los tiempos de Date.now() vienen en milisegundos; las duraciones de los
// servicios, en minutos. Esta constante sirve para convertir de uno a otro.
const MS_POR_MINUTO = 60 * 1000;

// Lo que devuelve calcularEspera.
export type EsperaFila = {
    // Minutos que espera cada turno pendiente, usando su id como clave.
    // Ej: { "id-de-luis": 30, "id-de-eva": 50 }
    porTurno: Record<string, number>;
    // Minutos hasta que se termine de atender a TODA la fila
    // (lo que le falta al que está atendiendo + todos los pendientes).
    total: number;
};

/**
 * Calcula la espera estimada de cada turno pendiente y la espera total.
 *
 * @param fila       Turnos en orden de llegada (se asume que el "atendiendo"
 *                   aparece antes que los "pendiente").
 * @param horaActual Momento actual en ms (normalmente Date.now()).
 *                   Se recibe como parámetro para que la función sea pura
 *                   y se pueda probar con cualquier hora.
 *
 * Ejemplo: Luis "atendiendo" (corte de 40 min, lleva 10) y Ana "pendiente"
 * (corte de 30 min) → { porTurno: { ana: 30 }, total: 60 }
 *
 * Nota: los minutos pueden tener decimales (ej. 19.5). El redondeo se
 * decide al mostrarlos, no aquí.
 */
export function calcularEspera(fila: Turno[], horaActual: number): EsperaFila {

    const porTurno: Record<string, number> = {};

    // Acumulador: cuántos minutos faltan para que se desocupe el lugar
    // hasta el punto de la fila en el que vamos.
    let minutosEspera = 0;

    for (const turno of fila) {

        // Los que ya se fueron no hacen esperar a nadie.
        if (turno.estado === 'ausente' || turno.estado === 'atendido') {
            continue; // pasa al siguiente
        }

        // El que está siendo atendido: solo cuenta lo que le FALTA,
        // no la duración completa del servicio.
        if (turno.estado === 'atendiendo' && turno.inicioAtencion !== undefined) {
            const msTranscurridos = horaActual - turno.inicioAtencion;
            const minTranscurridos = msTranscurridos / MS_POR_MINUTO;
            // Math.max evita una espera negativa si el servicio ya se pasó
            // de su duración estimada.
            const minRestantes = Math.max(0, turno.servicio.duracionMin - minTranscurridos);
            minutosEspera += minRestantes;
        }

        // Un pendiente espera lo acumulado ANTES de él; después suma
        // su propia duración para los que vienen detrás.
        if (turno.estado === 'pendiente') {
            porTurno[turno.id] = minutosEspera;
            minutosEspera += turno.servicio.duracionMin;
        }
    }

    // Al terminar el recorrido, el acumulador ya contiene la espera total.
    return { porTurno, total: minutosEspera };
}
