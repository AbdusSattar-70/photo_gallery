import { useSelector } from "react-redux";
const PostGallery = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const { urls } = useSelector((state) => state.gallery);
  const data = {
    imageUrls: urls,
    name: currentUser.data.userName,
    description: "Photo Gallery",
    userRef: currentUser.data._id,
  };

  const postHandleControll = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/gallery/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      await res.json();
    } catch (err) {
      throw new Error("Oops! Something Went Wrong, Try Again Later" || err);
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
