import { useContext } from "react";
import AuthContext from "../../context/AuthorzationProvider";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useDisplay } from "../../hooks/useDisplay";
import { SearchDropdown } from "../search/SearchDropdown";
import { NavLink } from "./navlink/NavLink";

export function Nav() {
  const [authorzation] = useContext(AuthContext);
  const [login, setLogin] = useState(false);
  const [display, toggleDisplay] = useDisplay();
  useEffect(() => {
    if (authorzation) {
      setLogin(true);
    }
  }, []);

  return (
    <>
      <button onClick={toggleDisplay} className="hamburgerMenu">
        <FontAwesomeIcon icon={faBars} />
      </button>
      <nav className={display ? "nav" : "nav--hidden"}>
        <ul className="nav__inner">
          <NavLink path="/">Home</NavLink>
          <NavLink path="/accomodations">Accomodations</NavLink>
          <NavLink path="/contact">Contact</NavLink>
          {login ? <NavLink path="/admin">Admin</NavLink> : <NavLink path="/login">Login</NavLink>}
          <li className="nav__search">
            <SearchDropdown />
          </li>
        </ul>
      </nav>
    </>
  );
}
