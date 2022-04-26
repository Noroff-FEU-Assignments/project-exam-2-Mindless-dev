import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  title: yup.string().required("Please input Accomodation Title"),
  description: yup.string().required("please enter a meessage").min(20, "the message must be over 20 characters"),
  price: yup.number().required("please enter a Price").min(20, "the message must be over 20 characters"),
});
export function AccomodationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="title">Accomodation title</label>
      <input {...register("title")} id="title" />
      {errors.title && <p className="form__error">{errors.title.message}</p>}
      <label htmlFor="description">Description</label>
      <textarea {...register("description")} id="description" />
      {errors.description && <p className="form__error">{errors.description.message}</p>}
      <label htmlFor="startingPrice">Starting Price</label>
      <input {...register("price")} id="price" />
      {errors.price && <p className="form__error">{errors.price.message}</p>}

      <div>
        <h3>Ammeneties</h3>
        <label htmlFor="resturant">Resturant</label>
        <input type="checkbox" id="resturant" />
        <label htmlFor="breakfast">Breakfast</label>
        <input type="checkbox" id="breakfast" />
        <label htmlFor="wifi">wifi</label>
        <input type="checkbox" id="wifi" />
        <label htmlFor="parking">Resturant</label>
        <input type="checkbox" id="parking" />
      </div>
      <label htmlFor="">Main Image</label>
      <input />
      <button>Send Message</button>
    </form>
  );
}
