import { BASE_URL, CONTACT_PATH } from "../../constants/api";
import { useEffect, useState } from "react";
import { Loading } from "../loading/Loading";
import { Error } from "../errors/Error";

export function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getMessages() {
      const url = BASE_URL + CONTACT_PATH;
      try {
        const response = await fetch(url);
        const json = await response.json();

        if (response.ok) {
          setMessages(json);
        } else {
          setError("an error occured");
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getMessages();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error errorType="error">An Error occured, please refresh the page</Error>;
  }

  return (
    <div className="contactMessages">
      {messages.map(function (message) {
        return (
          <div key={message.id} className="contactMessage">
            <div className="contactMessage__info">
              <p>
                <span className="contactMessage__title--bold">Name:</span> {message.name}
              </p>
              <p>
                <span className="contactMessage__title--bold">Email:</span> {message.email}
              </p>
              <p>
                <span className="contactMessage__title--bold">Subject:</span> {message.subject}
              </p>
            </div>
            <div className="contactMessage__info">
              <p className="contactMessage__title--bold">Message:</p>
              <p>{message.message}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
