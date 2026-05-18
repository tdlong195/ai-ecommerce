import Image from "next/image";
import type { Product } from "@/data/products";
import styles from "./ProductCard.module.css";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = product.price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={product.image}
          alt={product.name}
          width={320}
          height={220}
          className={styles.image}
        />
      </div>
      <div className={styles.details}>
        <h2 className={styles.name}>{product.name}</h2>
        <p className={styles.price}>{formattedPrice}</p>
        <p className={styles.description}>{product.description}</p>
      </div>
    </article>
  );
}
