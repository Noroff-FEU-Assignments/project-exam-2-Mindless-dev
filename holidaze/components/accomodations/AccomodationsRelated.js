import { Accomodation } from "./Accomodation";
import { BASE_URL, ACCOMODATION_PATH } from "../../constants/api";
import { Loading } from "../../components/loading/Loading";
import { Error } from "../../components/errors/Error";
import useApiCall from "../../hooks/useApiCall";

export function AccomodationsRelated() {
  const url = BASE_URL + ACCOMODATION_PATH;
  const [apiData, searchData, setSearchData, loading, error] = useApiCall(url);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error errorType="error">An Error occured, please refresh the page</Error>;
  }

  return apiData.map((relatedAccomodation) => {
    if (relatedAccomodation.featured) {
      return (
        <Accomodation
          key={relatedAccomodation.title}
          id={relatedAccomodation.id}
          title={relatedAccomodation.title}
          image={relatedAccomodation.images[0].url}
          imageAlt={relatedAccomodation.imagealt1}
          price={relatedAccomodation.price}
          description={relatedAccomodation.description}
        />
      );
    }
  });
}
