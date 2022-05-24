import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState, useContext } from "react";
import { BASE_URL, ACCOMODATION_PATH } from "../../constants/api";
import AuthContext from "../../context/AuthorzationProvider";
import { FormSuccess } from "./formSuccess/FormSuccess";
import { Error } from "../errors/Error";
import { FormGroupInput } from "./formGroup/FormGroupInput";
import { FormGroupTextarea } from "./formGroup/formGroupTextarea";

const schema = yup.object().shape({
  title: yup.string().required("Please enter a accomodation title").min(8, "The title must be over 8 characters"),
  description: yup.string().required("Please enter a description").min(20, "The description must be over 20 characters"),
  price: yup.number().required("please enter a Price").min(99, "The price must be over 99kr").typeError("Please enter a price"),
  image1: yup.mixed().test("imageUpload", "Please upload a jpeg", (value) => {
    if (value.length != 0 && value[0].type === "image/jpeg") {
      return value;
    }
  }),
  image2: yup.mixed().test("imageUpload", "Please upload a jpeg", (value) => {
    if (value.length != 0 && value[0].type === "image/jpeg") {
      return value;
    }
  }),
  imagealt1: yup.string().required("please describe the accomodation image").min(10, "image description must be a minimum of 10 characters"),
  imagealt2: yup.string().required("please describe the room image").min(10, "image description must be a minimum of 10 characters"),
  resturant: yup.boolean(),
  wifi: yup.boolean(),
  breakfast: yup.boolean(),
  parking: yup.boolean(),
  featured: yup.boolean(),
});

export function AccomodationForm() {
  const [error, setError] = useState(null);
  const [Authorzation, setAuthorization] = useContext(AuthContext);
  const [hidden, sethidden] = useState(true);
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
    setSubmitting(true);
    const url = BASE_URL + ACCOMODATION_PATH;
    const formData = new FormData();

    const nonFileData = {
      title: data.title,
      price: data.price,
      description: data.description,
      resturant: data.resturant,
      breakfast: data.breakfast,
      wifi: data.wifi,
      parking: data.parking,
      featured: data.featured,
      imagealt1: data.imagealt1,
      imagealt2: data.imagealt2,
    };

    formData.append(`data`, JSON.stringify(nonFileData));
    formData.append("files.images", data.image2[0], data.image2[0].name);
    formData.append("files.images", data.image1[0], data.image1[0].name);

    try {
      const options = {
        headers: {
          Authorization: `Bearer ${Authorzation.jwt}`,
        },
      };

      const response = await axios.post(url, formData, options);

      if (response.status === 200) {
        setSubmitting(false);
        sethidden(false);
        setTimeout(() => {
          reset();
          sethidden(true);
        }, 3000);
      }
    } catch (error) {
      setSubmitting(false);
      setError("an error Occoured please try to refresh the page");
    }
  }

  return (
    <>
      <form className="accomodationForm" onSubmit={handleSubmit(onSubmit)}>
        <Error errorType="form__warning">{error}</Error>
        <div className="accomodationForm__container">
          <div className="accomodationForm__layout">
            <FormGroupInput
              error={errors.title && errors.title.message}
              id="title"
              form="accomodationForm"
              register={register}
              label="Accomodation Title"
            />

            <FormGroupTextarea
              id="description"
              label="Accomodation Description"
              form="accomodationForm"
              register={register}
              error={errors.description && errors.description.message}
            />

            <FormGroupInput
              error={errors.price && errors.price.message}
              id="price"
              form="accomodationForm"
              register={register}
              label="Starting Price"
            />

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
              <input type="file" className="accomodationForm__fileInput" {...register("image1")} id="image1" />
              <Error errorType="form__warning">{errors.image1 && errors.image1.message}</Error>
            </div>

            <FormGroupInput
              label="Accomodation image description"
              id="imagealt1"
              error={errors.imagealt1 && errors.imagealt1.message}
              register={register}
              form="accomodationForm"
            />
            <div className="accomodationForm__group">
              <label htmlFor="image2"> Room Image </label>
              <input type="file" className="accomodationForm__fileInput" {...register("image2")} id="image2" />
              <Error errorType="form__warning">{errors.image2 && errors.image2.message}</Error>
            </div>

            <FormGroupInput
              label="Room image description"
              id="imagealt2"
              error={errors.imagealt2 && errors.imagealt2.message}
              register={register}
              form="accomodationForm"
            />
          </div>
        </div>
        <button type="submit" className="accomodationForm__submitBtn">
          {submitting ? "Creating Accomodation.." : "Create Accomodation"}
        </button>
      </form>
      <FormSuccess messageType={hidden ? "accomodationForm__success--hidden" : "accomodationForm__success"}>
        New accomodation created successfully
      </FormSuccess>
    </>
  );
}
