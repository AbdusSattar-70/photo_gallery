/* eslint-disable react/prop-types */
import { Droppable, Draggable } from "react-beautiful-dnd";

const GalleryContainer = ({ images, selectedImages, handleImageSelect }) => {
  console.log(images.map((img) => img));
  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8 md:p-10">
      <div className="overflow-x-auto">
        <Droppable droppableId="image-list" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="grid gap-4"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(8.5rem, 1fr))",
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
  );
};

export default GalleryContainer;
