import { useState } from "react";
import { BASE_URL, ACCOMODATION_PATH } from "../../constants/api";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import useApiCall from "../../hooks/useApiCall";

export function SearchDropdown() {
  const url = BASE_URL + ACCOMODATION_PATH;
  const [display, setDisplay] = useState(false);
  const [apiData, searchData, setSearchData, loading, error] = useApiCall(url);

  function searchFunctionality() {
    const searchValue = event.target.value.trim().toLowerCase();
    const filterBySearch = apiData.filter((accomodation) => {
      const name = accomodation.title.toLowerCase();
      setDisplay(true);
      if (name.startsWith(searchValue)) {
        return true;
      }

      if (!searchValue) {
        return true;
      }
    });
    setSearchData(filterBySearch);
  }

  return (
    <div className="searchDropdown">
      <input className="searchDropdown__input" onKeyUp={searchFunctionality} placeholder="find your accomodation" />
      <div className="searchDropdown__icon">
        <FontAwesomeIcon icon={faSearch} width="1em" />
      </div>
      <div className="searchDropdown__outerContainer">
        <ul className={display ? "innerContainer" : "innerContainer--hidden"}>
          {searchData.length === apiData.length ? (
            ""
          ) : searchData.length === 0 ? (
            <p className="innerContainer__noSearchResult">No search results match</p>
          ) : (
            searchData.map((result) => {
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
