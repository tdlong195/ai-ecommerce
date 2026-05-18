import "@/styles/globals.css";
import Header from "@/components/Header";
import { CartProvider } from "@/context/CartContext";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Header />
      <Component {...pageProps} />
    </CartProvider>
  );
}
