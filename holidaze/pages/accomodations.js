import { Layout } from "../components/layouts/Layout";
import { AccomodationList } from "../components/accomodations/AccomodationList";
export default function Accomodation() {
  return (
    <Layout>
      <h1>All Accomodations</h1>
      <p>lorem ipsum dolor.</p>
      <AccomodationList />
    </Layout>
  );
}
