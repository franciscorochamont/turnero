# Guía de asistentes de IA — Turnero

Este archivo es para ti, no para los agentes. Puedes guardarlo en `docs/guia-ia.md`.

## Cuándo usar cada asistente

- **Tú primero:** intenta la tarea al menos 20–30 minutos antes de pedir ayuda. Anota dónde te atoraste.
- **Claude (con este repo abierto):** para analizar el problema y avanzar en la implementación. En este proyecto: entender por qué la espera no va en estado, diseñar el tipo `Turno`, decidir cuándo extraer `useFila`.
- **Kimi:** para una segunda explicación, retos y revisión de casos límite. En este proyecto: explicar la inmutabilidad con otra analogía, proponer casos límite (fila vacía, dos clics rápidos en "Llamar siguiente"), preguntas de repaso sobre `key`.
- **Tú al final:** comparas ambas recomendaciones contra el código real, implementas, ejecutas las comprobaciones y escribes qué aprendiste.

## Cómo carga Kimi las instrucciones

- **Kimi Code CLI (terminal):** lee `AGENTS.md` automáticamente desde la raíz del repositorio. No hace falta `KIMI.md`; por eso no lo incluyo.
- **Kimi en el chat web o la app:** no lee archivos del repo. Pega el prompt inicial de abajo al empezar cada conversación y adjunta los archivos que quieras que revise.

## Prompt inicial para Claude

```text
Vamos a trabajar en Turnero. Lee AGENTS.md y CLAUDE.md, revisa la estructura del proyecto y dime en 5 líneas en qué estado está.

Mi tarea de hoy: implementar "Llamar siguiente" respetando que solo haya un cliente atendiendo.

Antes de escribir código:
1. Explícame qué problema hay que resolver y qué conceptos voy a practicar.
2. Propón el enfoque más simple y una alternativa.
3. Divide la tarea en pasos pequeños.
Yo intentaré el primer paso; dame solo una pista si te la pido.
```

## Prompt inicial para Kimi

```text
Actúa como mi segundo mentor de programación. No escribas la solución completa salvo que te la pida.

Contexto: Proyecto: Turnero (#1, nivel Básico). Barberías, consultorios y taquerías llevan la fila de espera de memoria o en papel; los clientes no saben cuánto esperarán. La app permite a recepción registrar clientes, llamar al siguiente y mostrar la espera estimada. Estado: Todo el estado vive en `App` con `useState`. No usar Context ni Zustand: solo hay dos niveles de componentes.

Stack: React 18+ con TypeScript (Vite), Tailwind CSS, Headless UI (solo `Dialog` de confirmación).

Hoy trabajo en: implementar "Llamar siguiente" respetando que solo haya un cliente atendiendo.

1. Explícame el concepto central de esta tarea con un enfoque distinto al habitual.
2. Dame un reto corto (15 minutos) para practicarlo antes de implementarlo en el proyecto.
3. Lista 3 casos límite que mi implementación debería manejar.
Basa tus respuestas en lo que te muestro; si algo no lo sabes del código, pregúntame.
```

## Prompt para pedir una revisión de código (sin reescribir la app)

```text
Revisa solo estos archivos: <rutas>. Contexto: implementé "implementar "Llamar siguiente" respetando que solo haya un cliente atendiendo".

No reescribas el código. Quiero:
1. Errores o casos límite no manejados, con la línea aproximada.
2. Problemas de diseño respecto a las reglas de AGENTS.md (estado, efectos, tipos).
3. Una mejora prioritaria explicada en 3–4 líneas, con un fragmento mínimo si hace falta.
4. Una pregunta para comprobar que entiendo por qué funciona.
Distingue lo que comprobaste ejecutando código de lo que deduces leyendo.
```
