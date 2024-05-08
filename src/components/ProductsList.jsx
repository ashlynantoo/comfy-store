import { Link, useLoaderData } from "react-router-dom";
import { formatPrice } from "../utils";

const ProductsList = () => {
  const { products } = useLoaderData();

  return (
    <div className="mt-8 md:mt-12 grid gap-y-8">
      {products.map((product) => {
        const { id, image, name, price, company } = product;
        const dollarPrice = formatPrice(price);
        return (
          <Link
            key={id}
            to={`/products/${id}`}
            className="p-8 rounded-lg flex flex-col sm:flex-row gap-y-4 flex-wrap items-center sm:items-start bg-base-100 shadow-xl hover:shadow-2xl transition duration-300 group"
          >
            <img
              src={image}
              alt={name}
              className="rounded-lg h-56 w-56 sm:h-36 sm:w-36 object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="ml-0 sm:ml-16 text-center sm:text-left">
              <h3 className="capitalize font-medium text-lg">{name}</h3>
              <h4 className="capitalize font-medium text-md text-neutral-content">
                {company}
              </h4>
            </div>
            <p className="font-medium ml-0 sm:ml-auto text-lg text-accent-focus">
              {dollarPrice}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductsList;
