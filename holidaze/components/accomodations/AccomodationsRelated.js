import { useEffect, useState } from "react";
import axios from "axios";
import { Accomodation } from "./Accomodation";
import { BASE_URL, ACCOMODATION_PATH } from "../../constants/api";
import { Loading } from "../../components/loading/Loading";
import { Error } from "../../components/errors/Error";

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
    return <Error errorType="error">An Error occured , Please refresh the page</Error>;
  }

  return related.map((relatedAccomodation) => {
    if (relatedAccomodation.featured) {
      return (
        <Accomodation
          key={relatedAccomodation.price}
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
