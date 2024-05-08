import { Link, useLoaderData } from "react-router-dom";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { formatPrice } from "../utils";
day.extend(advancedFormat);

const OrdersList = () => {
  const { orders, meta } = useLoaderData();

  return (
    <div className="mt-8">
      <h4 className="mb-4 capitalize">total orders: {meta.pagination.total}</h4>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th className="hidden sm:block">Date</th>
              <th>Shipping Address</th>
              <th>Products</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const {
                _id: id,
                total,
                orderedItems,
                shippingAddress,
                createdAt,
              } = order;
              const date = day(createdAt).format("MMM Do, YYYY - hh:mm A");
              return (
                <tr key={id}>
                  <td className="hidden sm:block">{date}</td>
                  <td>{shippingAddress}</td>
                  <td>
                    {orderedItems.map((item) => {
                      const { name, quantity, product } = item;
                      return (
                        <div key={product}>
                          <Link to={`/products/${product}`}>
                            {quantity} {name}
                          </Link>
                        </div>
                      );
                    })}
                  </td>
                  <td>{formatPrice(total)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersList;
