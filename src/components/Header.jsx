import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../features/user/userSlice";
import { clearCart } from "../features/cart/cartSlice";
import { useQueryClient } from "@tanstack/react-query";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => {
    return store.userState;
  });
  const queryClient = useQueryClient();

  const handleLogout = () => {
    navigate("/");
    dispatch(clearCart());
    dispatch(logoutUser());
    queryClient.removeQueries();
  };

  return (
    <header className="bg-neutral py-2 text-neutral-content">
      <div className="align-element flex justify-center md:justify-end">
        {user ? (
          <div className="flex gap-x-4 items-center">
            <p className="text-sm">Hello, {user.username}</p>
            <button
              className="btn btn-xs btn-outline btn-accent capitalize"
              onClick={handleLogout}
            >
              logout
            </button>
          </div>
        ) : (
          <div className="flex gap-x-6 justify-center items-center">
            <Link
              to="/login"
              className="link link-hover text-sm md:text-md capitalize"
            >
              sign in / guest
            </Link>
            <Link
              to="/register"
              className="link link-hover text-sm md:text-md capitalize"
            >
              register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
