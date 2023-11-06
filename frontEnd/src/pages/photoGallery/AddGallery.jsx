import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from "tw-elements-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletedSuccess } from "../../redux/gallerySlice";
import UploadImage from "./UploadImage";
import PostGallery from "./PostGallery";

const AddGallery = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { urls, progress } = useSelector((state) => state.gallery);
  const [images, setImages] = useState(urls);
  const [selectedImages, setSelectedImages] = useState([]);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [localProgress, setLocalProgress] = useState(0);

  useEffect(() => {
    setLocalProgress(progress);
    setImages(urls);
  }, [urls, progress]);

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
      {/* <!-- Button trigger modal --> */}
      <TERipple rippleColor="white">
        <button
          type="button"
          className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          onClick={() => setShowModal(true)}
        >
          Launch static backdrop modal
        </button>
      </TERipple>

      {/* <!-- Modal --> */}
      <TEModal show={showModal} setShow={setShowModal} scrollable>
        <TEModalDialog size="fullscreen">
          <TEModalContent>
            <TEModalHeader>
              {/* <!-- Modal title --> */}
              {showDeleteButton && (
                <span className="font-semibold">
                  <input className=" h-4 w-4" type="checkbox" checked={true} />{" "}
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
            </TEModalHeader>
            {/* <!--Modal body--> */}
            <TEModalBody>
              <DragDropContext onDragEnd={onDragEnd}>
                <div className="mx-auto my-auto">
                  {progress && (
                    <progress
                      className="progress progress-success w-full"
                      value={localProgress}
                      max="100"
                    ></progress>
                  )}

                  {/* Add a container for the Droppable */}
                  <div>
                    <div className="overflow-x-auto">
                      <Droppable
                        droppableId="image-list"
                        direction="horizontal"
                      >
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
                                      gridColumn:
                                        index === 0 ? "span 2" : "span 1",
                                      gridRow:
                                        index === 0 ? "span 2" : "span 1",
                                    }}
                                  >
                                    <div className="check-custom relative">
                                      <input
                                        className={`check-input h-8 w-8 absolute opacity-${
                                          selectedImages.includes(index) ? 1 : 0
                                        }`}
                                        type="checkbox"
                                        checked={selectedImages.includes(index)}
                                        onChange={() =>
                                          handleImageSelect(index)
                                        }
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
                            <div className="border border-dashed border-black">
                              <UploadImage />
                            </div>
                          </div>
                        )}
                      </Droppable>
                    </div>
                  </div>
                </div>
              </DragDropContext>
            </TEModalBody>
            <TEModalFooter>
              <TERipple rippleColor="light">
                <button
                  type="button"
                  className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </TERipple>
              <TERipple rippleColor="light">
                <PostGallery />
              </TERipple>
            </TEModalFooter>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </div>
  );
};

export default AddGallery;
