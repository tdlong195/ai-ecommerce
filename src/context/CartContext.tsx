import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import { products } from "@/data/products";

export type CartItem = {
  productId: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

type CartContextValue = {
  items: CartItem[];
  cartCount: number;
  addToCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  removeFromCart: (productId: number) => void;
};

type CartAction =
  | { type: "add"; productId: number }
  | { type: "increase"; productId: number }
  | { type: "decrease"; productId: number }
  | { type: "remove"; productId: number }
  | { type: "load"; items: CartItem[] };

const CART_STORAGE_KEY = "ai-commerce-cart";
const validProductIds = new Set(products.map((product) => product.id));
const CartContext = createContext<CartContextValue | undefined>(undefined);

const initialState: CartState = {
  items: [],
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "add":
    case "increase": {
      if (!validProductIds.has(action.productId)) {
        return state;
      }

      const existingItem = state.items.find(
        (item) => item.productId === action.productId,
      );

      if (!existingItem) {
        return {
          items: [...state.items, { productId: action.productId, quantity: 1 }],
        };
      }

      return {
        items: state.items.map((item) =>
          item.productId === action.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      };
    }

    case "decrease": {
      const existingItem = state.items.find(
        (item) => item.productId === action.productId,
      );

      if (!existingItem) {
        return state;
      }

      return {
        items: state.items
          .map((item) =>
            item.productId === action.productId
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          )
          .filter((item) => item.quantity > 0),
      };
    }

    case "remove": {
      const nextItems = state.items.filter(
        (item) => item.productId !== action.productId,
      );

      if (nextItems.length === state.items.length) {
        return state;
      }

      return {
        items: nextItems,
      };
    }

    case "load":
      return {
        items: action.items,
      };

    default:
      return state;
  }
}

function isValidCartItem(item: unknown): item is CartItem {
  if (!item || typeof item !== "object") {
    return false;
  }

  const cartItem = item as CartItem;

  return (
    Number.isInteger(cartItem.productId) &&
    Number.isInteger(cartItem.quantity) &&
    cartItem.quantity > 0 &&
    validProductIds.has(cartItem.productId)
  );
}

function normalizeCartItems(items: CartItem[]): CartItem[] {
  const quantitiesByProductId = new Map<number, number>();

  items.forEach((item) => {
    const currentQuantity = quantitiesByProductId.get(item.productId) ?? 0;
    quantitiesByProductId.set(item.productId, currentQuantity + item.quantity);
  });

  return Array.from(quantitiesByProductId, ([productId, quantity]) => ({
    productId,
    quantity,
  }));
}

function readCartFromStorage(): CartItem[] {
  try {
    const savedCart = window.localStorage.getItem(CART_STORAGE_KEY);

    if (!savedCart) {
      return [];
    }

    const parsedCart = JSON.parse(savedCart);

    if (!Array.isArray(parsedCart)) {
      return [];
    }

    return normalizeCartItems(parsedCart.filter(isValidCartItem));
  } catch {
    return [];
  }
}

function saveCartToStorage(items: CartItem[]) {
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Keep the cart working in memory if browser storage is unavailable.
  }
}

type CartProviderProps = {
  children: ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [hasLoadedCart, setHasLoadedCart] = useState(false);

  useEffect(() => {
    dispatch({ type: "load", items: readCartFromStorage() });
    setHasLoadedCart(true);
  }, []);

  useEffect(() => {
    if (!hasLoadedCart) {
      return;
    }

    // Wait until localStorage has been read before saving the current cart.
    saveCartToStorage(state.items);
  }, [hasLoadedCart, state.items]);

  const value = useMemo<CartContextValue>(() => {
    const cartCount = state.items.reduce(
      (total, item) => total + item.quantity,
      0,
    );

    return {
      items: state.items,
      cartCount,
      addToCart: (productId) => dispatch({ type: "add", productId }),
      increaseQuantity: (productId) =>
        dispatch({ type: "increase", productId }),
      decreaseQuantity: (productId) =>
        dispatch({ type: "decrease", productId }),
      removeFromCart: (productId) => dispatch({ type: "remove", productId }),
    };
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
