import { Nav } from "../nav/Nav";
import holidazeLogo from "../../images/logo/holidazeLogo.svg";
import Image from "next/image";
import Link from "next/link";
import { SearchDropdown } from "../search/SearchDropdown";

export function Layout({ children }) {
  return (
    <>
      <header>
        <Link href="/">
          <a className="logo">
            <Image src={holidazeLogo} alt="holidaze logo" height="100px" width="80px" margin="10px" />
          </a>
        </Link>
        <Nav />
      </header>
      <div className="container">{children}</div>
      <footer> &#169; Holidaze 2022</footer>
    </>
  );
}
