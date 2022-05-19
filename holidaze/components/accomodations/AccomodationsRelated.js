import { useEffect, useState } from "react";
import { Loading } from "../../components/loading/Loading";
import { Error } from "../../components/errors/Error";
import axios from "axios";
import { Accomodation } from "./Accomodation";
import { BASE_URL, ACCOMODATION_PATH } from "../../constants/api";

export function AccomodationsRelated() {
  const [related, setRelated] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getRelated() {
      const url = BASE_URL + ACCOMODATION_PATH;
      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          setRelated(response.data);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getRelated();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error errorType="error">an Error occured</Error>;
  }

  return related.map((relatedAccomodation) => {
    if (relatedAccomodation.featured) {
      return (
        <Accomodation
          key={relatedAccomodation.id}
          id={relatedAccomodation.id}
          title={relatedAccomodation.title}
          image={!relatedAccomodation.imageurl1 ? relatedAccomodation.images[0].url : relatedAccomodation.imageurl1}
          imageAlt={relatedAccomodation.imagealt1}
          price={relatedAccomodation.price}
          description={relatedAccomodation.description}
        />
      );
    }
  });
}
