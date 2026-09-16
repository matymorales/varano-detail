# VARANO DETAIL — Landing Page

Resumen completo de la primera versión local del sitio web de **VARANO DETAIL · Estética vehicular**.

---

## Visión general

Landing page de una sola página (single-page) orientada a dar presencia online al emprendimiento, mostrar los servicios y facilitar el contacto directo por WhatsApp. Todo es contenido **mock/local**: no hay backend, base de datos, login ni panel de administración.

---

## Tecnología

| Herramienta | Rol |
| --- | --- |
| **Astro 7** | Framework de meta-framework estático (SSG), entrega HTML + JS/CSS optimizado |
| **TypeScript** | Tipado estricto en componentes, datos y scripts |
| **Tailwind CSS v4** | Estilos utilitarios vía plugin `@tailwindcss/vite`, configuración por tokens en CSS |
| **@fontsource-variable/inter** | Tipografía de cuerpo Y display (variable) |

El proyecto respeta `astro/tsconfigs/strict` y pasa `astro check` con 0 errores.

---

## Estructura del proyecto

```
v-detail/
├── astro.config.mjs          # Config Astro + plugin Tailwind v4
├── tsconfig.json             # Config TS estricta
├── package.json
├── public/
│   ├── logo.png              # ← Logo real del emprendimiento (copiado acá)
│   └── images/               # Fotos placeholder de autos (png)
└── src/
    ├── layouts/
    │   └── BaseLayout.astro  # HTML base, fuentes, favicon, noscript, scripts
    ├── pages/
    │   └── index.astro       # Orquesta todas las secciones
    ├── components/
    │   ├── Navbar.astro      # Navegación fija + menú móvil fullscreen
    │   ├── Hero.astro        # Portada impactante
    │   ├── Services.astro    # Servicios (bento asimétrico)
    │   ├── BeforeAfter.astro # Comparador interactivo ANTES → DESPUÉS
    │   ├── Gallery.astro     # Galería de trabajos (masonry)
    │   ├── Contact.astro     # Contacto, pagos e info
    │   ├── Footer.astro
    │   └── ui/
    │       ├── BrandLogo.astro  # Logo (detecta archivo en public/)
    │       ├── Icon.astro       # Íconos SVG inline por nombre
    │       └── Marquee.astro    # Cinta de texto en movimiento
    ├── data/
    │   └── site.ts           # TODOS los datos mock editables
    ├── scripts/
    │   └── main.ts           # Interacciones (menú, reveal, slider)
    ├── styles/
    │   └── global.css        # Tokens de marca + utilidades propias
    └── utils/
        └── logo.ts           # Resuelve el archivo de logo en public/
```

---

## Dirección visual / sistema de diseño

Rediseño **"estudio sobrio"** (v2): taller de detailing premium tipo *garage d'autor*.
Se eliminó el lenguaje racing previo (checked flag, stripes, speed lines, esquinas cortadas) a favor de
aire, líneas de pelo y tipografía calma. Identidad real del logo: **solo negro y naranja**.

### Paleta (tokens en `global.css`)

| Token | Valor | Uso |
| --- | --- | --- |
| `carbon-950 … 600` | `#08080a → #292930` | Fondos y superficies (negro/grafito, dominante) |
| `racing-orange` | `#ff6a00` | Acento principal: CTA, highlights, glows |
| `racing-orange-light` | `#ff8a33` | Hover de CTA, gradientes de avatar |
| `racing-orange-dark` | `#c04e00` | Gradientes de avatar, profundidad |

### Tipografía
- **Display y cuerpo**: Inter Variable en todo. Titulares en `font-black`/`font-extrabold`, mayúsculas,
  tracking ajustado (−0.015em) y `leading` 0.98. Se retiró **Anton** (era la voz display racing).
- **Kickers**: 10 px uppercase con hairline naranja (`eyebrow`).

### Detalles de estilo
- **Hairline naranja** de 1 px sobre el navbar (en reemplazo de la franja de carreras).
- **Titulares de sección** en dos líneas: la segunda con contorno fino (`text-outline`).
- **Una palabra naranja sólida** por titular (sin gradiente de texto).
- **Radios suaves** (`rounded-md`/`rounded-xl`) y bordes keyline de 1 px.
- **Métricas del hero** como línea única quieta con separadores `·` naranjas.
- **Glows radiales naranja** de muy baja opacidad por sección y detrás del titular del hero.
- **Marquee rodante**: "Detailing · Cuidado · Rendimiento · Estética · Precisión · Obsesión" (Inter quieta).
- **Animaciones sutiles**: aparición por scroll con stagger corto (16 px) y ease-out; respeta `prefers-reduced-motion`.

---

## Secciones y funcionalidades

### 1. Navbar (`Navbar.astro`)
- Fija arriba, con blur y fondo oscuro al hacer scroll.
- Logo (imagen real, detectada desde `public/`) con enlace a `#inicio`.
- Links: **Inicio · Servicios · Trabajos · Contacto**, con subrayado fino naranja al hover.
- Botón **WhatsApp** en outline naranja (escritorio).
- **Menú móvil fullscreen**: al abrir, overlay oscuro con blur + links en Inter black mayúsculas con numeración naranja (01–04) que aparecen escalonados; cierra con el botón ✕, tocando un link o alternando el hamburguesa.

### 2. Hero (`Hero.astro`)
- Imagen full-bleed de un auto (opacity 50) con degradados a negro y glow radial naranja tenue.
- Eyebrow "Estética vehicular".
- Titular enorme en tres líneas Inter black: "El detalle / marca la / diferencia" (la última en naranja sólido, "marca la" en contorno fino).
- Subcopy con llamada a darle valor al detalle.
- CTA primario **Consultar por WhatsApp** + CTA secundario "Ver servicios".
- Métricas quietas en una línea: "+500 autos detallados · 4.9 valoración · 100% trabajo artesanal".

### 3. Marquee (`ui/Marquee.astro`)
- Cinta de texto en movimiento continuo entre hero y servicios, con rombos rotados en gradiente.

### 4. Servicios (`Services.astro`)
- Composición de 6 servicios en **grid tipo bento asimétrico** (un tile destacado grande a doble ancho/alto + tiles de distinto tamaño), nada de cards repetidas.
- Cada tile: foto de fondo, título en Inter extrabold, descripción, botón circular con flecha que se "endereza" y colorea al hover.
- Servicios: Lavados premium · Abrillantados y tratamientos · Interior full · Tapizados · Limpieza de motor · Restauración de ópticas.

### 5. Resultados (`BeforeAfter.astro`)
- Sección "Antes ◆ Después" con **slider comparador interactivo**:
  - Arrastrar con el mouse/dedo sobre la imagen para mover el divisor.
  - También controlado por el teclado (flechas ← →) y por un `<input type=range>` de accesibilidad.
  - Etiquetas "Antes"/"Después"; el handle tiene glow naranja.

### 6. Galería / Trabajos realizados (`Gallery.astro`)
- **Rail horizontal inmersivo** (protagonismo): tarjetas grandes `aspect-4/3` (85vw en móvil, 440–560 px en desktop) con snap, scroll táctil nativo, arrastre con mouse y flechas anterior/siguiente.
- **Filtros por categoría**: Todos · Lavado · Abrillantado · Interior · Motor · Ópticas (ocultan/muestran tarjetas por `data-category`).
- Caption y categoría **siempre visibles** sobre degradado; zoom suave al hover.
- **Barra de progreso** del rail naranja + link "Ver más en Instagram".
- Ethos: "Cada vehículo que pasa sale distinto".

### 7. ~~Reseñas~~ (removido)

Sección de reseñas eliminada de la página (componente `Reviews.astro` retirado). Los datos `reviews`
siguen disponibles en `src/data/site.ts` por si se quieren reincorporar.

### 8. Contacto (`Contact.astro`)
- CTA gigante: "¿Listo para un cambio real?" + botón principal de WhatsApp.
- Tiles de info **pulidos** (unificados, sin puntos en los íconos): **Zona · Horarios · Instagram** (link).
- **Medios de pago** en un **tile full-width** que replica las tarjetas de info (ícono + label + valor): **Efectivo · Mercado Pago**, con la nota "Podés abonar al finalizar el trabajo. Sin adelantos".

### 9. Footer (`Footer.astro`)
- Dos bloques (logo+descripción+teléfono WhatsApp / chips de pago+Instagram).
- Barra inferior con copyright y crédito. (Navegación removida.)

---

## Datos editables (`src/data/site.ts`)

Todo el contenido mutable vive en un único archivo:

- `navLinks` — enlaces del menú.
- `whatsapp` — texto del mensaje y base del enlace `wa.me` (**placeholder**: número a reemplazar).
- `services` — los 6 servicios (título, descripción, imagen, tamaño del tile).
- `beforeAfter` — imágenes antes y después del comparador.
- `gallery` — galería (imagen + caption + si es tile alto).
- `reviews` — reseñas (nombre, auto, texto).
- `contact` — zona, horarios, Instagram (**placeholder**), teléfono (**placeholder**).
- `paymentMethods` — medios de pago.
- `heroStats` — métricas del hero.

> Reemplazos pendientes para producción: número de WhatsApp, teléfono, Instagram y las fotos reales de trabajos en `public/images/`.

---

## Cómo ejecutar

```bash
npm install        # (ya hecho)
npm run dev        # servidor local → http://localhost:4321
npm run build      # build estático a /dist
npm run preview    # servir la build
npx astro check    # chequeo de tipos
```

---

## Notas técnicas

- **Logo**: el componente `ui/BrandLogo.astro` busca automáticamente cualquier imagen con nombre tipo "logo/varano" en `public/` (`utils/logo.ts`). Si no existe, muestra un wordmark "VARANO." como respaldo.
- **Accesibilidad**: menú con `aria-expanded`/`aria-hidden`, slider controlable por teclado, `noscript` que muestra todo el contenido sin JS y respeto por `prefers-reduced-motion`.
- **Rendimiento**: imágenes en `png` locales (sin dependencia de red), lazy-loading salvo en hero y comparador.
- **Sin backend**: 100% estático; los datos se cambian en `site.ts` y se regenera la página.