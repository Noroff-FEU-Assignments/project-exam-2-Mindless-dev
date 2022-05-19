import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

export function Loading() {
  return (
    <div className="loading">
      <i className="loading__spinner">
        <FontAwesomeIcon icon={faGear} />
      </i>
    </div>
  );
}
