import { EnquiriesForm } from "../forms/EnquiresForm";
import { AccomodationInfo } from "./AccomodationInfo";
import PropTypes from "prop-types";

export function Modal({ className, title, description, price, wifi, parking, breakfast, resturant, modalToggle }) {
  return (
    <div className={className}>
      <div className="modalContainer">
        <div className="modal__formContainer">
          <EnquiriesForm accomodationtitle={title} modalToggle={modalToggle} />
        </div>
        <div className="modal__accomodationInfo">
          <AccomodationInfo
            title={title}
            description={description}
            price={price}
            wifi={wifi}
            parking={parking}
            resturant={resturant}
            breakfast={breakfast}
          />
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number,
  wifi: PropTypes.bool,
  resturant: PropTypes.bool,
  breakfast: PropTypes.bool,
};
