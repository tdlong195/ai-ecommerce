import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { formatPrice } from "@/utils/formatPrice";
import styles from "./ProductCard.module.css";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = formatPrice(product.price);

  return (
    <article className={styles.card}>
      <Link
        href={`/products/${product.id}`}
        className={styles.cardLink}
        aria-label={`View details for ${product.name}`}
      >
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
      </Link>
    </article>
  );
}
