import { useSelector } from "react-redux";
import { CartItemsList, CartTotals, SectionTitle } from "../components";
import { Link } from "react-router-dom";

const Cart = () => {
  const { user } = useSelector((store) => {
    return store.userState;
  });
  const { numItemsInCart } = useSelector((store) => {
    return store.cartState;
  });

  if (numItemsInCart === 0) {
    return <SectionTitle title="your cart is empty" />;
  }

  return (
    <>
      <SectionTitle title="shopping cart" />
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemsList />
        </div>
        <div className="w-full max-w-md mx-auto lg:col-span-4 lg:pl-4">
          <CartTotals />
          {user ? (
            <Link to="/checkout" className="btn btn-accent btn-block mt-8">
              proceed to checkout
            </Link>
          ) : (
            <Link to="/login" className="btn btn-accent btn-block mt-8">
              please login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
