import PropTypes from "prop-types";

export function MainHeader({ children }) {
  return <h1>{children}</h1>;
}

MainHeader.propTypes = {
  children: PropTypes.string,
};
