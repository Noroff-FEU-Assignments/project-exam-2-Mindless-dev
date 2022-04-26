import axios from "axios";
import { BASE_URL, ACCOMODATION_PATH } from "../../constants/api";

export default function accomodationDetailed({ accomodation }) {
  return <div>{accomodation.title}</div>;
}

export async function getStaticPaths() {
  try {
    const url = BASE_URL + ACCOMODATION_PATH;
    const response = await axios.get(url);
    const accomodations = response.data;

    const paths = accomodations.map(function (accomodation) {
      console.log(accomodation);
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
    accomodation = response;
  } catch (error) {
    console.log(error);
  }

  return {
    props: { accomodation: accomodation },
  };
}
