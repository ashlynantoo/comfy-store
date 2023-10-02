import { useSelector } from "react-redux";
import CartItem from "./CartItem";

const CartItemsList = () => {
  const { cartItems } = useSelector((store) => {
    return store.cartState;
  });

  return (
    <>
      {cartItems.map((item) => {
        return <CartItem key={item.cartID} cartItem={item} />;
      })}
    </>
  );
};

export default CartItemsList;
