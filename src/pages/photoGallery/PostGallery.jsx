/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { uploadFiles } from "../../redux/uploadFile";
import { useDispatch } from "react-redux";

const PostGallery = ({ setShowModal, images }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const data = {
    imageUrls: images,
    name: currentUser?.data?.userName || "Anonimous",
    description: "gallery",
    userRef: currentUser?.data?._id,
  };

  const postData = async () => {
    try {
      const res = await fetch(
        "https://server-7v1c.onrender.com/api/gallery/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      return await res.json();
    } catch (err) {
      throw new Error("Oops! Something Went Wrong, Try Again Later" || err);
    }
  };
  const postHandleControll = async () => {
    const result = await postData();
    if (result.code === 200 && images) {
      dispatch(uploadFiles([]));
      await setShowModal(false);
    }
  };

  return (
    <div>
      <button
        type="submit"
        onClick={postHandleControll}
        className="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
      >
        Submit
      </button>
    </div>
  );
};

export default PostGallery;
