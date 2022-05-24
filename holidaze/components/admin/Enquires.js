import { Loading } from "../loading/Loading";
import { Error } from "../errors/Error";
import { BASE_URL, ENQUIRIES_PATH } from "../../constants/api";
import { Enquiry } from "./enquires/Enquiry";
import useApiCall from "../../hooks/useApiCall";

export function Enquiries() {
  const url = BASE_URL + ENQUIRIES_PATH;
  const [apiData, searchData, setSearchData, loading, error] = useApiCall(url);

  if (error) {
    return <Error errorType="error">an error occured please refresh the page</Error>;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="enquiryContainer">
      {apiData.map((enquiry) => {
        return (
          <Enquiry
            key={enquiry.id}
            id={enquiry.id}
            name={enquiry.name}
            email={enquiry.email}
            from={enquiry.from}
            to={enquiry.to}
            guests={enquiry.guests}
            accomodation={enquiry.accomodation}
          />
        );
      })}
    </div>
  );
}
