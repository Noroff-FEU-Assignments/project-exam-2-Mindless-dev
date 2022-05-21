import PropTypes from "prop-types";

export function Error({ errorType, children }) {
  return (
    <div className={errorType}>
      <p>{children}</p>
    </div>
  );
}

Error.propTypes = {
  errorType: PropTypes.string,
};
