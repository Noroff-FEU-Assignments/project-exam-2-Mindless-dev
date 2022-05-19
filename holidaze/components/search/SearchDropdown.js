import { useState } from "react";
import axios from "axios";
import { BASE_URL, ACCOMODATION_PATH } from "../../constants/api";
import { useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export function SearchDropdown() {
  const [searchResults, setSearchResults] = useState([]);
  const [accomodations, setAccomodations] = useState([]);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    async function getAccomodations() {
      const url = BASE_URL + ACCOMODATION_PATH;
      try {
        const response = await axios.get(url);
        setAccomodations(response.data);
        setSearchResults(response.data);
      } catch (error) {
        console.log("error");
      }
    }
    getAccomodations();
  }, []);

  function searchFunctionality() {
    const searchValue = event.target.value.trim().toLowerCase();
    const filterBySearch = accomodations.filter((accomodation) => {
      const name = accomodation.title.toLowerCase();
      setDisplay(true);
      if (name.startsWith(searchValue)) {
        return true;
      }

      if (!searchValue) {
        return true;
      }
    });
    setSearchResults(filterBySearch);
  }

  return (
    <div className="searchDropdown">
      <input className="searchDropdown__input" onKeyUp={searchFunctionality} placeholder="find your accomodation" />
      <div className="searchDropdown__icon">
        <FontAwesomeIcon icon={faSearch} />
      </div>
      <div className="searchDropdown__outerContainer">
        <ul className={display ? "innerContainer" : "innerContainer--hidden"}>
          {searchResults.length === accomodations.length ? (
            ""
          ) : searchResults.length === 0 ? (
            <p className="innerContainer__noSearchResult">No search results match</p>
          ) : (
            searchResults.map((result) => {
              return (
                <Link key={result.title} href={`/accomodation/${result.id}`}>
                  <a className="search__link">{`${result.title} | ${result.price} kr`}</a>
                </Link>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
}
