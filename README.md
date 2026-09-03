# FDSI-GP-03 · Frontend

Interfaz de chat para el asistente institucional del seminario FDSI/SPTI 2026-2 —
tema **Extracción de instrucciones del sistema**.

Este repo es solo la interfaz. El backend vive en un repo hermano dentro de la
misma organización: `fdsi-gp03-backend`.

## Stack

- React 19 + TypeScript
- Vite 8

## Requisitos

- Node.js 20+

## Desarrollo local

```bash
npm install
cp .env.example .env   # ajustar VITE_API_URL si el backend no corre en localhost:8080
npm run dev
```

## Scripts

| Comando         | Qué hace                          |
|-----------------|------------------------------------|
| `npm run dev`   | Servidor de desarrollo (HMR)      |
| `npm run build` | Compila TypeScript y build de prod |
| `npm run lint`  | Linter (oxlint)                    |
| `npm run preview` | Sirve el build de producción    |

## Estado

Hito 1 (05/09): solo shell de la interfaz, sin lógica de negocio.
La integración con `/chat` del backend se implementa en el Hito 2.
