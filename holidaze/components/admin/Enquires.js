import { useEffect, useState } from "react";
import axios from "axios";
import { Loading } from "../loading/Loading";
import { Error } from "../errors/Error";
import { BASE_URL, ENQUIRIES_PATH } from "../../constants/api";

export function Enquiries() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [enquiries, setEnquiries] = useState(null);

  useEffect(() => {
    async function getEnquires() {
      const url = BASE_URL + ENQUIRIES_PATH;

      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          setEnquiries(response.data);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getEnquires();
  }, []);

  if (error) {
    return <Error errorType="error">Something Went wrong</Error>;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="enquiryContainer">
      {enquiries.map((enquiry) => {
        return (
          <div key={enquiry.id} className="enquiry">
            <div className="enquiry__container">
              <p className="enquiry__info">
                <span className="enquiry__title--bold">Name:</span> {enquiry.name}
              </p>
              <p className="enquiry__info">
                <span className="enquiry__title--bold">Email:</span> {enquiry.email}
              </p>
            </div>
            <div className="enquiry__container">
              <p className="enquiry__title--bold"> Accomodation:</p>
              <p>{enquiry.accomodation}</p>
            </div>
            <div className="enquiry__container">
              <p className="enquiry__title">
                <span className="enquiry__title--bold">Book in:</span> {enquiry.from}
              </p>
              <p className="enquiry__title">
                <span className="enquiry__title--bold"> Check out:</span> {enquiry.to}
              </p>
            </div>
            <div className="enquiry__container">
              <p className="enquiry__information">
                <span className="enquiry__title--bold">Guests: </span>
                {`${enquiry.guests} people `}
              </p>
              <p className="enquiry__info">
                <span className="enquiry__title--bold">Order.No:</span> {enquiry.id}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
