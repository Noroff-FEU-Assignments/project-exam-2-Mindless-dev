import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import AuthContext from "../../context/Authorzation";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useDisplay } from "../../hooks/useDisplay";
import { SearchDropdown } from "../search/SearchDropdown";
export function Nav() {
  const path = useRouter();
  const [Authorzation] = useContext(AuthContext);
  const [login, setLogin] = useState(false);
  const [display, toggleDisplay] = useDisplay();
  useEffect(() => {
    if (Authorzation) {
      setLogin(true);
    }
  }, []);

  return (
    <>
      <button onClick={toggleDisplay} className="hamburgerMenu">
        <FontAwesomeIcon icon={faBars} />
      </button>
      <nav className={display ? "nav" : "nav--hidden"}>
        <ul className={`nav__inner`}>
          <li className={path.pathname === "/" ? "nav__item--active" : "nav__item"}>
            <Link href="/">Home</Link>
          </li>
          <li className={path.pathname === "/accomodations" ? "nav__item--active" : "nav__item"}>
            <Link href="/accomodations">Accomodations</Link>
          </li>
          <li className={path.pathname === "/contact" ? "nav__item--active" : "nav__item"}>
            <Link href="/contact">Contact</Link>
          </li>
          {login ? (
            <li className={path.pathname === "/admin" ? "nav__item--active" : "nav__item"}>
              <Link href="/admin"> Admin</Link>
            </li>
          ) : (
            <li className={path.pathname === "/login" ? "nav__item--active" : "nav__item"}>
              <Link href="/login"> Log in </Link>
            </li>
          )}
          <li className="nav__search">
            <SearchDropdown />
          </li>
        </ul>
      </nav>
    </>
  );
}
