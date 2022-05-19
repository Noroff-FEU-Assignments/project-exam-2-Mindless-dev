import axios from "axios";
import { BASE_URL, ACCOMODATION_PATH } from "../../constants/api";
import { Layout } from "../../components/layouts/Layout";
import { useState } from "react";
import Head from "next/head";
import { useEffect } from "react";
import { AccomodationDetailed } from "../../components/detailed/AccomodationDetailed";
import { LayoutContainer } from "../../components/layouts/LayoutContainer";
import Proptypes, { object } from "prop-types";

import { AccomodationsRelated } from "../../components/accomodations/AccomodationsRelated";

export default function AccomodationSpecific({ accomodation }) {
  const [parking, setParking] = useState(false);
  const [wifi, setWifi] = useState(false);
  const [resturant, setResturant] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [related, setRelated] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (accomodation.wifi) {
      setWifi(true);
    }
    if (accomodation.parking) {
      setParking(true);
    }

    if (accomodation.resturant) {
      setResturant(true);
    }

    if (accomodation.breakfast) {
      setBreakfast(true);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Holidaze | {accomodation.title}</title>
        <meta name="description" content="Holidaze specific accomodation, make enquires" />
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Layout>
        <LayoutContainer>
          <AccomodationDetailed
            title={accomodation.title}
            hotelImage={!accomodation.imageurl1 ? accomodation.images[0].url : accomodation.imageurl1}
            hotelImageAlt={accomodation.imagealt1}
            roomImage={!accomodation.imageurl2 ? accomodation.images[1].url : accomodation.imageurl2}
            roomImageAlt={accomodation.imagealt2}
            description={accomodation.description}
            price={accomodation.price}
            wifi={wifi}
            parking={parking}
            resturant={resturant}
            breakfast={breakfast}
          />

          <h2 className="accomodationsRelated__subheading">Related Accomodations</h2>
          <div className="accomodationsRelated">
            <AccomodationsRelated />
          </div>
        </LayoutContainer>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  try {
    const url = BASE_URL + ACCOMODATION_PATH;
    const response = await axios.get(url);
    const accomodations = response.data;

    const paths = accomodations.map((accomodation) => {
      return { params: { id: accomodation.id.toString() } };
    });

    return { paths: paths, fallback: false };
  } catch (error) {
    console.log(error);
  }
}

export async function getStaticProps({ params }) {
  const url = BASE_URL + ACCOMODATION_PATH + params.id;
  let accomodation = null;

  try {
    const response = await axios.get(url);
    accomodation = response.data;
  } catch (error) {
    console.log(error);
  }

  return {
    props: { accomodation: accomodation },
  };
}

AccomodationSpecific.proptypes = {
  accomodation: Proptypes.arrayOf(object),
};

//add error div
