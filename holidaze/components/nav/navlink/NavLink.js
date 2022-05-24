import Link from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

export function NavLink({ path, children }) {
  const currentPath = useRouter();
  return (
    <li className={currentPath.pathname === path ? "nav__item--active" : "nav__item"}>
      <Link href={path}>{children}</Link>
    </li>
  );
}

NavLink.prototypes = {
  children: PropTypes.string,
  path: PropTypes.string,
};
