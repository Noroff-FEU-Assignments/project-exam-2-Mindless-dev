import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { BASE_URL, CONTACT_PATH } from "../../constants/api";
import { useState } from "react";
import { Error } from "../errors/Error";
import { ContactInformation } from "../contact/ContactInformation";

const schema = yup.object().shape({
  name: yup.string().required("Please enter your name").min(3, "Name must be over 3 characters "),
  email: yup
    .string()
    .required("please enter in an email")
    .matches(
      /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])+$/,
      "must be a valid email address"
    ),
  subject: yup.string().required("Please enter a subject").min(6, "The subject must be over 6 characters"),
  message: yup.string().required("Please enter a message").min(20, "The message must be over 20 characters"),
});
export function ContactForm() {
  const [hidden, setHidden] = useState(true);
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    try {
      const url = BASE_URL + CONTACT_PATH;
      const response = await axios.post(url, data);
      console.log(data);

      if (response.status === 200) {
        setHidden(false);
        setTimeout(() => {
          setHidden(true);
          reset();
        }, 3000);
      } else {
        setError("A server error occured, please try again.");
      }
    } catch (error) {
      setError("An error occured");
    }
  }

  return (
    <div className="contact">
      <Error errorType="form__warning">{error}</Error>
      <form className="contact__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="contact__group">
          <label className="contact__label" htmlFor="name">
            Name
          </label>
          <input className="contact__input" {...register("name")} id="name" />
          <Error errorType="form__warning">{errors.name && errors.name.message}</Error>
        </div>
        <div className="contact__group">
          <label className="contact__label" htmlFor="email">
            Email
          </label>
          <input className="contact__input" {...register("email")} id="email" />
          <Error errorType="form__warning">{errors.email && errors.email.message}</Error>
        </div>
        <div className="contact__group">
          <label className="contact__label" htmlFor="subject">
            Subject
          </label>
          <input className="contact__input" {...register("subject")} id="subject" />
          <Error errorType="form__warning">{errors.subject && errors.subject.message}</Error>
        </div>
        <div className="contact__group">
          <label className="contact__label" htmlFor="message">
            Message
          </label>
          <textarea className="contact__textarea" {...register("message")} id="message" />
          <Error errorType="form__warning">{errors.message && errors.message.message}</Error>
        </div>

        <button className="contact__btn">Send Message</button>
      </form>

      <ContactInformation />

      <div className={hidden ? "contact__success--hidden" : "contact__success"}>
        <div className="contact__success__bg">
          <p className="contact__success__message"> Thank you for contacting us, have a nice day</p>
        </div>
      </div>
    </div>
  );
}
