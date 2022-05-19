import Image from "next/image";
import { useState } from "react";
import { Modal } from "./Modal";
import PropTypes from "prop-types";
import { AccomodationInfo } from "./AccomodationInfo";

export function AccomodationDetailed({
  title,
  hotelImage,
  roomImage,
  description,
  price,
  wifi,
  parking,
  resturant,
  breakfast,
  hotelImageAlt,
  roomImageAlt,
}) {
  const [highlitedImage, setHiglitedImage] = useState("hotel");
  const [modal, setModal] = useState("modal--hidden");

  function imgToggle(event) {
    if (event.target.id === "hotel") {
      setHiglitedImage("hotel");
    } else {
      setHiglitedImage("");
    }
  }

  function toggleModal() {
    if (modal === "modal--hidden") {
      setModal("modal");
    } else {
      setModal("modal--hidden");
    }
  }
  return (
    <div className="accomodationDetailed">
      <div className="accomodationDetailed__images">
        <Image
          src={highlitedImage === "hotel" ? hotelImage : roomImage}
          alt={highlitedImage === "hotel" ? hotelImageAlt : roomImageAlt}
          height="500"
          width="400"
        />
        <div className="accomodationDetailed__imageThumbnails">
          <div className={highlitedImage === "hotel" ? "imageThumbnail--active" : "imageThumbnail"}>
            <Image src={hotelImage} alt={hotelImageAlt} height="125" width="105" onClick={imgToggle} id="hotel" />
          </div>
          <div className={highlitedImage != "hotel" ? "imageThumbnail--active" : "imageThumbnail"}>
            <Image src={roomImage} alt={roomImageAlt} height="125" width="105" onClick={imgToggle} />
          </div>
        </div>
      </div>
      <div className="accomodationDetailed__information">
        <AccomodationInfo
          title={title}
          description={description}
          price={price}
          wifi={wifi}
          parking={parking}
          resturant={resturant}
          breakfast={breakfast}
        />
        <button className="accomodationDetailed__btn" onClick={toggleModal}>
          Enquiry
        </button>
      </div>

      <Modal
        modalToggle={toggleModal}
        className={modal}
        title={title}
        description={description}
        price={price}
        wifi={wifi}
        parking={parking}
        resturant={resturant}
        breakfast={breakfast}
      />
    </div>
  );
}

AccomodationDetailed.propTypes = {
  title: PropTypes.string,
  hotelImage: PropTypes.string,
  roomImage: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  wifi: PropTypes.bool,
  parking: PropTypes.bool,
  resturant: PropTypes.bool,
  breakfast: PropTypes.bool,
  roomImageAlt: PropTypes.string,
  hotelImageAlt: PropTypes.string,
};
