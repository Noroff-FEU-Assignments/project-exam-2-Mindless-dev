import { ContactForm } from "../components/forms/ContactFrom";
import { Layout } from "../components/layouts/Layout";
import { LayoutContainer } from "../components/layouts/LayoutContainer";
import { MainHeader } from "../components/headers/MainHeader";
import Head from "next/head";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Holidaze | Contact</title>
        <meta name="description" content="Holidaze contact page, contact the holidazes admins for help/questions" />
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Layout>
        <LayoutContainer>
          <MainHeader>Contact Us</MainHeader>
          <ContactForm />
        </LayoutContainer>
      </Layout>
    </>
  );
}
