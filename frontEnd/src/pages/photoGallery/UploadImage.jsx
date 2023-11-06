import { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaFileImage } from "react-icons/fa6";
import { uploadFiles } from "../../redux/uploadFile";
import {
  updateProgress,
  uploadFailure,
  uploadSuccess,
} from "../../redux/gallerySlice";

const UploadImage = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { error, progress } = useSelector((state) => state.gallery);
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const images = e.target.files;
    const selected = Array.from(images);
    setFiles(selected);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const images = e.dataTransfer.files;
    const selected = Array.from(images);
    setFiles(selected);
  };

  const resetUploadState = useCallback(() => {
    dispatch(updateProgress(0));
    dispatch(uploadFailure(null));
    dispatch(uploadSuccess([]));
  }, [dispatch]);

  useEffect(() => {
    if (files.length > 0) {
      resetUploadState();
      dispatch(uploadFiles(files));
    }
  }, [files, resetUploadState, dispatch]);

  useEffect(() => {
    if (error) {
      setMessage({ text: error, isError: true });
      const timeout = setTimeout(() => {
        setMessage(null);
        resetUploadState();
      }, 10000);
      return () => clearTimeout(timeout);
    }
  }, [error, progress, dispatch, resetUploadState]);

  return (
    <>
      {message && (
        <div className="alert alert-warning">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.70-1.333.192 3 1.732 3z"
            />
          </svg>
          <span>{message.text}!</span>
        </div>
      )}
      <div
        className="flex place-items-center justify-center"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <label className="block relative cursor-pointer">
          <span className="sr-only">Add Image</span>
          <input
            name="imageupload"
            type="file"
            onChange={handleChange}
            ref={inputRef}
            multiple
            className="opacity-0 w-0 h-0 absolute"
          />
          <div className="flex flex-col items-center file:py-2 file:px-4 file:rounded-full file:text-sm file:text-violet-700 hover:file:bg-violet-100">
            <span className="text-slate-500">Drag and Drop</span>
            <span className="text-slate-500">Or</span>
            <FaFileImage className="text-4xl text-red-400" />
            <span className="text-slate-500">Select Image</span>
          </div>
        </label>
      </div>
    </>
  );
};

export default UploadImage;
