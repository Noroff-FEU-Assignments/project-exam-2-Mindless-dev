import { Layout } from "../components/layouts/Layout";
import { LayoutContainer } from "../components/layouts/LayoutContainer";
import { AccomodationList } from "../components/accomodations/AccomodationList";
import { MainHeader } from "../components/headers/MainHeader";
import Head from "next/head";

export default function Accomodations() {
  return (
    <>
      <Head>
        <title>Holidaze | Accomodations</title>
        <meta name="description" content="Holidaze Accomodation page, all of holidazes accomodations" />
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Layout>
        <LayoutContainer>
          <MainHeader>All Acommodations</MainHeader>
          <AccomodationList />
        </LayoutContainer>
      </Layout>
    </>
  );
}

//fine
