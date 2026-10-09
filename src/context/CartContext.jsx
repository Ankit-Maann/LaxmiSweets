
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Add a sweet to the cart, or increase its quantity.
  const addToCart = useCallback((product, quantity = 1) => {
    if (!product?.id) {
      console.error("A product with a valid id is required.");
      return;
    }

    const amount = Math.max(1, Math.floor(Number(quantity) || 1));

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + amount }
            : item
        );
      }

      return [
        ...currentItems,
        {
          ...product,
          quantity: amount,
        },
      ];
    });
  }, []);

  // Set an item's quantity, or remove it when quantity is zero.
  const updateCartQuantity = useCallback((id, quantity) => {
    const amount = Math.max(0, Math.floor(Number(quantity) || 0));

    setCartItems((currentItems) =>
      amount === 0
        ? currentItems.filter((item) => item.id !== id)
        : currentItems.map((item) =>
            item.id === id ? { ...item, quantity: amount } : item
          )
    );
  }, []);

  // Remove an item entirely.
  const removeFromCart = useCallback((id) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  }, []);

  // Empty the entire shopping bag.
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Total number of individual items.
  const cartCount = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      ),
    [cartItems]
  );

  // Total price before delivery charges and taxes.
  const cartSubtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total + Number(item.price || 0) * item.quantity,
        0
      ),
    [cartItems]
  );

  const value = useMemo(
    () => ({
      cartItems,
      cartCount,
      cartSubtotal,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
    }),
    [
      cartItems,
      cartCount,
      cartSubtotal,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// Convenient hook for accessing the shared cart.
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside a CartProvider."
    );
  }

  return context;
}
