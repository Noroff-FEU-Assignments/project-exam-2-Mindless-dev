import { Layout } from "../components/layouts/Layout";
import AuthContext from "../context/Authorzation";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Messages } from "../components/admin/Messages";
import axios from "axios";
import Link from "next/link";
import { AccomodationForm } from "../components/forms/AccomodationForm";

export default function Admin(props) {
  const [Authorzation, setAuthorization] = useContext(AuthContext);
  const path = useRouter();

  /*
  causes error on refresh 
  if (!Authorzation) {
    path.push("/");
  }
  */
  return (
    <Layout>
      <h1>admin</h1>
      <AccomodationForm />
      <Messages />
    </Layout>
  );
}
