// As const:
// Convierte cada propiedad en readonly (inmutable).
// Fuerza a TypeScript a inferir el tipo literal más exacto posible (por ejemplo, 12 en lugar de number, o "hola" en lugar de string).
// Limitación: No valida que el objeto cumpla con una forma o interfaz general que tú quieras imponer (puedes añadir propiedades sobrantes o omitir algunas)

import type { Servicio } from "../types";

// Satisfies Tipo:
// Valida que el valor cumple con la forma del Tipo especificado.
// No ensancha (no hace widening) el tipo de la variable: conserva la inferencia exacta de los valores originales para que tengas autocompletado inteligente.
// Limitación: No hace que el objeto sea de solo lectura (readonly) ni fuerza literales profundos por sí solo

export const servicios = [
    {
        id: crypto.randomUUID(),
        nombre: 'Corte Adulto',
        duracionMin: 45
    },
    {
        id: crypto.randomUUID(),
        nombre: 'Barba',
        duracionMin: 35
    },
    {
        id: crypto.randomUUID(),
        nombre: 'Corte + Barba',
        duracionMin: 60
    },
    {
        id: crypto.randomUUID(),
        nombre: 'Corte Niño',
        duracionMin: 45
    }
] as const satisfies readonly Servicio[]
