import { AuthorizationProvider } from "../context/Authorzation";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthorizationProvider>
      <Component {...pageProps} />
    </AuthorizationProvider>
  );
}

export default MyApp;
