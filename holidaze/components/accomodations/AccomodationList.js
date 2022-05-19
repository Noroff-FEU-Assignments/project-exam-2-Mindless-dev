import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL, ACCOMODATION_PATH } from "../../constants/api";
import { Loading } from "../loading/Loading";
import { Accomodation } from "./Accomodation";
import { Error } from "../errors/Error";

export function AccomodationList() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accomodations, setAccomodations] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function getAccomodations() {
      const url = BASE_URL + ACCOMODATION_PATH;
      try {
        const response = await axios.get(url);

        if (response.status === 200) {
          setAccomodations(response.data);
          setSearchResults(response.data);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getAccomodations();
  }, []);

  function searchFunctionality() {
    const searchValue = event.target.value.trim().toLowerCase();
    const filterBySearch = accomodations.filter((accomodation) => {
      const name = accomodation.title.toLowerCase();
      if (name.startsWith(searchValue)) {
        return true;
      }

      if (!searchValue) {
        return true;
      }
    });
    setSearchResults(filterBySearch);
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error errorType="error">An error occured</Error>;
  }

  return (
    <>
      <div className="search">
        <input className="search__input" onKeyUp={searchFunctionality} />
        <i className="search__icon">
          <FontAwesomeIcon icon={faSearch} />
        </i>
      </div>
      <div className="accomodationContainer">
        {searchResults.length === 0 ? (
          <div className="accomodation__searchMessage">
            <p>No results matching search</p>
          </div>
        ) : (
          searchResults.map((accomodation) => {
            return (
              <Accomodation
                key={accomodation.id}
                id={accomodation.id}
                title={accomodation.title}
                image={!accomodation.imageurl1 ? accomodation.images[0].url : accomodation.imageurl1}
                imageAlt={accomodation.imagealt1}
                price={accomodation.price}
                description={accomodation.description}
              />
            );
          })
        )}
      </div>
    </>
  );
}
