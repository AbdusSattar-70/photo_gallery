import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { deletedSuccess } from "../../../redux/gallerySlice";
import GalleryContainer from "./GalleryContainer";

const Home = () => {
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/gallery/getAll");
        const data = await res.json();
        setImages(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
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

  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 max-w-6xl mx-auto p-4 sm:p-8 md:p-10">
        <h1 className="text-slate-700 font-bold text-3xl sm:text-6xl">
          Find your next <span className="text-slate-500">perfect</span>
          <br />
          place with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          Sahand Estate is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
      </div>

      <div>
        {showDeleteButton && (
          <span className="font-semibold">
            <input className="h-4 w-4" type="checkbox" checked={true} />{" "}
            {selectedImages.length}{" "}
            {selectedImages.length === 1 ? "image" : "images"} selected
          </span>
        )}
        <h5 className="text-xl text-center font-bold leading-normal text-neutral-800 dark:text-neutral-200">
          Create Your Photo Gallery!
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

        <DragDropContext onDragEnd={onDragEnd}>
          <GalleryContainer
            images={images}
            selectedImages={selectedImages}
            handleImageSelect={handleImageSelect}
          />
        </DragDropContext>
      </div>
    </div>
  );
};

export default Home;
