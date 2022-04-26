import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL, AUTH_PATH } from "../../constants/api";
import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/Authorzation";
import { useRouter } from "next/router";

const schema = yup.object().shape({
  identifier: yup.string().required("Please enter a username"),
  password: yup.string().required("please enter a Password"),
});
export function LoginForm() {
  const [loginError, setLoginError] = useState(null);
  const [loggingIn, setLoggingIn] = useState(false);
  const [Authorzation, setAuthorization] = useContext(AuthContext);
  const path = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    try {
      setLoggingIn("logging in ");
      const url = BASE_URL + AUTH_PATH;
      const response = await axios.post(url, data);
      setAuthorization(response.data);
      path.push("/admin");
    } catch (error) {
      setLoginError("invalid username or password");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>{loginError}</p>
      <label htmlFor="userName">username</label>
      <input {...register("identifier")} id="userName" />
      {errors.username && <p className="form__error">{errors.username.message}</p>}
      <label htmlFor="password">Password</label>
      <input type="password" {...register("password")} id="password" />
      {errors.password && <p className="form_error">{errors.password.message}</p>}
      <button>{loggingIn}</button>
    </form>
  );
}
