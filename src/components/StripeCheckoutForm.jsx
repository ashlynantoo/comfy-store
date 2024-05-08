import { useState, useEffect } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { changeShippingAddress } from "../features/user/userSlice";
import { clearCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify";
import { customFetch } from "../utils";

const StripeCheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState("error");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const { shippingAddress, user } = useSelector((store) => {
    return store.userState;
  });
  const { cartItems, shippingFee, tax } = useSelector((store) => {
    return store.cartState;
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const placeOrder = async (clientSecret, paymentIntentId, status) => {
    const orderDetails = {
      shippingAddress,
      cartItems,
      shippingFee,
      tax,
      clientSecret,
      paymentIntentId,
      status,
    };
    const url = "/orders";
    try {
      const { data } = await customFetch.post(url, orderDetails, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const { order } = data;
      dispatch(clearCart());
      toast.success("Order placed successfully");
      queryClient.removeQueries(["orders"]);
      navigate("/orders");
    } catch (error) {
      console.log(error);
      const errorMsg =
        error?.response?.data?.msg || "There was an error placing your order";
      toast.error(errorMsg);
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        navigate("/login");
      }
      navigate("/checkout");
    }
  };

  useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (!clientSecret) {
      return;
    }
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      const { id, status } = paymentIntent;
      switch (status) {
        case "succeeded" || "processing":
          setMessage(`Your payment is ${paymentIntent.status}!`);
          setStatus("success");
          const paymentIntentId = id;
          placeOrder(clientSecret, paymentIntentId, status);
          break;
        case "requires_payment_method":
          setMessage("Your payment is not successful, please try again.");
          setStatus("error");
          break;
        default:
          setMessage("Something went wrong.");
          setStatus("error");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/checkout",
      },
    });
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
      setStatus("error");
    } else {
      setMessage("An unexpected error occurred.");
      setStatus("error");
    }
    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <div>
      <h4 className="font-medium text-xl capitalize">shipping information</h4>
      <form className="px-1 mt-2 mb-5">
        <div className="form-control">
          <label className="label">
            <span className="label-text capitalize">name & address</span>
          </label>
          <textarea
            name="shippingAddress"
            id="shippingAddress"
            className="textarea textarea-bordered h-24"
            placeholder="Enter the shipping address..."
            value={shippingAddress}
            onChange={(event) => {
              dispatch(changeShippingAddress(event.target.value));
            }}
            required
          ></textarea>
        </div>
      </form>
      <h4 className="font-medium text-xl capitalize">Payment information</h4>
      <form id="payment-form" className="px-1 mt-5" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="btn btn-accent btn-block mt-10"
        >
          <span id="button-text">
            {isLoading ? (
              <div>
                <span className="loading loading-spinner"></span> Processing...
              </div>
            ) : (
              "pay now & place order"
            )}
          </span>
        </button>
        {message && (
          <div
            id="payment-message"
            className={
              status === "success"
                ? "mt-2 text-green-600 text-center"
                : "mt-2 text-red-600 text-center"
            }
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default StripeCheckoutForm;
