import { useState, useEffect } from "react";
import { BASE_URL, ACCOMODATION_PATH } from "../../constants/api";
import Image from "next/image";
import Link from "next/link";
export function AccomodationList() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accomodations, setAccomodations] = useState([]);

  useEffect(() => {
    async function getAccomodations() {
      const url = BASE_URL + ACCOMODATION_PATH;
      try {
        const response = await fetch(url);
        const json = await response.json();
        if (response.ok) {
          setAccomodations(json);
        }
      } catch (error) {
        setError("en error occured");
      } finally {
        setLoading(false);
      }
    }
    getAccomodations();
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <>
      {accomodations.map((accomodation) => {
        return (
          <div className="accomodation" key={accomodation.id}>
            <Link href="/">
              <a>
                <Image src={accomodation.images[0].url} height="390" width="316" />
              </a>
            </Link>

            <h3>{accomodation.title}</h3>
            <p>{accomodation.price}</p>
            <p>{accomodation.description}</p>
            <Link href={`/accomodation/${accomodation.id}`}>learn more</Link>
          </div>
        );
      })}
    </>
  );
}
