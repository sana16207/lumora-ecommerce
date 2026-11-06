export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  images?: string[];
  badge?: string;
  colors?: string[];
  sizes?: string[];
  description: string;
  specs: { label: string; value: string }[];
  stock: number;
  tags?: string[];
};

const img = (seed: string, w = 800, h = 1000) =>
  `https://images.unsplash.com/photo-${seed}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

export const categories = [
  { slug: "women", name: "Women", icon: "👗", gradient: "bg-gradient-blush" },
  { slug: "men", name: "Men", icon: "🧥", gradient: "bg-gradient-lavender" },
  { slug: "beauty", name: "Beauty", icon: "💄", gradient: "bg-gradient-blush" },
  { slug: "home", name: "Home", icon: "🛋️", gradient: "bg-gradient-mint" },
  { slug: "kids", name: "Kids", icon: "🧸", gradient: "bg-gradient-lavender" },
  { slug: "accessories", name: "Accessories", icon: "👜", gradient: "bg-gradient-blush" },
  { slug: "footwear", name: "Footwear", icon: "👟", gradient: "bg-gradient-mint" },
  { slug: "tech", name: "Tech", icon: "🎧", gradient: "bg-gradient-lavender" },
];

export const megaMenu: Record<string, { title: string; items: string[] }[]> = {
  women: [
    { title: "Topwear", items: ["Kurtas", "Tops & Tees", "Dresses", "Sweaters", "Sarees"] },
    { title: "Bottomwear", items: ["Jeans", "Trousers", "Skirts", "Leggings", "Shorts"] },
    { title: "Footwear", items: ["Heels", "Flats", "Sneakers", "Boots"] },
    { title: "Beauty", items: ["Makeup", "Skincare", "Fragrance", "Haircare"] },
  ],
  men: [
    { title: "Topwear", items: ["T-Shirts", "Shirts", "Polos", "Sweatshirts", "Jackets"] },
    { title: "Bottomwear", items: ["Jeans", "Trousers", "Chinos", "Shorts"] },
    { title: "Footwear", items: ["Sneakers", "Formals", "Loafers", "Sandals"] },
    { title: "Grooming", items: ["Beard", "Skincare", "Fragrance"] },
  ],
  beauty: [
    { title: "Makeup", items: ["Lipstick", "Foundation", "Eyes", "Nails"] },
    { title: "Skincare", items: ["Cleansers", "Serums", "Moisturizers", "Sunscreen"] },
    { title: "Fragrance", items: ["Perfume", "Body Mist", "Gift Sets"] },
    { title: "Hair", items: ["Shampoo", "Styling", "Color"] },
  ],
};

const sample: Omit<Product, "id">[] = [
  {
    name: "Silk Wrap Midi Dress",
    brand: "Lumora Atelier", category: "women", price: 2899, originalPrice: 5499,
    rating: 4.6, reviews: 1284, image: img("1539109136881-3be0616acf4b"),
    badge: "Bestseller", colors: ["#f8d3da", "#1a1a1a", "#c7b8e1"], sizes: ["XS","S","M","L","XL"],
    description: "A fluid silk midi with a sculpted wrap silhouette, hand-finished in our Mumbai atelier.",
    specs: [{label:"Fabric",value:"100% Mulberry Silk"},{label:"Fit",value:"Regular"},{label:"Wash",value:"Dry clean"}],
    stock: 24, tags:["sale","trending"],
  },
  {
    name: "Tailored Wool Blazer",
    brand: "North&Co.", category: "men", price: 6499, originalPrice: 9999,
    rating: 4.7, reviews: 642, image: img("1593030761757-71fae45fa0e7"),
    badge: "New", sizes: ["S","M","L","XL","XXL"],
    description: "Italian wool blend blazer with structured shoulders and a clean lapel.",
    specs: [{label:"Fabric",value:"Wool blend"},{label:"Lining",value:"Cupro"}], stock: 12,
  },
  {
    name: "Velvet Matte Lipstick — Rosé",
    brand: "Bloom Beauty", category: "beauty", price: 749, originalPrice: 999,
    rating: 4.8, reviews: 4210, image: img("1586495777744-4413f21062fa"),
    badge: "Top Rated", colors: ["#c84c61","#9b3a4a","#e07a8b"],
    description: "16-hour matte finish enriched with squalane and vitamin E.",
    specs: [{label:"Volume",value:"3.5g"},{label:"Finish",value:"Matte"}], stock: 100,
  },
  {
    name: "Linen Throw Cushion Set",
    brand: "Casa Lumora", category: "home", price: 1899, originalPrice: 2999,
    rating: 4.5, reviews: 312, image: img("1555041469-a586c61ea9bc"),
    description: "Stonewashed Belgian linen cushions in a curated palette of three.",
    specs: [{label:"Set of",value:"3"},{label:"Fabric",value:"Linen"}], stock: 40,
  },
  {
    name: "Leather Sculpt Tote",
    brand: "Marais", category: "accessories", price: 4499, originalPrice: 7999,
    rating: 4.7, reviews: 891, image: img("1584917865442-de89df76afd3"),
    badge: "Limited", colors: ["#3b1f1a","#caa472","#1a1a1a"],
    description: "Hand-burnished full-grain leather tote with sculpted handles.",
    specs: [{label:"Material",value:"Full-grain leather"}], stock: 8, tags:["trending"],
  },
  {
    name: "Cloud Runner Sneakers",
    brand: "Strato", category: "footwear", price: 3299, originalPrice: 4999,
    rating: 4.6, reviews: 2140, image: img("1542291026-7eec264c27ff"),
    badge: "Deal", colors: ["#ffffff","#e8d5cf","#1a1a1a"], sizes: ["6","7","8","9","10","11"],
    description: "Featherlight knit runners with energy-return foam soles.",
    specs: [{label:"Weight",value:"260g"}], stock: 30, tags:["sale"],
  },
  {
    name: "Studio Wireless Headphones",
    brand: "Aurio", category: "tech", price: 8999, originalPrice: 12999,
    rating: 4.8, reviews: 3402, image: img("1505740420928-5e560c06d30e"),
    badge: "New",
    description: "Hi-res certified active noise cancellation with 40h battery.",
    specs: [{label:"Driver",value:"40mm"},{label:"Battery",value:"40h"}], stock: 18,
  },
  {
    name: "Cashmere Crewneck Sweater",
    brand: "North&Co.", category: "men", price: 5499, originalPrice: 8999,
    rating: 4.7, reviews: 502, image: img("1620799140408-edc6dcb6d633"),
    sizes:["S","M","L","XL"], colors:["#e9dfd2","#2a2a2a","#7a3b3b"],
    description: "Grade-A inner Mongolian cashmere, finely combed and ribbed.",
    specs: [{label:"Material",value:"100% Cashmere"}], stock: 15,
  },
  {
    name: "Glow Serum Vitamin C",
    brand: "Bloom Beauty", category: "beauty", price: 1299, originalPrice: 1799,
    rating: 4.7, reviews: 1820, image: img("1620916566398-39f1143ab7be"),
    description: "15% stabilized vitamin C with ferulic acid for radiant skin.",
    specs:[{label:"Volume",value:"30ml"}], stock: 60, tags:["trending"],
  },
  {
    name: "Pleated A-Line Skirt",
    brand: "Lumora Atelier", category: "women", price: 1999, originalPrice: 3499,
    rating: 4.5, reviews: 388, image: img("1583496661160-fb5886a13d77"),
    sizes:["XS","S","M","L"], description:"Sunray pleats in flowy crepe with elastic waist.",
    specs:[{label:"Length",value:"Midi"}], stock: 22,
  },
  {
    name: "Ceramic Pour-Over Set",
    brand: "Casa Lumora", category: "home", price: 2499, originalPrice: 3499,
    rating: 4.6, reviews: 220, image: img("1495474472287-4d71bcdd2085"),
    description: "Hand-thrown porcelain dripper, carafe and two cups.",
    specs:[{label:"Capacity",value:"500ml"}], stock: 18,
  },
  {
    name: "Aviator Polarized Sunglasses",
    brand: "Marais", category: "accessories", price: 1799, originalPrice: 2999,
    rating: 4.5, reviews: 612, image: img("1572635196237-14b3f281503f"),
    colors:["#caa472","#1a1a1a"], description:"Polarized lenses with titanium frames.",
    specs:[{label:"UV",value:"400"}], stock: 35, tags:["sale"],
  },
];

export const products: Product[] = sample.map((p, i) => ({ ...p, id: `p${i + 1}` }));

export const heroSlides = [
  {
    eyebrow: "The Atelier Edit",
    title: "Soft Power",
    subtitle: "Tailored silhouettes for the season ahead. Up to 50% off.",
    cta: "Shop the Edit",
    href: "/products?category=women",
    image: img("1483985988355-763728e1935b", 1600, 900),
    bg: "bg-gradient-blush",
  },
  {
    eyebrow: "Tech Drop",
    title: "Sound, Refined",
    subtitle: "Studio-grade audio designed for everyday escapism.",
    cta: "Explore Tech",
    href: "/products?category=tech",
    image: img("1518770660439-4636190af475", 1600, 900),
    bg: "bg-gradient-lavender",
  },
  {
    eyebrow: "Casa Lumora",
    title: "Quiet Luxury at Home",
    subtitle: "Handcrafted homeware to slow your mornings.",
    cta: "Shop Home",
    href: "/products?category=home",
    image: img("1505691938895-1758d7feb511", 1600, 900),
    bg: "bg-gradient-mint",
  },
];

export const testimonials = [
  { name: "Anika R.", text: "The fabric, the fit, the packaging — it feels like a real luxury experience.", role: "Mumbai" },
  { name: "Sophie L.", text: "Lumora has replaced three of my go-to stores. Curation is unmatched.", role: "London" },
  { name: "Diego M.", text: "Fastest delivery and impeccable quality. The detail is in everything.", role: "Madrid" },
];

export const brandLogos = ["LUMORA", "North&Co.", "Bloom", "Casa", "Marais", "Strato", "Aurio", "Atelier"];

export const fakeOrders = [
  { id: "ORD-7821", date: "2026-05-18", total: 5499, status: "Delivered", items: 3 },
  { id: "ORD-7755", date: "2026-05-02", total: 1899, status: "In Transit", items: 1 },
  { id: "ORD-7610", date: "2026-04-21", total: 8499, status: "Delivered", items: 2 },
  { id: "ORD-7488", date: "2026-04-04", total: 2899, status: "Cancelled", items: 1 },
];
