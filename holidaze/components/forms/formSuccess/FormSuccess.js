import Proptypes from "prop-types";

export function FormSuccess({ children, messageType }) {
  return (
    <div className={messageType}>
      <div className={messageType + "__bg"}>
        <p className={messageType + "__message"}>{children}</p>
      </div>
    </div>
  );
}

FormSuccess.propTypes = {
  messageType: Proptypes.string,
};
