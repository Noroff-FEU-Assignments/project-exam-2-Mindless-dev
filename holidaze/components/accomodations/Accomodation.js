import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";

export function Accomodation({ id, title, image, imageAlt, price, description }) {
  return (
    <div className="accomodation">
      <Link href={`/accomodation/${id}`}>
        <a>
          <Image src={image} alt={imageAlt} height="390" width="316" />
        </a>
      </Link>

      <h3 className="accomodation__title">{title}</h3>
      <p className="accomodation__price">{price} kr/Night</p>
      <p className="accomodation__description">{description}</p>
      <Link href={`/accomodation/${id}`}>Learn more</Link>
    </div>
  );
}

Accomodation.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  price: PropTypes.number,
  description: PropTypes.string,
};
