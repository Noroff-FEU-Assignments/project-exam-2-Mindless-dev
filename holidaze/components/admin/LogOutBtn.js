import { useRouter } from "next/router";
import { useContext } from "react";
import AuthContext from "../../context/Authorzation";

export function LogOutBtn() {
  const [Authorzation, setAuthorization] = useContext(AuthContext);
  const path = useRouter();

  function logOut() {
    setAuthorization(null);
    path.push("/");
  }
  return (
    <button className="logOutButton" onClick={logOut}>
      Log out
    </button>
  );
}
