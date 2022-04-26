import { BergenActivites } from "../components/home/BergenActivites";
import { IntroText } from "../components/home/IntroText";
import { Layout } from "../components/layouts/Layout";

export default function Home() {
  return (
    <Layout>
      <IntroText />
      <BergenActivites />
    </Layout>
  );
}
