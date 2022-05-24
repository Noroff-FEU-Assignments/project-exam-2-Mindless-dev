import PropTypes, { object } from "prop-types";
import { Error } from "../../errors/Error";

export function FormGroupInput({ error, id, form, register, label }) {
  return (
    <div className={form + "__group"}>
      <label htmlFor={id}>{label}</label>
      <input className={form + "__input"} id={id} {...register(id)} />
      <Error errorType="form__warning">{error}</Error>
    </div>
  );
}

FormGroupInput.propTypes = {
  error: PropTypes.string,
  id: PropTypes.string,
  form: PropTypes.string,
  register: PropTypes.func,
  form: PropTypes.string,
  label: PropTypes.string,
};
