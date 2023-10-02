import { useSelector } from "react-redux";
import { CartTotals, CheckoutForm, SectionTitle } from "../components";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const loader = (store) => {
  return () => {
    const user = store.getState().userState.user;
    if (!user) {
      toast.warn("Please log in to checkout");
      return redirect("/login");
    }
    return null;
  };
};

const Checkout = () => {
  const { numItemsInCart } = useSelector((store) => {
    return store.cartState;
  });

  if (numItemsInCart === 0) {
    return <SectionTitle title="your cart is empty" />;
  }

  return (
    <>
      <SectionTitle title="place your order" />
      <div className="mt-8 grid gap-8 md:grid-cols-2 items-center">
        <CheckoutForm />
        <CartTotals />
      </div>
    </>
  );
};

export default Checkout;
