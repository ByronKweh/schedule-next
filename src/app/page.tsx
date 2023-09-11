"use client";
import { useApi } from "@/hooks/api/useApi";
import axios from "axios";
import Image from "next/image";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import { EventModal } from "@/components/editModal";
import { CreateEventModal } from "@/components/createScheduleModal";
import { searchBlogs } from "@/hooks/api/searchBlog";

const localizer = momentLocalizer(moment);

export interface EventData {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  __v: number;
}

export interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  __v: number;
}

export default function Home() {
  const { data, isLoading, error, refetch } = useApi("schedule");
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [editedEvent, setEditedEvent] = useState<EventData | null>(null);
  const [createEvent, setCreateEvent] = useState<boolean>(false);
  const [blogs, setBlogs] = useState<[] | Blog[]>([]);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  const handleEventClick = (event: EventData) => {
    setSelectedEvent(event);
    setEditedEvent(event);
    setCreateEvent(false);
  };

  const handleClose = () => {
    setSelectedEvent(null);
    setCreateEvent(false);
    refetch(); // Refresh the API data
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    //TODO return error page
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="https://uploads-ssl.webflow.com/6392e202b84b240a78da9c03/6392f24f79479953d2d0346e_Logo.png"
          alt="Next.js Logo"
          width={300}
          height={37}
          priority
        />
      </div>
      <div>
        <h1>Blog Search</h1>{" "}
        <input
          type="text"
          style={{ backgroundColor: "white", color: "black" }} // Set background to white and text color to black
          onChange={(e) => {
            // Abort the previous API request if it exists
            if (abortController) {
              abortController.abort();
            }

            // Create a new abort controller for the current request
            const newAbortController = new AbortController();
            setAbortController(newAbortController);

            // Perform the API call with the new abort controller
            searchBlogs(e.target.value, newAbortController.signal, setBlogs);
          }}
        />
      </div>
      <div>
        <div>
          {blogs.length ? (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Content</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog._id}>
                    <td>{blog.title}</td>
                    <td>{blog.author}</td>
                    <td>{blog.content}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No blogs found.</p>
          )}
        </div>
      </div>
      <div>
        <h1>Calendar</h1>{" "}
        <button
          onClick={() => {
            setSelectedEvent(null);
            setCreateEvent(true);
          }}
          style={{
            backgroundColor: "green",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
          }}
        >
          Create Event
        </button>
        <Calendar
          localizer={localizer}
          //TODO fix this
          //@ts-ignore
          events={data}
          startAccessor="startDate"
          endAccessor="endDate"
          titleAccessor="title"
          style={{ height: "500px" }}
          onSelectEvent={handleEventClick}
        />
      </div>

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={handleClose}
          editedEvent={editedEvent}
          setEditedEvent={setSelectedEvent}
        />
      )}
      {createEvent && <CreateEventModal onClose={handleClose} />}
    </main>
  );
}
