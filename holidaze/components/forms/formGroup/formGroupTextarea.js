import PropTypes, { object } from "prop-types";
import { Error } from "../../errors/Error";

export function FormGroupTextarea({ error, id, form, register, label }) {
  return (
    <div className={form + "__group"}>
      <label htmlFor={id}>{label}</label>
      <textarea className={form + "__textarea"} id={id} {...register(id)} />
      <Error errorType="form__warning">{error}</Error>
    </div>
  );
}

FormGroupTextarea.propTypes = {
  error: PropTypes.string,
  id: PropTypes.string,
  form: PropTypes.string,
  register: PropTypes.func,
  form: PropTypes.string,
  label: PropTypes.string,
};
