import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import type { GetStaticPaths, GetStaticProps } from "next";
import type { Product } from "@/data/products";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/utils/formatPrice";
import styles from "@/styles/ProductDetail.module.css";

type ProductDetailProps = {
  product: Product;
};

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addToCart } = useCart();
  const formattedPrice = formatPrice(product.price);
  const pageTitle = `${product.name} | Shop Simple Goods`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={product.description} />
      </Head>
      <main className={styles.page}>
        <div className={styles.content}>
          <Link href="/" className={styles.backLink}>
            Back to products
          </Link>

          <section className={styles.productDetail}>
            <div className={styles.imageWrapper}>
              <Image
                src={product.image}
                alt={product.name}
                width={560}
                height={420}
                className={styles.image}
                priority
              />
            </div>

            <div className={styles.details}>
              <p className={styles.eyebrow}>Product detail</p>
              <h1>{product.name}</h1>
              <p className={styles.price}>{formattedPrice}</p>
              <p className={styles.description}>{product.description}</p>
              <button
                className={styles.cartButton}
                type="button"
                onClick={() => addToCart(product.id)}
              >
                Add to cart
              </button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ProductDetailProps> = async ({
  params,
}) => {
  const productId = params?.id;

  if (typeof productId !== "string") {
    return {
      notFound: true,
    };
  }

  const product = products.find((item) => item.id.toString() === productId);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
};
