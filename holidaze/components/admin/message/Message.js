export function Message({ name, email, subject, message }) {
  return (
    <div className="contactMessage">
      <div className="contactMessage__info">
        <p>
          <span className="contactMessage__title--bold">Name:</span> {name}
        </p>
        <p>
          <span className="contactMessage__title--bold">Email:</span> {email}
        </p>
        <p>
          <span className="contactMessage__title--bold">Subject:</span> {subject}
        </p>
      </div>
      <div className="contactMessage__info">
        <p className="contactMessage__title--bold">Message:</p>
        <p>{message}</p>
      </div>
    </div>
  );
}
