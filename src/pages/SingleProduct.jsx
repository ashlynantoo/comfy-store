import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { customFetch, formatPrice, generateAmountOptions } from "../utils";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";

const singleProductQuery = (productId) => {
  return {
    queryKey: ["singleProduct", productId],
    queryFn: () => {
      const url = `/products/${productId}`;
      return customFetch(url);
    },
  };
};

export const loader = (queryClient) => {
  return async ({ params }) => {
    const { id } = params;
    const { data } = await queryClient.ensureQueryData(singleProductQuery(id));
    const { product } = data;
    return { product };
  };
};

const SingleProduct = () => {
  const { product } = useLoaderData();
  const {
    _id: id,
    images,
    name,
    price,
    description,
    colors,
    company,
  } = product;
  const dollarPrice = formatPrice(price);
  const image = images[0].url;

  const [productColor, setProductColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const handleAmount = (event) => {
    setAmount(parseInt(event.target.value));
  };

  const cartItem = {
    cartID: id + productColor,
    product: id,
    image,
    name,
    price,
    company,
    color: productColor,
    quantity: amount,
  };

  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addItem(cartItem));
  };

  return (
    <section>
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>
      <div className="mt-6 grid gap-y-8 md:grid-cols-2 md:gap-x-16 place-items-center text-center md:text-left">
        <img
          src={image}
          alt={name}
          className="w-96 h-96 object-cover rounded-lg md:w-full"
        />
        <div>
          <h1 className="capitalize text-3xl font-bold">{name}</h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {company}
          </h4>
          <p className="mt-3 text-xl">{dollarPrice}</p>
          <p className="mt-6 leading-8 text-justify">{description}</p>
          <div className="mt-6 text-left">
            <h4 className="text-md font-medium tracking-wider capitalize">
              colors
            </h4>
            <div className="mt-3">
              {colors.map((color, index) => {
                return (
                  <button
                    key={index}
                    type="button"
                    className={`badge w-6 h-6 mr-2 ${
                      color === productColor &&
                      "border-2 border-neutral-content"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      setProductColor(color);
                    }}
                  ></button>
                );
              })}
            </div>
          </div>
          <div className="mt-3 form-control">
            <label htmlFor="amount" className="label">
              <h4 className="text-md font-medium tracking-wider capitalize">
                Quantity
              </h4>
            </label>
            <select
              name="amount"
              id="amount"
              className="mt-1 select select-neutral-content select-bordered select-md w-full max-w-xs"
              onChange={handleAmount}
            >
              {generateAmountOptions(10)}
            </select>
          </div>
          <div className="mt-8 text-left">
            <button className="btn btn-accent btn-md" onClick={addToCart}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
