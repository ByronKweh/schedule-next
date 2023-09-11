import React, { useState } from "react";
import { EventData } from "@/app/page";
import axios from "axios";

interface CreateEventDTO {
  title: string;
  description: string;
  startDate: string; //TODO should be datetime
  endDate: string;
}

export const CreateEventModal: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const [eventData, setEventData] = useState<CreateEventDTO>({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const handleCreateEvent = () => {
    // Implement the logic to create a new event using eventData
    // For example, you can make an API call to create the event
    // Once the event is created, you can call onCreateEvent to pass it to the parent component

    axios
      .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/schedule`, eventData)
      .then((response) => {
        // Handle the response here, e.g., notify the user or update the UI
        alert("Event created:" + response.data);
        // You can also call onClose to close the modal after a successful creation
        onClose();
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message to the user
        alert("Error creating event:" + error);

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
        border: "1px solid black",
      }}
    >
      <div className="modal-content">
        <h2 style={{ color: "black", marginBottom: "16px" }}>Create Event</h2>
        <div className="input-container">
          <label
            htmlFor="title"
            style={{ color: "black", marginBottom: "8px" }}
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={eventData.title}
            onChange={(e) =>
              setEventData({ ...eventData, title: e.target.value })
            }
            style={{ border: "1px solid black", padding: "8px" }}
          />
        </div>

        <div className="input-container">
          <label
            htmlFor="description"
            style={{ color: "black", marginBottom: "8px" }}
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            value={eventData.description}
            onChange={(e) =>
              setEventData({ ...eventData, description: e.target.value })
            }
            style={{ border: "1px solid black", padding: "8px" }}
          />
        </div>

        <div className="input-container">
          <label
            htmlFor="startDateTime"
            style={{ color: "black", marginBottom: "8px" }}
          >
            Start DateTime
          </label>
          <input
            type="datetime-local"
            id="startDateTime"
            value={eventData.startDate}
            onChange={(e) =>
              setEventData({ ...eventData, startDate: e.target.value })
            }
            style={{ border: "1px solid black", padding: "8px" }}
          />
        </div>

        <div className="input-container">
          <label
            htmlFor="endDateTime"
            style={{ color: "black", marginBottom: "8px" }}
          >
            End DateTime
          </label>
          <input
            type="datetime-local"
            id="endDateTime"
            value={eventData.endDate}
            onChange={(e) =>
              setEventData({ ...eventData, endDate: e.target.value })
            }
            style={{ border: "1px solid black", padding: "8px" }}
          />
        </div>

        <div className="button-container" style={{ marginTop: "16px" }}>
          <button
            onClick={handleCreateEvent}
            style={{
              backgroundColor: "blue",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
              marginRight: "8px",
            }}
          >
            Create
          </button>
          <button
            onClick={() => onClose()}
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
        </div>
      </div>
    </div>
  );
};
