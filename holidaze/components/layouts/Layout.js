import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Nav } from "../nav/Nav";
import holidazeLogo from "../../images/logo/holidazeLogo.svg";
import Image from "next/image";
import Link from "next/link";
export function Layout({ children }) {
  return (
    <>
      <header>
        <Link href="/">
          <a>
            <Image src={holidazeLogo} alt="holidaze logo" />
          </a>
        </Link>

        <button>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <input id="searchDropdown" />
      </header>
      <div>{children}</div>
      <footer> &#169; Holidaze 2022</footer>
    </>
  );
}
