import { LoginForm } from "../components/forms/LoginForm";
import { Layout } from "../components/layouts/Layout";
import { LayoutContainer } from "../components/layouts/LayoutContainer";
import { MainHeader } from "../components/headers/MainHeader";
import Head from "next/head";

export default function Login() {
  return (
    <>
      <Head>
        <title>Holidaze | Log In</title>
        <meta name="description" content="Holidaze log in page, admin login for holidaze to handle enquires and contact enquires" />
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Layout>
        <LayoutContainer>
          <MainHeader>Log in</MainHeader>
          <LoginForm />
        </LayoutContainer>
      </Layout>
    </>
  );
}
