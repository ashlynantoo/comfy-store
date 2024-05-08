import { useSelector } from "react-redux";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { CartTotals, SectionTitle, StripeCheckout } from "../components";
import { customFetch } from "../utils";

export const loader = (store) => {
  return async () => {
    const user = store.getState().userState.user;
    if (!user) {
      toast.warn("Please log in to checkout");
      return redirect("/login");
    }
    const { token } = user;
    const { numItemsInCart, cartItems, shippingFee, tax } =
      store.getState().cartState;

    if (numItemsInCart > 0) {
      const checkoutDetails = {
        cartItems,
        shippingFee,
        tax,
      };
      const url = "/orders/createPaymentIntent";
      try {
        const { data } = await customFetch.post(url, checkoutDetails, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { clientSecret } = data;
        return { clientSecret };
      } catch (error) {
        console.log(error);
        const errorMsg =
          error?.response?.data?.msg ||
          "There was an error while creating payment intent!";
        toast.error(errorMsg);
        if (
          error?.response?.status === 401 ||
          error?.response?.status === 403
        ) {
          return redirect("/login");
        }
        return redirect("/checkout");
      }
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
      <div className="mt-8 grid gap-8 md:grid-cols-2 items-start">
        <CartTotals />
        <StripeCheckout />
      </div>
    </>
  );
};

export default Checkout;
