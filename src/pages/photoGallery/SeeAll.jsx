import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { deletedSuccess } from "../../redux/gallerySlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

const SeeAll = () => {
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(
          `https://server-7v1c.onrender.com/api/gallery/get/${id}`
        );
        setImages(data.data.imageUrls);
        setError("");
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [error, id]);

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
      {error && (
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
      )}
      <div>
        <div className="max-w-6xl mx-auto p-4 flex flex-col">
          {showDeleteButton && (
            <span className="font-semibold">
              <input className="h-4 w-4" type="checkbox" checked={true} />{" "}
              {selectedImages.length}{" "}
              {selectedImages.length === 1 ? "image" : "images"} selected
            </span>
          )}
          <h5 className="text-xl text-center font-bold leading-normal text-neutral-800 dark:text-neutral-200">
            Photo Gallery!
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
          <div className="max-w-6xl mx-auto p-4 sm:p-8 md:p-10">
            <div className="overflow-x-auto">
              <Droppable droppableId="image-list" direction="horizontal">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="grid gap-4"
                    style={{
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(8.5rem, 1fr))",
                    }}
                  >
                    {images.map((url, index) => (
                      <Draggable
                        key={index}
                        draggableId={`image-${index}`}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="card card-compact bg-base-100 shadow-sm"
                            style={{
                              backgroundColor: snapshot.isDragging
                                ? "lightsalmon"
                                : "lightcyan",
                              ...provided.draggableProps.style,
                              gridColumn: index === 0 ? "span 2" : "span 1",
                              gridRow: index === 0 ? "span 2" : "span 1",
                            }}
                          >
                            <div className="check-custom relative">
                              <input
                                className={`check-input h-8 w-8 absolute opacity-${
                                  selectedImages.includes(index) ? 1 : 0
                                }`}
                                type="checkbox"
                                checked={selectedImages.includes(index)}
                                onChange={() => handleImageSelect(index)}
                              />
                              <div
                                {...provided.dragHandleProps}
                                className="cursor-grab img-wrap relative"
                              >
                                <img src={url} alt={`Image ${index}`} />
                                <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300" />
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default SeeAll;
