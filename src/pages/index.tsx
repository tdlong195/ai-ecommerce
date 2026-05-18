import Head from "next/head";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Shop Simple Goods</title>
        <meta
          name="description"
          content="Browse a simple product listing for everyday goods."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.page}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>New arrivals</p>
          <h1>Simple products for everyday life</h1>
          <p className={styles.heroText}>
            Explore a small collection of beginner-friendly mock products built
            with reusable components and CSS Modules.
          </p>
        </section>

        <section
          className={styles.productsSection}
          aria-labelledby="products-heading"
        >
          <div className={styles.sectionHeader}>
            <h2 id="products-heading">Featured products</h2>
            <p>{products.length} items</p>
          </div>
          <div className={styles.productGrid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
