import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Error } from "../errors/Error";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BASE_URL, ACCOMODATION_PATH } from "../../constants/api";
import { useContext } from "react";
import AuthContext from "../../context/Authorzation";
import { FormSucess } from "./formSuccess/FormSuccess";
import { useCloudinaryWidget } from "../../hooks/useCloudinaryWidget";

const schema = yup.object().shape({
  title: yup.string().required("Please input Accomodation Title").min(8, "The title must be over 8 characters"),
  description: yup.string().required("Please enter a description").min(20, "the message must be over 20 characters"),
  price: yup.number("please input a number").required("please enter a Price").min(99, "the price must be over 99kr"),
  imageurl1: yup.string(),
  imageurl2: yup.string(),
  imagealt1: yup.string("please describe image 1").required().min(10, "image description must be a minimum of 10 characters"),
  imagealt2: yup.string("please describe the second image").required().min(10, "image description must be a minimum of 10 characters"),
  resuturant: yup.boolean(),
  wifi: yup.boolean(),
  breakfast: yup.boolean(),
  parking: yup.boolean(),
  featured: yup.boolean(),
});

export function AccomodationForm() {
  const [error, setError] = useState(null);
  const [Authorzation, setAuthorization] = useContext(AuthContext);
  const [widget, widget2, secondImage, setSecondImage, mainImage, setMainImage] = useCloudinaryWidget();
  const [hidden, sethidden] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    const url = BASE_URL + ACCOMODATION_PATH;
    data.imageurl1 = mainImage;
    data.imageurl2 = secondImage;
    console.log(data);
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${Authorzation.jwt}`,
        },
      };

      const response = await axios.post(url, data, options);
      console.log(response);
      if (response.status === 200) {
        sethidden(false);

        setTimeout(() => {
          reset();
          setMainImage("");
          setSecondImage("");
          sethidden(true);
        }, 3000);
      }
    } catch (error) {
      setError("an error Occoured please try to refresh the page");
    }
  }

  return (
    <>
      <form className="accomodationForm" onSubmit={handleSubmit(onSubmit)}>
        <Error errorType="form__warning">{error}</Error>
        <div className="accomodationForm__container">
          <div className="accomodationForm__layout">
            <div className="accomodationForm__group">
              <label htmlFor="title">Accomodation title</label>
              <input className="accomodationForm__input" {...register("title")} id="title" />
              <Error errorType="form__warning">{errors.title && errors.title.message}</Error>
            </div>
            <div className="accomodationForm__group">
              <label htmlFor="description"> Accomodation Description</label>
              <textarea className="accomodationForm__textarea" {...register("description")} id="description" />
              <Error errorType="form__warning">{errors.description && errors.description.message}</Error>
            </div>
            <div className="accomodationForm__group">
              <label htmlFor="startingPrice">Starting Price</label>
              <input className="accomodationForm__input" {...register("price")} id="price" />
              <Error errorType="form__warning">{errors.price && errors.price.message}</Error>
            </div>

            <div className="accomodationForm__ammeneties">
              <h3>Ammeneties</h3>
              <label htmlFor="resturant">Resturant</label>
              <input type="checkbox" id="resturant" {...register("resturant")} />
              <label htmlFor="breakfast">Breakfast</label>
              <input type="checkbox" id="breakfast" {...register("breakfast")} />
              <label htmlFor="wifi">wifi</label>
              <input type="checkbox" id="wifi" {...register("wifi")} />
              <label htmlFor="parking">Parking</label>
              <input type="checkbox" id="parking" {...register("parking")} />
            </div>
            <div className="accomodationForm__featured">
              <label htmlFor="featured"> Featured</label>
              <input type="checkbox" id="featured" {...register("featured")} />
            </div>
          </div>

          <div className="accomodationForm__layout">
            <div className="accomodationForm__group">
              <label htmlFor="image1">Accomodation Image</label>
              <input className="accomodationForm__input" {...register("imageurl1")} id="image1" disabled defaultValue={mainImage} />
              <Error errorType="form__warning">{errors.imageurl1 && errors.imageurl1.message}</Error>
              <button
                className="accomodationForm__uploadBtn"
                onClick={() => {
                  widget.open();
                }}
                type="button"
              >
                Upload Image
              </button>
            </div>
            <div className="accomodationForm__group">
              <label htmlFor="imagealt1">Accomodation room image description</label>
              <input className="accomodationForm__input" {...register("imagealt1")} id="imagealt1" />
              <Error errorType="form__warning"> {errors.imagealt1 && errors.imagealt1.message}</Error>
            </div>
            <div className="accomodationForm__group">
              <label htmlFor="image2">Accomodation room Image </label>
              <input className="accomodationForm__input" {...register("imageurl2")} id="image2" defaultValue={secondImage} />
              <Error errorType="form__warning">{errors.imageurl2 && errors.imageurl2.message}</Error>
              <button
                className="accomodationForm__uploadBtn"
                onClick={() => {
                  widget2.open();
                }}
                type="button"
              >
                Upload image
              </button>
            </div>
            <div className="accomodationForm__group">
              <label htmlFor="imagealt2">Accomodation Image Room Description</label>
              <input className="accomodationForm__input" {...register("imagealt2")} id="imagealt2" />
              <Error errorType="form__warning">{errors.imagealt2 && errors.imagealt2.message}</Error>
            </div>
          </div>
        </div>
        <button type="submit" className="accomodationForm__submitBtn">
          Create Accomodation
        </button>
      </form>
      <FormSucess messageType={hidden ? "accomodationForm__success--hidden" : "accomodationForm__success"}>
        New accomodation created successfully
      </FormSucess>
    </>
  );
}
