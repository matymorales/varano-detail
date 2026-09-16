# VARANO DETAIL · Sistema de diseño (world: "Estudio de detailing")

Documentado desde la implementación (ground truth). Reemplaza la dirección racing previa por un estudio sobrio tipo "garage d'autor".

## Dirección
Taller premium y silencioso, no circuito de carreras. Autoridad por precisión y aire, no por ruido gráfico. El ADN automotriz se conserva en el lenguaje (llantas, detalle, brillo), no en los adornos (checked flag, stripes, esquinas cortadas, texturas).

## Paleta (solo negro + naranja)
| Token | Valor | Uso |
|---|---|---|
| `carbon-950 … 600` | `#08080a → #292930` | Fondos y superficies (negros/grafito, dominante) |
| `racing-orange` | `#ff6a00` | Acento principal: CTA, highlights, glows |
| `racing-orange-light` | `#ff8a33` | Hover de botón primario, gradientes de avatar |
| `racing-orange-dark` | `#c04e00` | Gradiente de avatar, profundidad |

Neutros: blanco al 90–35 % sobre negro; grises tintados (carbono), nunca gris puro sobre color.

## Tipografía
- **Inter Variable** para todo. Display: `font-black`/`font-extrabold`, mayúsculas, `tracking-[-0.015em]`, `leading-[0.98]`, máx. `text-7xl`.
- Kickers (`eyebrow`): 10 px uppercase, tracking 0.36em, hairline naranja antes del texto.

## Componentes
- **Botón primario**: naranja lleno, `rounded-md`, texto negro extrabold, sombra naranja suave, hover → light + lift 1px.
- **Botón ghost**: borde blanco 15 %, `rounded-md`, hover borde/blanco + bg 5 %.
- **Chips**: `rounded-md`, borde blanco 12 %, bg blanco 4 %, blur.
- **Tiles/galería/contacto**: `rounded-xl`, borde blanco 10 %, hover borde blanco 20 % (naranja 40 % en galería/instagram), zoom de imagen 1.05.
- **Medios de pago**: tile full-width que replica las tarjetas de info (ícono + label + valor) y la nota "sin adelantos" (sin marco decorativo).
- **Rail de trabajos**: fila de tarjetas grandes `aspect-4/3` con snap horizontal, scroll táctil, arrastre con mouse, flechas y barra de progreso naranja; filtros por categoría en chips (`.is-active` = naranja lleno).
- **Scrollbar oculta** en rails: utilidad `.no-scrollbar`.

## Detalles propios
- Hairline naranja (1 px) arriba del navbar; no franja de carreras.
- Titulares de sección: dos líneas, la segunda en contorno fino (`text-outline`, stroke 1 px blanco 20 %).
- Una palabra naranja sólida por titular (sin gradiente de texto).
- Métricas de hero como línea single quieta con separadores `·` naranjas (no tarjetas de métricas).
- Hero: foto `opacity-50` con overlays negros + glow radial naranja muy tenue.
- Reveal por scroll: `translateY(16px)`, ease-out exponencial, respeta `prefers-reduced-motion`.
- Marquee: Inter uppercase tracking 0.3em, rombo naranja 1.5, 42 s.

## Reglas
- Sin rojo ni ámbar (eliminados).
- Sin checked flag, speed lines, textura carbono ni `clip-path` decorativo (excepto el slider funcional antes/después).
- Máximo display 6rem; medida de cuerpo 65–75ch.