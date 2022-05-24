import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { BASE_URL, ENQUIRIES_PATH } from "../../constants/api";
import { Error } from "../errors/Error";
import { useDisplay } from "../../hooks/useDisplay";
import { ModalFormSuccess } from "./formSuccess/ModalFromSuccess";
import { FormGroupInput } from "./formGroup/FormGroupInput";

const schema = yup.object().shape({
  accomodation: yup.string(),
  name: yup.string().required("Please enter your name").min(3, "name must be over 3 characters "),
  email: yup
    .string()
    .required("please enter an email")
    .matches(
      /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])+$/,
      "enter a valid email address"
    ),
  guests: yup.number().integer().required().typeError("Please select number of guests"),
  from: yup.string().required("please select a check in date"),
  to: yup.string().required("please select a check out date"),
});

export function EnquiriesForm({ accomodationtitle, modalToggle }) {
  const [userinfo, setUserinfo] = useState({});
  const [display, toggleDisplay] = useDisplay();
  const [formDisplay, setFormDisplay] = useState(true);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function resetModal() {
    setUserinfo({});
    toggleDisplay();
    setFormDisplay(true);
    reset();
    modalToggle();
  }

  async function onSubmit(data) {
    const url = BASE_URL + ENQUIRIES_PATH;

    try {
      const response = await axios.post(url, data);

      if (response.status === 200) {
        setUserinfo(data);
        toggleDisplay();
        setFormDisplay(false);
      }
    } catch (error) {
      setError("A server error occured please try again");
    }
  }
  return (
    <>
      <form className={formDisplay ? "modal__form" : "modal__form--hidden"} onSubmit={handleSubmit(onSubmit)}>
        <Error errorType="form__warning">{error}</Error>
        <input {...register("accomodation")} className="modal__input--hidden" value={accomodationtitle} />
        <FormGroupInput form="modal" id="name" register={register} label="Name" error={errors.name && errors.name.message} />
        <FormGroupInput form="modal" id="email" register={register} label="Email" error={errors.email && errors.email.message} />

        <div className="modal__group">
          <label className="modal__label" htmlFor="pax">
            No. Guests
          </label>
          <select className="modal__select" {...register("guests")} id="pax" defaultValue="">
            <option value="" disabled hidden>
              Select number of guests
            </option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
          </select>
          <Error errorType="form__warning">{errors.guests && errors.guests.message}</Error>
        </div>

        <div className="modal__group">
          <label className="modal__label" htmlFor="from">
            Check in
          </label>
          <input className="modal__input" type="date" {...register("from")} id="from" />
          <Error errorType="form__warning">{errors.from && errors.from.message}</Error>
        </div>

        <div className="modal__group">
          <label className="modal__label" htmlFor="to">
            Check Out
          </label>
          <input className="modal__input" type="date" {...register("to")} id="to" />
          <Error errorType="form__warning">{errors.to && errors.to.message}</Error>
        </div>

        <div className="modal__btnContainer">
          <button className="modal__btn">Make Enquiry</button>
          <button className="modal__btn--cancel" onClick={modalToggle} type="button">
            Cancel
          </button>
        </div>
      </form>
      <ModalFormSuccess
        display={display}
        name={userinfo.name}
        email={userinfo.email}
        guests={userinfo.guests}
        from={userinfo.from}
        to={userinfo.to}
        resetModal={resetModal}
      />
    </>
  );
}

EnquiriesForm.propTypes = {
  accomodationTitle: PropTypes.string,
  modalToggle: PropTypes.func,
};
