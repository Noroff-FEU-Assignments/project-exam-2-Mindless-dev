import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import axios from "axios";
import { BASE_URL, CONTACT_PATH } from "../../constants/api";
import { Error } from "../errors/Error";
import { ContactInformation } from "../contact/ContactInformation";
import { FormGroupInput } from "./formGroup/FormGroupInput";
import { FormGroupTextarea } from "./formGroup/formGroupTextarea";

const schema = yup.object().shape({
  name: yup.string().required("Please enter your name").min(3, "Name must be over 3 characters "),
  email: yup
    .string()
    .required("please enter in an email")
    .matches(
      /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])+$/,
      "Email must be a valid"
    ),
  subject: yup.string().required("Please enter a subject").min(6, "The subject must be over 6 characters"),
  message: yup.string().required("Please enter a message").min(20, "The message must be over 20 characters"),
});
export function ContactForm() {
  const [hidden, setHidden] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
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

      if (response.status === 200) {
        setHidden(false);
        setTimeout(() => {
          setHidden(true);
          reset();
        }, 3000);
      }
    } catch (error) {
      setError("An error occured");
    }
  }

  return (
    <div className="contact">
      <Error errorType="form__warning">{error}</Error>
      <form className="contact__form" onSubmit={handleSubmit(onSubmit)}>
        <FormGroupInput label="Name" form="contact" id="name" error={errors.name && errors.name.message} register={register} />
        <FormGroupInput label="Email" form="contact" id="email" error={errors.email && errors.email.message} register={register} />
        <FormGroupInput label="Subject" form="contact" id="subject" error={errors.subject && errors.subject.message} register={register} />
        <FormGroupTextarea label="Message" form="contact" id="message" error={errors.message && errors.message.message} register={register} />
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
