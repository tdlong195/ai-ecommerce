import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import { formatPrice } from "@/utils/formatPrice";
import styles from "@/styles/Cart.module.css";

export default function CartPage() {
  const { items, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();

  const cartProducts = items
    .map((cartItem) => {
      const product = products.find((item) => item.id === cartItem.productId);

      if (!product) {
        return null;
      }

      return {
        product,
        quantity: cartItem.quantity,
        total: product.price * cartItem.quantity,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const subtotal = cartProducts.reduce((total, item) => total + item.total, 0);

  return (
    <>
      <Head>
        <title>Your Cart | Shop Simple Goods</title>
        <meta
          name="description"
          content="Review products in your shopping cart."
        />
      </Head>
      <main className={styles.page}>
        <section className={styles.cartShell} aria-labelledby="cart-heading">
          <div className={styles.headerRow}>
            <div>
              <p className={styles.eyebrow}>Shopping cart</p>
              <h1 id="cart-heading">Your cart</h1>
            </div>
            <Link href="/" className={styles.continueLink}>
              Continue shopping
            </Link>
          </div>

          {cartProducts.length === 0 ? (
            <div className={styles.emptyCart}>
              <h2>Your cart is empty</h2>
              <p>Add a product to your cart and it will appear here.</p>
              <Link href="/" className={styles.primaryLink}>
                Browse products
              </Link>
            </div>
          ) : (
            <div className={styles.cartContent}>
              <div className={styles.itemsList}>
                {cartProducts.map(({ product, quantity, total }) => (
                  <article key={product.id} className={styles.cartItem}>
                    <div className={styles.imageWrapper}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={120}
                        height={100}
                        className={styles.image}
                      />
                    </div>

                    <div className={styles.itemDetails}>
                      <h2>{product.name}</h2>
                      <p>{formatPrice(product.price)}</p>
                      <button
                        className={styles.removeButton}
                        type="button"
                        onClick={() => removeFromCart(product.id)}
                      >
                        Remove
                      </button>
                    </div>

                    <div className={styles.quantityControls}>
                      <button
                        type="button"
                        onClick={() => decreaseQuantity(product.id)}
                        aria-label={`Decrease quantity for ${product.name}`}
                      >
                        −
                      </button>
                      <span>{quantity}</span>
                      <button
                        type="button"
                        onClick={() => increaseQuantity(product.id)}
                        aria-label={`Increase quantity for ${product.name}`}
                      >
                        +
                      </button>
                    </div>

                    <p className={styles.itemTotal}>{formatPrice(total)}</p>
                  </article>
                ))}
              </div>

              <aside className={styles.summary} aria-label="Cart summary">
                <h2>Order summary</h2>
                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <strong>{formatPrice(subtotal)}</strong>
                </div>
                <p>Shipping and taxes are calculated later in a real checkout.</p>
              </aside>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
