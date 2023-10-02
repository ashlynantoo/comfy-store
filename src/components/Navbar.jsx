import { NavLink } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";
import { BsCart3, BsMoonFill, BsSunFill } from "react-icons/bs";
import { NavLinks } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/user/userSlice";

const Navbar = () => {
  const { numItemsInCart } = useSelector((store) => {
    return store.cartState;
  });

  const { theme } = useSelector((store) => {
    return store.userState;
  });

  const themes = {
    light: "light",
    dark: "dracula",
  };

  const dispatch = useDispatch();

  const handleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <nav className="bg-base-200">
      <div className="align-element navbar">
        <div className="navbar-start">
          <NavLink
            to="/"
            className="hidden md:flex btn btn-accent text-3xl items-center"
          >
            C
          </NavLink>
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle md:hidden">
              <FaBarsStaggered className="h-6 w-6 text-accent" />
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded w-48"
            >
              <NavLinks />
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal">
            <NavLinks />
          </ul>
        </div>
        <div className="navbar-end">
          <button onClick={handleTheme}>
            {theme === themes.light ? (
              <BsSunFill className="w-5 h-5" />
            ) : (
              <BsMoonFill className="w-5 h-5" />
            )}
          </button>
          <NavLink to="/cart" className="btn btn-ghost btn-circle btn-md ml-4">
            <div className="indicator">
              <span className="indicator-item badge badge-sm badge-accent">
                {numItemsInCart}
              </span>
              <BsCart3 className="h-6 w-6" />
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
