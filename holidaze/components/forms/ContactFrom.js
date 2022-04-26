import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { BASE_URL, CONTACT_PATH } from "../../constants/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faMapLocation } from "@fortawesome/free-solid-svg-icons";
const schema = yup.object().shape({
  name: yup.string().required("Please enter your name").min(3, "your name must be over 3 characters "),
  email: yup
    .string()
    .required("please enter in an email")
    .matches(
      /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])+$/,
      "must be a valid email address"
    ),
  subject: yup.string().required("please enter a subject").min(6, "the subject must be over 6 characters"),
  message: yup.string().required("please enter a meessage").min(20, "the message must be over 20 characters"),
});
export function ContactForm() {
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
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name</label>
        <input {...register("name")} id="name" />
        {errors.name && <p className="form__error">{errors.name.message}</p>}
        <label htmlFor="email">Email</label>
        <input {...register("email")} id="email" />
        {errors.subject && <p className="form__error">{errors.subject.message}</p>}
        <label htmlFor="subject">Subject</label>
        <input {...register("subject")} id="subject" />
        {errors.subject && <p className="form__error">{errors.subject.message}</p>}
        <label htmlFor="message">Message</label>
        <textarea {...register("message")} id="message" />
        {errors.message && <p className="form__error">{errors.message.message}</p>}
        <button>Send Message</button>
      </form>

      <div>
        <p>
          <FontAwesomeIcon icon={faPhone} />
          +47 99900123
        </p>
        <p>
          <FontAwesomeIcon icon={faEnvelope} />
          holidazebergen@email.com
        </p>

        <p>
          <FontAwesomeIcon icon={faMapLocation} /> Bergensveien 38, 5020 Bergen
        </p>
      </div>
    </div>
  );
}

//lacking clearing of input fields and sucessMessage
