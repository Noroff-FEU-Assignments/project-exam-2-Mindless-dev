import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWifi, faCar, faUtensils, faCocktail } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

export function AccomodationInfo({ title, description, price, wifi, parking, breakfast, resturant }) {
  return (
    <>
      <h1 className="accomodationDetailed__title">{title}</h1>
      <p className="accomodationDetailed__description">{description}</p>
      <div className="accomodationDetailed__priceAmmeneties">
        <div className="price">
          <h2 className="accomodationDetailed__subHeading">Price</h2>
          <p className="accomodationDetailed__price">{price} Kr/per night</p>
        </div>
        <div className="ammeneties">
          <h2 className="accomodationDetailed__subHeading">Ammeneties</h2>
          <div className={wifi ? "amenity" : "amenity--hidden"}>
            <i className="amenity__icon">
              <FontAwesomeIcon icon={faWifi} />
            </i>
            <p> wifi</p>
          </div>
          <div className={breakfast ? "amenity" : "amenity--hidden"}>
            <i className="amenity__icon">
              <FontAwesomeIcon icon={faUtensils} />
            </i>
            <p>breakfast</p>
          </div>
          <div className={parking ? "amenity" : "amenity--hidden"}>
            <i className="amenity__icon">
              <FontAwesomeIcon icon={faCar} />
            </i>
            <p>parking</p>
          </div>
          <div className={resturant ? "amenity" : "amenity--hidden"}>
            <i className="amenity__icon">
              <FontAwesomeIcon icon={faCocktail} />
            </i>
            <p>resuturant</p>
          </div>
        </div>
      </div>
    </>
  );
}

AccomodationInfo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  wifi: PropTypes.bool,
  parking: PropTypes.bool,
  resturant: PropTypes.bool,
  breakfast: PropTypes.bool,
};
