import { useDispatch } from "react-redux";
import { formatPrice, generateAmountOptions } from "../utils";
import { editItem, removeItem } from "../features/cart/cartSlice";

const CartItem = ({ cartItem }) => {
  const { cartID, image, name, price, company, color, quantity } = cartItem;

  const dispatch = useDispatch();

  const removeItemFromCart = () => {
    dispatch(removeItem(cartID));
  };

  const handleAmount = (event) => {
    dispatch(editItem({ cartID, quantity: parseInt(event.target.value) }));
  };

  return (
    <article className="mb-12 flex flex-col gap-y-4 gap-x-8 items-center sm:flex-row sm:justify-between sm:items-start flex-wrap border-b border-base-300 pb-6 last:border-b-0">
      <img
        src={image}
        alt={name}
        className="h-32 w-32 rounded-lg object-cover"
      />
      <div className="text-center sm:text-left sm:w-48">
        <h3 className="capitalize font-medium">{name}</h3>
        <h4 className="capitalize text-sm text-neutral-content mt-2">
          {company}
        </h4>
        <p className="mt-2 text-sm capitalize flex items-center justify-center sm:justify-start gap-x-2">
          color:{" "}
          <span
            className="badge badge-sm"
            style={{ backgroundColor: color }}
          ></span>
        </p>
      </div>
      <div>
        <div className="form-control max-w-xs">
          <label htmlFor="amount" className="label p-0">
            <span className="label-text capitalize">Quantity</span>
          </label>
          <select
            name="quantity"
            id="quantity"
            value={quantity}
            className="mt-2 select select-neutral-content select-bordered select-xs"
            onChange={handleAmount}
          >
            {generateAmountOptions(quantity + 5)}
          </select>
        </div>
        <button
          className="mt-2 link link-accent link-hover text-sm"
          onClick={removeItemFromCart}
        >
          remove
        </button>
      </div>
      <p className="font-medium sm:ml-auto">{formatPrice(price)}</p>
    </article>
  );
};

export default CartItem;
