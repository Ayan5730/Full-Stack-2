import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import "./App.css";

export default function App() {
  const events = [
    {
      id: "1",
      title: "Instagram Post",
      start: "2026-08-10",
    },
    {
      id: "2",
      title: "Facebook Campaign",
      start: "2026-08-12",
    },
    {
      id: "3",
      title: "LinkedIn Article",
      start: "2026-08-15",
    },
  ];

  return (
    <div className="container">
      <h1>Social Media Post Scheduler</h1>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        editable
        selectable
      />
    </div>
  );
}