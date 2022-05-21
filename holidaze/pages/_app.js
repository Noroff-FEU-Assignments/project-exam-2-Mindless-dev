import { AuthorizationProvider } from "../context/Authorzation";
import "../sass/style.scss";
import Script from "next/script";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthorizationProvider>
        <Component {...pageProps} />
      </AuthorizationProvider>
    </>
  );
}

export default MyApp;