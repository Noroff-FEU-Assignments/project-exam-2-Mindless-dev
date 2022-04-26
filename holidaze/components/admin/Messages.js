import { BASE_URL, CONTACT_PATH } from "../../constants/api";
//import axios from "axios";
import { useEffect, useState } from "react";

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
        console.log(json);

        if (response.ok) {
          setMessages(json);
          console.log(messages.title);
        } else {
          setError("an error occured");
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getMessages();
  }, []);

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {messages.map(function (message) {
        return (
          <div key={message.id}>
            <p>{message.name}</p>
            <p>{message.email}</p>
            <p>{message.subject}</p>
            <p>{message.message}</p>
          </div>
        );
      })}
    </>
  );
}
