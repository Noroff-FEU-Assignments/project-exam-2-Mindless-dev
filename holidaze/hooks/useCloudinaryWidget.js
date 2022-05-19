import react, { useState, useEffect } from "react";

export function useCloudinaryWidget() {
  const [widget, setWidget] = useState();
  const [widget2, setWidget2] = useState();
  const [mainImage, setMainImage] = useState("");
  const [secondImage, setSecondImage] = useState("");

  useEffect(() => {
    setWidget(
      cloudinary.createUploadWidget(
        {
          cloudName: "dmypm1x6b",
          uploadPreset: "fhyuzd37",
        },

        (error, result) => {
          if (!error && result && result.event === "success") {
            setMainImage((prev) => (prev = result.info.secure_url));
          }
        }
      )
    );

    setWidget2(
      cloudinary.createUploadWidget(
        {
          cloudName: "dmypm1x6b",
          uploadPreset: "fhyuzd37",
        },

        (error, result) => {
          if (!error && result && result.event === "success") {
            setSecondImage((prev) => (prev = result.info.secure_url));
          }
        }
      )
    );
  }, []);

  return [widget, widget2, secondImage, setSecondImage, mainImage, setMainImage];
}
