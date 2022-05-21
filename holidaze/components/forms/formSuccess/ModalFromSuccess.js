export function ModalFormSuccess({ display, resetModal, name, guests, from, to, email }) {
  return (
    <div className={display ? "modal__success" : "modal__success--hidden"}>
      <h2>Summary</h2>
      <p>
        <span className="modal__successTitle">Name:</span> {name}
      </p>
      <p>
        <span className="modal__successTitle">Email:</span> {email}
      </p>
      <p>
        <span className="modal__successTitle">Number of Guests:</span> {guests}
      </p>
      <div>
        <p>
          <span className="modal__successTitle">Check in:</span> {from}
        </p>
        <p>
          <span className="modal__successTitle">Check out:</span> {to}
        </p>
      </div>
      <p>The enquiry was successfully made an, email with more details has been sendt to {email}</p>
      <button type="button" onClick={resetModal} className="modal__btn--confirm">
        Confirm
      </button>
    </div>
  );
}
