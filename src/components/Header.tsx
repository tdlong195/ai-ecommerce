import Link from "next/link";
import { useCart } from "@/context/CartContext";
import styles from "./Header.module.css";

export default function Header() {
  const { cartCount } = useCart();

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main navigation">
        <Link href="/" className={styles.logo}>
          Shop Simple Goods
        </Link>
        <Link href="/cart" className={styles.cartLink}>
          Cart <span className={styles.cartCount}>{cartCount}</span>
        </Link>
      </nav>
    </header>
  );
}
