import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/NotFound.module.css";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page not found | Shop Simple Goods</title>
        <meta
          name="description"
          content="The requested page could not be found."
        />
      </Head>
      <main className={styles.page}>
        <section className={styles.card}>
          <p className={styles.eyebrow}>Not found</p>
          <h1>We could not find that page.</h1>
          <p className={styles.message}>
            The page may have been removed, or the link may be incorrect.
          </p>
          <Link href="/" className={styles.backLink}>
            Back to products
          </Link>
        </section>
      </main>
    </>
  );
}
