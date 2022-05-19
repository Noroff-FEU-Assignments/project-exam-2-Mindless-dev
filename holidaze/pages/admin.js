import { Layout } from "../components/layouts/Layout";
import { LayoutContainer } from "../components/layouts/LayoutContainer";
import AuthContext from "../context/Authorzation";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Messages } from "../components/admin/Messages";
import { AccomodationForm } from "../components/forms/AccomodationForm";
import { Enquiries } from "../components/admin/Enquires";
import Head from "next/head";
import { LogOutBtn } from "../components/admin/LogOutBtn";
import { useEffect } from "react";
import { MainHeader } from "../components/headers/MainHeader";

export default function Admin() {
  const [Authorzation, setAuthorization] = useContext(AuthContext);
  const path = useRouter();

  useEffect(() => {
    if (!Authorzation) {
      path.push("/");
    }
  });

  return (
    <>
      <Head>
        <title>Holidaze | Admin</title>
        <meta name="description" content="Holidaze admin, create new accomodations, See rqeuests and enquiries" />
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Layout>
        <LayoutContainer>
          <LogOutBtn />
          <MainHeader>Admin</MainHeader>
          <h2>Create New Accomodation</h2>
          <AccomodationForm />
          <h2>Hotel Enquiries</h2>
          <Enquiries />
          <h2>Messages</h2>
          <Messages />
        </LayoutContainer>
      </Layout>
    </>
  );
}
