export function FormSucess({ children, messageType }) {
  return (
    <div className={messageType}>
      <div className={messageType + "__bg"}>
        <p className={messageType + "__message"}>{children}</p>
      </div>
    </div>
  );
}
