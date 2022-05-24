import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BASE_URL, ACCOMODATION_PATH } from "../../constants/api";
import { Loading } from "../loading/Loading";
import { Accomodation } from "./Accomodation";
import { Error } from "../errors/Error";
import useApiCall from "../../hooks/useApiCall";

export function AccomodationList() {
  const url = BASE_URL + ACCOMODATION_PATH;

  const [apiData, searchData, setSearchData, loading, error] = useApiCall(url);

  function searchFunctionality(event) {
    const searchValue = event.target.value.trim().toLowerCase();
    const filterBySearch = apiData.filter((accomodation) => {
      const name = accomodation.title.toLowerCase();
      const description = accomodation.description;

      if (name.startsWith(searchValue) || description.includes(searchValue)) {
        return true;
      }

      if (!searchValue) {
        return true;
      }
    });
    setSearchData(filterBySearch);
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
        {searchData.length === 0 ? (
          <div className="accomodation__searchMessage">
            <p>No results matching search</p>
          </div>
        ) : (
          searchData.map((accomodation) => {
            return (
              <Accomodation
                key={accomodation.id}
                id={accomodation.id}
                title={accomodation.title}
                image={accomodation.images[0].url}
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
