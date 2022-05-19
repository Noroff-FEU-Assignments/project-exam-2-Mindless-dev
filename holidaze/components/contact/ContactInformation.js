import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";

export function ContactInformation() {
  return (
    <div className="contact__info">
      <div className="contact__info__section">
        <i className="contact__info__icon">
          <FontAwesomeIcon icon={faPhone} />
        </i>
        <p>+47 99900123</p>
      </div>
      <div className="contact__info__section">
        <i className="contact__info__icon">
          <FontAwesomeIcon icon={faEnvelope} />
        </i>
        <p>holidazebergen@email.com</p>
      </div>

      <div className="contact__info__section">
        <i className="contact__info__icon">
          <FontAwesomeIcon icon={faLocationDot} />
        </i>
        <p>Bergensveien 38, 5020 Bergen</p>
      </div>
      <div className="contact__info__logo"></div>
    </div>
  );
}
