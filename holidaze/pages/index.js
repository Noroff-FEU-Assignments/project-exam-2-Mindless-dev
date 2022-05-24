import Head from "next/head";
import axios from "axios";
import PropTypes, { object } from "prop-types";
import Link from "next/link";
import { BergenActivites } from "../components/home/BergenActivites";
import { IntroText } from "../components/home/IntroText";
import { Layout } from "../components/layouts/Layout";
import { BASE_URL, ACCOMODATION_PATH } from "../constants/api";
import { Accomodation } from "../components/accomodations/Accomodation";
import { LayoutContainer } from "../components/layouts/LayoutContainer";

export default function Home({ accomodations }) {
  return (
    <>
      <Head>
        <title>Holidaze | Home</title>
        <meta name="description" content="Holidaze homepage, book your holiday accomodations in Bergen for the best deal" />
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Layout>
        <div className="heroImage"></div>
        <LayoutContainer>
          <IntroText />
          <h2 className="accomodationsFeatured__heading">Our Top Picks </h2>
          <div className="accomodationsFeatured">
            {accomodations.map((accomodation) => {
              if (accomodation.featured) {
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
              }
            })}
          </div>
          <div className="linkBtn">
            <Link href="/accomodations">All Accomodations</Link>
          </div>
          <BergenActivites />
        </LayoutContainer>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const url = BASE_URL + ACCOMODATION_PATH;
  let accomodations;

  try {
    const response = await axios.get(url);
    accomodations = response.data;
  } catch (error) {
    console.log(error);
  }

  return {
    props: { accomodations: accomodations },
  };
}

Home.propTypes = {
  accomodations: PropTypes.arrayOf(object),
};
