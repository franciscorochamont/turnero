# `as const` y `satisfies` en TypeScript

Notas del ticket **FRA-8** (catálogo de servicios). Todos los ejemplos usan el tipo `Servicio` de `src/types.ts`:

```ts
export type Servicio = {
    id: string;
    nombre: string;
    duracionMin: number;
}
```

> Cada comportamiento descrito aquí se comprobó con `tsc` (TypeScript 6) del proyecto.

---

## 1. La idea en una frase

| Herramienta | Pregunta que responde |
|---|---|
| `: Servicio[]` (anotación) | "¿Qué tipo **tiene** esta variable?" → el que yo diga. |
| `as const` | "¿Se puede **cambiar**?" → no, y guarda los valores exactos. |
| `satisfies Servicio[]` | "¿Tiene la **forma correcta**?" → lo revisa, pero no cambia el tipo. |

**Analogía de la barbería:**

- La **anotación** es poner una etiqueta genérica en la caja: "aquí hay servicios". Ya no sabes cuáles son exactamente.
- `as const` es **enmicar** la lista de precios: nadie puede escribirle encima y se lee exactamente lo que dice.
- `satisfies` es que el **inspector** revise que cada servicio tenga nombre y duración, y te devuelva la lista tal cual la escribiste.

---

## 2. Anotación de tipo: `const servicios: Servicio[] = [...]`

```ts
const servicios: Servicio[] = [
    { id: '1', nombre: 'Barba', duracionMin: 35 },
]
```

- ✅ Valida la forma: si falta `duracionMin`, marca error.
- ❌ **Ensancha** los tipos: `servicios[0].duracionMin` es `number`, no `35`.
- ❌ Se puede modificar: `servicios.push(...)` y `servicios[0].duracionMin = 99` compilan.

### ⚠️ Trampa: anotación + `as const`

```ts
const servicios: Servicio[] = [ ... ] as const
servicios.push({ id: '5', nombre: 'Tinte', duracionMin: 90 }) // compila 😱
```

La anotación **gana**: el resultado es un `Servicio[]` normal y mutable. El `as const` queda sin efecto. Esta fue la primera versión del FRA-8.

---

## 3. `as const` (solo)

```ts
const servicios = [
    { id: '1', nombre: 'Barba', duracionMin: 35 },
] as const
```

Hace dos cosas:

1. **`readonly` en todo**: el arreglo y cada propiedad.
   - `servicios.push(...)` → error: `Property 'push' does not exist`.
   - `servicios[0].duracionMin = 99` → error: `Cannot assign to 'duracionMin' because it is a read-only property`.
2. **Tipos literales**: `duracionMin` es `35` (no `number`) y `nombre` es `'Barba'` (no `string`).

❌ **No valida nada**. Esto compila sin quejarse, aunque no es un `Servicio` válido:

```ts
const servicios = [{ id: '1', nombre: 'Barba' }] as const // falta duracionMin y nadie avisa
```

---

## 4. `satisfies` (solo)

```ts
const servicios = [
    { id: '1', nombre: 'Barba', duracionMin: 35 },
] satisfies Servicio[]
```

- ✅ **Valida la forma**:
  - Falta una propiedad → `Property 'duracionMin' is missing ... but required in type 'Servicio'`.
  - Sobra una propiedad (`precio: 100`) → `'precio' does not exist in type 'Servicio'`.
- ✅ No reemplaza el tipo de la variable por `Servicio[]`: TypeScript sigue infiriendo desde el valor.
- ❌ **No hace nada `readonly`**: `push` y `servicios[0].duracionMin = 99` compilan.
- ⚠️ En propiedades que se pueden modificar, los números y textos sí se ensanchan: aquí `duracionMin` es `number`, no `35`. Para conservar el `35` necesitas `as const`.

---

## 5. La combinación: `as const satisfies readonly Servicio[]`

Así quedó `src/data/servicios.ts`:

```ts
export const servicios = [
    { id: crypto.randomUUID(), nombre: 'Corte Adulto', duracionMin: 45 },
    { id: crypto.randomUUID(), nombre: 'Barba', duracionMin: 35 },
    // ...
] as const satisfies readonly Servicio[]
```

Se lee de izquierda a derecha:

1. `as const` → congela los datos y guarda los valores exactos.
2. `satisfies readonly Servicio[]` → revisa que el resultado tenga la forma de un arreglo de solo lectura de `Servicio`.

Resultado:

- ✅ Valida la forma (gracias a `satisfies`).
- ✅ Todo es de solo lectura (gracias a `as const`).
- ✅ Tipos exactos: `duracionMin` es `45 | 35 | 60`, y `const x: (typeof servicios)[number]['duracionMin'] = 999` da error.

### ¿Por qué `readonly` delante de `Servicio[]`?

`as const` produce un arreglo de **solo lectura**. Si pides `satisfies Servicio[]` (un arreglo mutable), TypeScript igual lo acepta, pero **ajusta el `as const` para que encaje**: las propiedades siguen bloqueadas, y el arreglo en sí deja de ser `readonly`. Lo comprobamos: `servicios.push(servicios[0])` compilaba.

Con `readonly Servicio[]`, el tipo esperado y el resultado de `as const` coinciden, y `push` vuelve a marcar error.

---

## 6. Tabla resumen

| | Valida la forma | Solo lectura | Tipos exactos (`35`) |
|---|:---:|:---:|:---:|
| `: Servicio[]` | ✅ | ❌ | ❌ |
| `: Servicio[] = [...] as const` | ✅ | ❌ | ❌ |
| `as const` | ❌ | ✅ | ✅ |
| `satisfies Servicio[]` | ✅ | ❌ | ❌ (en propiedades mutables) |
| `as const satisfies Servicio[]` | ✅ | ⚠️ solo propiedades | ✅ |
| **`as const satisfies readonly Servicio[]`** | ✅ | ✅ | ✅ |

---

## 7. ¿Cuándo uso cada uno?

- **Datos fijos que nunca cambian** (como el catálogo) → `as const satisfies readonly Tipo[]`.
- **Datos que sí van a cambiar** (como la lista de turnos en `useState<Turno[]>`) → anotación o genérico normal. Aquí **no** quieres `readonly` ni tipos literales: la fila crece y cambia.
- **Solo quieres revisar la forma, sin congelar** → `satisfies`.

---

## 8. Mini ejercicios

1. En `src/data/servicios.ts`, pasa el mouse sobre `servicios[0].duracionMin`. ¿Qué tipo muestra? ¿Y si quitas `as const`?
2. Agrega temporalmente `precio: 100` a un servicio. ¿Qué parte del código detecta el error: `as const` o `satisfies`?
3. ¿Por qué **no** usarías `as const` para la lista de turnos que vive en `App`?
