import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FaFileImage } from "react-icons/fa6";
import { useRef } from "react";
import useFirebaseStorage from "./useFirebaseStorage";
import { uploadSuccess } from "../../redux/gallerySlice";

const UploadImage = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const { uploadFile, urls, error: uploadErr } = useFirebaseStorage(files);

  const handleChange = (e) => {
    const images = e.target.files;
    const selected = Array.from(images);
    setFiles(selected);
  };

  useEffect(() => {
    const handleImageUpload = async () => {
      const types = ["image/png", "image/jpg", "image/jpeg", "image/webp"];

      if (files.some((file) => !types.includes(file.type))) {
        setError("Only accept (png, jpeg, webp, jpg)");
        return;
      }

      if (files.length > 10) {
        setError("Please upload between 1 and 10 images per gallery.");
        return;
      }

      try {
        for (const file of files) {
          await uploadFile(file);
        }
        setError("");
      } catch (err) {
        setError(
          err || uploadErr || "An error occurred while uploading the images."
        );
      }
    };
    if (inputRef.current.value) {
      handleImageUpload();
      inputRef.current.value = "";
    }
  }, [files, uploadFile, uploadErr]);

  useEffect(() => {
    if (urls) {
      dispatch(uploadSuccess(urls));
    }
  }, [urls, dispatch]);
  return (
    <>
      <form className="flex items-center ">
        <div className="shrink-0">
          <FaFileImage className=" text-9xl  text-red-400" />
        </div>
        <label className="block">
          <span className="sr-only">Choose gallery photo</span>
          <input
            type="file"
            onChange={handleChange}
            ref={inputRef}
            multiple
            className="cursor-pointer w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
              file:text-sm  file:text-violet-700 hover:file:bg-violet-100"
          />
        </label>
      </form>
      <p className="text-sm text-red-500">{error && <i>{error}</i>}</p>
    </>
  );
};

export default UploadImage;
