import { useNavigate } from "react-router-dom";
import CheckoutModal from "../components/CheckoutModal";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  const submitOrder = async (order) => {
    console.info("Order ready for backend/payment integration", order);
    clearCart();
    navigate("/", { replace: true, state: { orderSubmitted: true } });
  };

  return (
    <div className="min-h-[75vh] bg-[#f8f4ec]">
      <CheckoutModal
        isOpen
        onClose={() => navigate("/sweets")}
        items={cartItems}
        onSubmitOrder={submitOrder}
      />
    </div>
  );
}
