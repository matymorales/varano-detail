export interface Service {
  num: string;
  title: string;
  desc: string;
  image: string;
  price?: string;
  featured?: boolean;
  className: string;
}

export type GalleryCategory =
  | "lavado"
  | "abrillantado"
  | "interior"
  | "motor"
  | "opticas";

export interface GalleryItem {
  src: string;
  caption: string;
  category: GalleryCategory;
  car: string;
  service: string;
  tall?: boolean;
}

export interface Review {
  name: string;
  car: string;
  text: string;
}

export const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Trabajos", href: "#trabajos" },
  { label: "Contacto", href: "#contacto" },
];

export const whatsapp = {
  text: "Hola VARANO DETAIL! Quiero consultar por un servicio de estética vehicular.",
  link: "https://wa.me/5491100000000?text=",
};

export const services: Service[] = [
  {
    num: "01",
    title: "Lavados premium",
    desc: "Lavado completo, técnica profesional y productos de alta gama con terminación impecable.",
    image: "/images/shop-detail.png",
    price: "$15.000",
    featured: true,
    className: "md:col-span-2 md:row-span-2 min-h-[420px]",
  },
  {
    num: "02",
    title: "Abrillantados y tratamientos",
    desc: "Pulido, sellado y revestimientos que protegen y devuelven el brillo de fábrica.",
    image: "/images/detail-polish.png",
    price: "$45.000",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    num: "03",
    title: "Interior full",
    desc: "Limpieza profunda de tapizados, tablero y detalles para un habitáculo impecable.",
    image: "/images/interior.png",
    price: "$35.000",
    className: "md:col-span-1",
  },
  {
    num: "04",
    title: "Tapizados",
    desc: "Restauración y limpieza de tapizados con extracción profesional.",
    image: "/images/detail-hand.png",
    price: "$25.000",
    className: "md:col-span-1",
  },
  {
    num: "05",
    title: "Limpieza de motor",
    desc: "Desengrase y protección del motor para un rendimiento y estética superior.",
    image: "/images/engine.png",
    price: "$20.000",
    className: "md:col-span-2",
  },
  {
    num: "06",
    title: "Restauración de ópticas",
    desc: "Recuperación total de faros y ópticas: lucidez, protección y estética renovada.",
    image: "/images/headlight.png",
    price: "$30.000",
    className: "md:col-span-1",
  },
];

export const beforeAfter = {
  before: {
    src: "/images/before-dirty.png",
    label: "Antes",
  },
  after: {
    src: "/images/after-shine.png",
    label: "Después",
  },
};

export const galleryCategories: { key: GalleryCategory | "all"; label: string }[] = [
  { key: "all", label: "Todos" },
  { key: "lavado", label: "Lavado" },
  { key: "abrillantado", label: "Abrillantado" },
  { key: "interior", label: "Interior" },
  { key: "motor", label: "Motor" },
  { key: "opticas", label: "Ópticas" },
];

export const gallery: GalleryItem[] = [
  { src: "/images/shop-detail.png", caption: "Lavado premium", category: "lavado", car: "Citroen", service: "Lavado + tratamiento exterior" },
  { src: "/images/wheels.png", caption: "Detalle de llantas", category: "lavado", car: "Volkswagen Golf", service: "Detalle de llantas" },
  { src: "/images/headlight.png", caption: "Ópticas restauradas", category: "opticas", car: "Fiat", service: "Restauración de ópticas" },
  { src: "/images/interior.png", caption: "Interior full", category: "interior", car: "Volkswagen Gol", service: "Interior full" },
  { src: "/images/detail-polish.png", caption: "Abrillantado", category: "abrillantado", car: "Volkswagen Bora", service: "Abrillantado + sellado" },
  { src: "/images/engine.png", caption: "Motor limpio", category: "motor", car: "Renault", service: "Limpieza de motor" },
];


export const contact = {
  zone: "Zona sur · GBA",
  schedule: "Lun a Sáb · 9:00 a 19:00 hs",
  instagram: {
    handle: "@varanodetail",
    url: "https://instagram.com/varanodetail",
  },
  phoneDisplay: "+54 9 11 0000-0000",
  email: "varanodetail@gmail.com",
};

export const paymentMethods = [
  { name: "Efectivo", icon: "cash" as const },
  { name: "Mercado Pago", icon: "mp" as const },
];

export interface Promotion {
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  code?: string;
  active: boolean;
}

export const promotions: Promotion[] = [
  {
    title: "2x1 en Lavados Premium",
    description: "Traé tu auto y el segundo lavado premium es gratis. Válido de lunes a jueves.",
    discount: "2x1",
    validUntil: "30/09/2026",
    code: "VARANO2X1",
    active: true,
  },
];

export const heroStats = [
  { value: "+500", label: "Autos detallados" },
  { value: "4.9", label: "Valoración media" },
  { value: "100%", label: "Trabajo artesanal" },
];