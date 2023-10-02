import { Form, redirect } from "react-router-dom";
import { FormInput, SubmitBtn } from "../components";
import { customFetch, formatPrice } from "../utils";
import { clearCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify";

const url = "/orders";

export const action = (store, queryClient) => {
  return async ({ request }) => {
    const formData = await request.formData();
    const { name, address } = Object.fromEntries(formData);
    const { token } = store.getState().userState.user;
    const { cartItems, numItemsInCart, orderTotal } =
      store.getState().cartState;
    const orderDetails = {
      name,
      address,
      cartItems,
      numItemsInCart,
      chargeTotal: orderTotal,
      orderTotal: formatPrice(orderTotal),
    };
    try {
      const { data } = await customFetch.post(
        url,
        { data: orderDetails },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      store.dispatch(clearCart());
      toast.success("Order placed successfully");
      queryClient.removeQueries(["orders"]);
      return redirect("/orders");
    } catch (error) {
      console.log(error);
      const errorMsg =
        error?.response?.data?.error?.message ||
        "There was an error placing your order";
      toast.error(errorMsg);
      if (error?.response?.status === 401 || 403) {
        return redirect("/login");
      }
      return null;
    }
  };
};

const CheckoutForm = () => {
  return (
    <Form method="post" className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl capitalize">shipping information</h4>
      <FormInput label="first name" type="text" name="name" />
      <FormInput label="address" type="text" name="address" />
      <div className="mt-4">
        <SubmitBtn text="place order" />
      </div>
    </Form>
  );
};

export default CheckoutForm;
