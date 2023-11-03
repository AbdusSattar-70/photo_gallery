import { useState, useEffect } from "react";
import { v4 as id } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { deletedSuccess } from "../../redux/gallerySlice";
import UploadImage from "./UploadImage";

const DragAbleModal = () => {
  const dispatch = useDispatch();
  const { urls } = useSelector((state) => state.gallery);
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  useEffect(() => {
    setImages(urls);
  }, [urls]);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("imageIndex", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    const sourceIndex = e.dataTransfer.getData("imageIndex");
    const updatedImages = [...images];
    const [draggedImage] = updatedImages.splice(sourceIndex, 1);
    updatedImages.splice(targetIndex, 0, draggedImage);
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
      <div className="flex items-center justify-between mb-4">
        {showDeleteButton && (
          <div className="flex w-full justify-around">
            <span className="font-semibold">
              {selectedImages.length}{" "}
              {selectedImages.length === 1 ? "image" : "images"} selected
            </span>
            <button
              onClick={handleDeleteSelectedImages}
              className="text-red-500"
            >
              Delete Selected
            </button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {images &&
          images.map((url, index) => (
            <div
              key={id()}
              className={` shadow-xl  ${
                index === 0 ? "col-span-2 row-span-2" : ""
              }`}
              onDragOver={(e) => handleDragOver(e)}
              onDrop={(e) => handleDrop(e, index)}
            >
              <input
                type="checkbox"
                checked={selectedImages.includes(index)}
                onChange={() => handleImageSelect(index)}
              />
              <figure
                draggable="true"
                onDragStart={(e) => handleDragStart(e, index)}
                className="cursor-move"
              >
                <img src={url} alt={`Image ${index}`} />
              </figure>
            </div>
          ))}
        <div
          className={`card card-compact bg-base-100 shadow-xl  justify-center`}
        >
          <UploadImage />
        </div>
      </div>
      {urls && (
        <button type="submit" className="btn btn-outline">
          Add Gallery
          {/* {loading ? "loading" : "Add Gallery"} */}
        </button>
      )}
    </div>
  );
};

export default DragAbleModal;
