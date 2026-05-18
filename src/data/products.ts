export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Everyday Sneakers",
    price: 79.99,
    description: "Comfortable canvas sneakers made for daily walks and casual outfits.",
    image: "/products/everyday-sneakers.svg",
  },
  {
    id: 2,
    name: "Wireless Headphones",
    price: 129.99,
    description: "Soft over-ear headphones with clear sound for music, calls, and study time.",
    image: "/products/wireless-headphones.svg",
  },
  {
    id: 3,
    name: "Classic Backpack",
    price: 54.99,
    description: "A lightweight backpack with roomy pockets for school, work, or travel.",
    image: "/products/classic-backpack.svg",
  },
  {
    id: 4,
    name: "Ceramic Coffee Mug",
    price: 18.99,
    description: "A sturdy ceramic mug that keeps your morning coffee simple and cozy.",
    image: "/products/ceramic-mug.svg",
  },
  {
    id: 5,
    name: "Desk Plant",
    price: 24.99,
    description: "A small low-maintenance plant that brings a fresh look to any desk.",
    image: "/products/desk-plant.svg",
  },
  {
    id: 6,
    name: "Cotton T-Shirt",
    price: 29.99,
    description: "A soft cotton tee with a relaxed fit for everyday comfort.",
    image: "/products/cotton-t-shirt.svg",
  },
];
