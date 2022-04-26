import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import AuthContext from "../../context/Authorzation";
import { useEffect, useState } from "react";
export function Nav() {
  const path = useRouter();
  const [Authorzation, setAuthorization] = useContext(AuthContext);
  const [LoggedIn, setLogin] = useState(null);

  return (
    <nav>
      <ul>
        <li className={path.pathname === "/" ? "active" : ""}>
          <Link href="/">Home</Link>
        </li>
        <li className={path.pathname === "/accomodations" ? "active" : ""}>
          <Link href="/accomodations">Accomodations</Link>
        </li>
        <li className={path.pathname === "/contact" ? "active" : ""}>
          <Link href="/contact">Contact</Link>
        </li>
        {Authorzation ? (
          <li>
            <Link href="/admin"> Admin</Link>
          </li>
        ) : (
          <li className={path.pathname === "/login" ? "active" : ""}>
            <Link href="/login"> Log in </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
