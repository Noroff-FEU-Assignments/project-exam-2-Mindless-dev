export function Enquiry({ id, name, email, from, to, accomodation, guests }) {
  return (
    <div className="enquiry">
      <div className="enquiry__container">
        <p className="enquiry__info">
          <span className="enquiry__title--bold">Name:</span> {name}
        </p>
        <p className="enquiry__info">
          <span className="enquiry__title--bold">Email:</span> {email}
        </p>
      </div>
      <div className="enquiry__container">
        <p className="enquiry__title--bold"> Accomodation:</p>
        <p>{accomodation}</p>
      </div>
      <div className="enquiry__container">
        <p className="enquiry__title">
          <span className="enquiry__title--bold">Book in:</span> {from}
        </p>
        <p className="enquiry__title">
          <span className="enquiry__title--bold"> Check out:</span> {to}
        </p>
      </div>
      <div className="enquiry__container">
        <p className="enquiry__information">
          <span className="enquiry__title--bold">Guests: </span>
          {`${guests} people `}
        </p>
        <p className="enquiry__info">
          <span className="enquiry__title--bold">Order.No:</span> {id}
        </p>
      </div>
    </div>
  );
}
