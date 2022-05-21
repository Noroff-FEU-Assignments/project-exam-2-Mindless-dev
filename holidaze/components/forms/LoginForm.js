import * as yup from "yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useContext } from "react";
import { BASE_URL, AUTH_PATH } from "../../constants/api";
import AuthContext from "../../context/Authorzation";
import { useRouter } from "next/router";
import { Error } from "../errors/Error";

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
      setLoggingIn("logging in.. ");
      const url = BASE_URL + AUTH_PATH;
      const response = await axios.post(url, data);
      setAuthorization(response.data);
      path.push("/admin");
    } catch (error) {
      setLoginError("invalid password or username");
      setLoggingIn(false);
    }
  }

  return (
    <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
      <Error errorType="form__warning">{loginError}</Error>
      <label className="login__label" htmlFor="userName">
        Username
      </label>
      <input className="login__input" {...register("identifier")} id="userName" />

      <Error errorType="form__warning">{errors.identifier && errors.identifier.message}</Error>
      <label className="login__label" htmlFor="password">
        Password
      </label>
      <input className="login__input" type="password" {...register("password")} id="password" />
      <Error errorType="form__warning">{errors.password && errors.password.message}</Error>
      <button className="login__btn">{loggingIn ? loggingIn : "Log In"}</button>
    </form>
  );
}
