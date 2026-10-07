# Personal Trianer: diario de calistenia

App móvil para marcar las sesiones del plan y guardarlas en Notion.
Frontend Vite + React (estilo pixel art), funciones serverless en Vercel (`/api`), plan en `src/plan.js`.
La base de datos de Notion ("Sesiones de calistenia", dentro de la página "Entrenamiento") ya está creada.

## Flujo de trabajo
1. Se edita el código en esta carpeta.
2. `git add . && git commit -m "..." && git push`
3. Vercel despliega solo en cada push a `main`. No hace falta CI aparte.

## Primera vez
1. **Git**: `git init`, crea un repositorio en GitHub, `git remote add origin ...` y `git push -u origin main`.
2. **Integración de Notion**: en `app.notion.com/developers/connections` crea una conexión interna en el espacio **Desarrollo con IA** (donde está la página "Entrenamiento"). Copia su token.
3. **Acceso**: en esa conexión, pestaña de acceso al contenido, Editar acceso, marca la página **Entrenamiento**.
4. **Vercel**: importa el repositorio de GitHub y añade estas variables de entorno:
   - `NOTION_TOKEN`: el token del paso 2
   - `APP_PIN`: el PIN que quieras
5. Despliega. Abre la URL en el móvil, entra con el PIN y añádela a la pantalla de inicio.

Si cambias una variable de entorno en Vercel hay que hacer **Redeploy** para que se aplique.

## Desarrollo local
- `npm install`
- Copia `.env.example` a `.env.local` y rellénalo.
- `npx vercel dev` para probar con el backend (con `npm run dev` solo se ve la interfaz y el acceso no funcionará, porque no hay `/api`).

## Cómo funciona
- Cada toque se guarda al instante en el móvil. La sincronización con Notion va en segundo plano y se reintenta sola si no hay cobertura.
- Una fila de Notion por sesión. `Resumen` es el texto legible y `Datos` el JSON con el que la app recupera el estado en otro dispositivo.
- El PIN se comprueba en el servidor en cada petición. El token de Notion nunca llega al navegador.

## Cambiar el plan
Edita `src/plan.js` (ejercicios, series, objetivos y sesiones) y haz push. Las sesiones no tienen fecha fija: la fecha real se guarda al entrenar y se puede corregir dentro de cada sesión.

## Fisio
Sección aparte (botón "Fisio" en el inicio) con los ejercicios del fisio, siempre los mismos y con su dibujo en pixel art.
- Ejercicios, series y repeticiones: `src/fisio.js`. Dibujos: `public/fisio/<id>.png` (hoja de 2 fotogramas de 64x40 px que se alternan).
- Se guarda una fila de Notion por día, en la misma base de datos, con `Dia` = "Fisio", sin semana y con nombre "Fisio AAAA-MM-DD". La opción "Fisio" de la propiedad `Dia` la crea Notion sola la primera vez.

## Dibujos de los ejercicios de calistenia
Cada ejercicio de `src/plan.js` tiene su animación en `public/calistenia/<id>.png`: hoja de 2 fotogramas de 64x56 px que se alternan dentro del bloque del ejercicio. Si añades un ejercicio nuevo al plan, añade también su PNG con el mismo `id`.
