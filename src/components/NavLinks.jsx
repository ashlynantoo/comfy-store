import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { navLinks } from "../utils";

const NavLinks = () => {
  const { user } = useSelector((store) => {
    return store.userState;
  });

  return (
    <>
      {navLinks.map((link) => {
        const { id, url, text } = link;
        if (!user && (text === "checkout" || text === "orders")) {
          return null;
        }
        return (
          <li key={id} className="hover:bg-accent hover:rounded-lg">
            <NavLink to={url} className="capitalize">
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};

export default NavLinks;
