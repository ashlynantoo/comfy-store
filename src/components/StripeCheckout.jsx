import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { StripeCheckoutForm } from ".";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const StripeCheckout = () => {
  const { clientSecret } = useLoaderData();

  const { theme } = useSelector((store) => {
    return store.userState;
  });

  const appearance = {
    theme: theme === "light" ? "stripe" : "night",
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <StripeCheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default StripeCheckout;
