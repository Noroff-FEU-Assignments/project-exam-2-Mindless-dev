import { BASE_URL, CONTACT_PATH } from "../../constants/api";
import { Loading } from "../loading/Loading";
import { Error } from "../errors/Error";
import { Message } from "./message/Message";
import useApiCall from "../../hooks/useApiCall";

export function Messages() {
  const url = BASE_URL + CONTACT_PATH;
  const [apiData, searchData, setSearchData, loading, error] = useApiCall(url);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error errorType="error">An Error occured, please refresh the page</Error>;
  }

  return (
    <div className="contactMessages">
      {apiData.map(function (message) {
        return <Message key={message.id} name={message.name} email={message.email} subject={message.subject} message={message.message} />;
      })}
    </div>
  );
}
