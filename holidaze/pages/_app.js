import { AuthorizationProvider } from "../context/AuthorzationProvider";
import "../sass/style.scss";

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
