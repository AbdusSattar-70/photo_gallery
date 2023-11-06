import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { deletedSuccess } from "../../../redux/gallerySlice";
import GalleryContainer from "./GalleryContainer";
import axios from "axios";
import AddGallery from "../../photoGallery/AddGallery";
import { useSelector } from "react-redux";

const Home = () => {
  const { urls } = useSelector((state) => state.gallery);
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [looding, setLoading] = useState(true);
  const [selectedImages, setSelectedImages] = useState([]);
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(
          "https://server-7v1c.onrender.com/api/gallery/getAll"
        );
        setImages(data.data);
        if (data.data) {
          setLoading(false);
        }
        setError("");
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [urls]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const updatedImages = [...images];
    const [draggedImage] = updatedImages.splice(sourceIndex, 1);
    updatedImages.splice(destinationIndex, 0, draggedImage);
    setImages(updatedImages);
  };

  const handleImageSelect = (index) => {
    const selectedImageIndex = selectedImages.indexOf(index);
    if (selectedImageIndex === -1) {
      setSelectedImages([...selectedImages, index]);
    } else {
      const updatedSelectedImages = [...selectedImages];
      updatedSelectedImages.splice(selectedImageIndex, 1);
      setSelectedImages(updatedSelectedImages);
    }
  };

  const handleDeleteSelectedImages = () => {
    const updatedImages = images.filter(
      (_, index) => !selectedImages.includes(index)
    );
    setImages(updatedImages);
    dispatch(deletedSuccess(updatedImages));
    setSelectedImages([]);
  };

  useEffect(() => {
    setShowDeleteButton(selectedImages.length > 0);
  }, [selectedImages]);

  return looding ? (
    <div className="text-center text-6xl text-blue-400 min-h-screen">
      <h1 className="text-slate-700 font-bold text-3xl sm:text-6xl">
        Please Wait for a while{" "}
        <span className="text-slate-500">Data is Loading</span>
        <br />
        Due to Free server service, it will take 2 minutes at first loading!
      </h1>
      <span className="loading loading-bars loading-xs"></span>
      <span className="loading loading-bars loading-sm"></span>
      <span className="loading loading-bars loading-md"></span>
      <span className="loading loading-bars loading-lg"></span>
    </div>
  ) : (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 max-w-6xl mx-auto p-4 sm:p-8 md:p-10">
        <h1 className="text-slate-700 font-bold text-3xl sm:text-6xl">
          Find your next <span className="text-slate-500">perfect</span>
          <br />
          place to store your images!
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          Turn ideas into outstanding designs with high-quality vectors, photos,
          videos, mockups, and more
          <br />
          We have a wide range of properties for you to choose from.
        </div>
      </div>
      {error ? (
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
          <span>{error}!</span>
        </div>
      ) : (
        <div>
          <div className="max-w-6xl mx-auto p-4 flex flex-col space-y-2">
            {showDeleteButton && (
              <span className="font-semibold">
                <input className="h-4 w-4" type="checkbox" checked={true} />{" "}
                {selectedImages.length}{" "}
                {selectedImages.length === 1 ? "image" : "images"} selected
              </span>
            )}
            <h5 className="text-xl text-center font-bold leading-normal text-neutral-800 dark:text-neutral-200">
              {images ? <AddGallery /> : <div>Loading</div>}
            </h5>
            {showDeleteButton && (
              <button
                onClick={handleDeleteSelectedImages}
                type="button"
                className="inline-block rounded bg-red-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-blue-500 focus:outline-none"
              >
                Delete Selected
              </button>
            )}
          </div>

          <DragDropContext onDragEnd={onDragEnd}>
            <GalleryContainer
              images={images}
              selectedImages={selectedImages}
              handleImageSelect={handleImageSelect}
            />
          </DragDropContext>
        </div>
      )}
    </div>
  );
};

export default Home;
