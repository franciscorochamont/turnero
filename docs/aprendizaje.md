# Registro de aprendizaje

## FRA-10 · Estado de la fila en App y layout base

### ¿Qué construimos?

- El estado de la fila en `App`: `const [turnos] = useState<Turno[]>([])`.
- `FilaTurnos`: recibe `turnos: Turno[]` por props y muestra cuántos hay o un mensaje de fila vacía.
- `FormularioTurno`: esqueleto visual con el campo de nombre y el `<select>` de servicios que sale del catálogo.
- `Layout`: contenedor centrado y grilla responsive (una columna en móvil, dos desde `lg`).
- El tipo `NuevoTurno` en `types.ts` (se usará en FRA-11).

### ¿Qué conceptos practiqué?

- **Genéricos en `useState`:** `useState<Turno[]>()` sin valor inicial tiene el tipo `Turno[] | undefined`. Con `[]` la fila siempre es un array.
- **Levantar el estado:** `turnos` vive en `App` porque el formulario y la fila lo necesitan.
- **Props tipadas:** un `type XProps` por componente y desestructuración en los parámetros.
- **Funciones como props:** `onSubmit` entrega un **evento**, no datos. Pasar `onAgregar` directo a `onSubmit` es un error de tipos y de razonamiento: hace falta un intermediario.
- **`Pick<Turno, "cliente" | "servicio">`:** deriva un tipo de otro; si `Turno` cambia, `NuevoTurno` se actualiza solo.
- **Tipo en línea vs. compartido:** si lo usa un solo archivo, en línea; si lo usan dos o más, en `types.ts`.
- **`id` vs. `nombre`:** el nombre es para mostrar, el `id` es para identificar. Por eso `value={servicio.id}` y `key={servicio.id}`.
- **Uniones de literales como red de seguridad:** al cambiar `"pendiente"` por `"esperando"`, TypeScript detectó la comparación rota en `fila.ts`.
- **Tailwind mobile-first:** sin prefijo aplica siempre; `lg:` aplica desde 1024px. `mx-auto` + `max-w-*` centra el contenido.
- **`grid` vs. `flex`:** `grid` permite declarar columnas desde el padre (`lg:grid-cols-[20rem_1fr]`).

### ¿Qué decisiones técnicas tomamos y por qué?

- **`onAgregar` recibirá un `NuevoTurno`, no un `Turno` completo:** el formulario solo entrega lo que escribió el usuario; `App`, que es dueño de la fila, decide el `id` y el estado inicial.
- **No declarar lo que todavía no se usa:** `setTurnos`, `onAgregar` y el `onSubmit` se agregan en FRA-11, así `tsc` y `lint` quedan en verde.
- **Layout con `children`:** suficiente con dos zonas. Si crece, considerar props con nombre (`formulario`, `fila`).
- **Breakpoint `lg` y no `md`:** a 768px la columna de la fila quedaría demasiado angosta para los botones.
- **El botón de envío y el header se crearán después:** el botón como componente reutilizable, y el header al final.

### ¿Qué errores o dificultades aparecieron?

- `useState<Turno[]>()` sin valor inicial.
- `<input type="select">` no existe en HTML; se usa `<select>` con `<option>`.
- `onSubmit={onAgregar}`: confundir el evento con los datos.
- `value={servicio.nombre}`: el nombre no garantiza unicidad.
- Labels separados de su input sin `htmlFor` + `id`.
- Clases de Tailwind sin efecto (`font-xmind`, `text-muted` antes de definir el color).
- Un cambio fuera del alcance de la rama (`EstadoTurno`) que rompió `fila.ts`; se revirtió.

### Ejercicio para comprobar que lo entendí

Si `turnos` tiene 3 elementos —uno `atendido`, uno `atendiendo` y uno `pendiente`—, ¿qué muestra hoy `FilaTurnos`? ¿Es correcto? ¿Cómo lo corregirías sin agregar un nuevo `useState`?

### ¿Qué podría mejorar en una refactorización futura?

- `FilaTurnos` cuenta todos los turnos; debería contar solo los `pendiente` (valor derivado).
- Cuando exista el header con el `<h1>`, revisar los niveles de encabezado.
- Crear el componente de botón cuando existan los dos usos ("Agregar a la fila" y "Llamar siguiente").
- `Layout` con props con nombre si aparecen más zonas.
