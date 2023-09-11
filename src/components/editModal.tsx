import React, { useState } from "react";
import { EventData } from "@/app/page";
import axios from "axios";

export const EventModal: React.FC<{
  event: EventData;
  onClose: () => void;
  editedEvent: EventData | null;
  setEditedEvent: Function;
}> = ({ event, onClose, editedEvent, setEditedEvent }) => {
  const [formData, setFormData] = useState({
    title: editedEvent?.title || "",
    description: editedEvent?.description || "",
    startDate: editedEvent?.startDate || "",
    endDate: editedEvent?.endDate || "",
  });

  if (!editedEvent) {
    return null; // Return null when not in edit mode
  }
  const isEditable = editedEvent?._id === event._id;

  const onDelete = () => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/schedule/${event._id}`)
      .then((response) => {
        // Handle the response here, e.g., notify the user or update the UI
        alert("Event deleted");

        // You can also call onClose to close the modal after a successful deletion
        onClose();
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message to the user
        alert("Error deleting event: " + error);

        // You may want to handle errors gracefully, depending on your application's requirements
      });
  };

  const handleEditEvent = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/schedule/${event._id}`,
        formData
      )
      .then((response) => {
        // Handle the response here, e.g., notify the user or update the UI
        alert("Event edited:" + response.data);
        // You can also call onClose to close the modal after a successful creation
        onClose();
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message to the user
        alert("Error editing event:" + error);

        // You may want to handle errors gracefully, depending on your application's requirements
      });
  };

  return (
    <div
      className="modal"
      style={{
        position: "absolute",
        backgroundColor: "white",
        padding: "16px",
        borderRadius: "4px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        color: "black",
      }}
    >
      <div className="modal-content">
        <h2 style={{ color: "black", marginBottom: "16px" }}>Edit Event</h2>
        <div className="input-container">
          <label
            htmlFor="title"
            style={{ color: "black", marginBottom: "8px" }}
          >
            Title
          </label>
          {isEditable ? (
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              style={{ border: "1px solid black", padding: "8px" }}
            />
          ) : (
            <h2>{event.title}</h2>
          )}
        </div>

        <div className="input-container">
          <label
            htmlFor="description"
            style={{ color: "black", marginBottom: "8px" }}
          >
            Description
          </label>
          {isEditable ? (
            <input
              type="text"
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              style={{ border: "1px solid black", padding: "8px" }}
            />
          ) : (
            <h2>{event.description}</h2>
          )}
        </div>

        <div className="input-container">
          <label
            htmlFor="startDateTime"
            style={{ color: "black", marginBottom: "8px" }}
          >
            Start DateTime
          </label>
          {isEditable ? (
            <input
              type="datetime-local"
              id="startDateTime"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
              style={{ border: "1px solid black", padding: "8px" }}
            />
          ) : (
            <h2>{event.startDate}</h2>
          )}
        </div>

        <div className="input-container">
          <label
            htmlFor="endDateTime"
            style={{ color: "black", marginBottom: "8px" }}
          >
            End DateTime
          </label>
          {isEditable ? (
            <input
              type="datetime-local"
              id="endDateTime"
              value={formData.endDate}
              onChange={(e) =>
                setFormData({ ...formData, endDate: e.target.value })
              }
              style={{ border: "1px solid black", padding: "8px" }}
            />
          ) : (
            <h2>{event.endDate}</h2>
          )}
        </div>

        <div className="button-container" style={{ marginTop: "16px" }}>
          {isEditable ? (
            <button
              onClick={handleEditEvent}
              style={{
                backgroundColor: "blue",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                marginRight: "8px",
              }}
            >
              Submit
            </button>
          ) : (
            <button
              onClick={() => setEditedEvent(null)}
              style={{
                backgroundColor: "green",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                marginRight: "8px",
              }}
            >
              Edit
            </button>
          )}
          <button
            onClick={onClose}
            style={{
              backgroundColor: "red",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
            }}
          >
            Close
          </button>
          <button
            onClick={onDelete}
            style={{
              backgroundColor: "pink",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
