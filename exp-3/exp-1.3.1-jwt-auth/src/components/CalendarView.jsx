export default function CalendarView() {
  const events = [
    { date: '2026-08-18', title: 'Sprint Review & JWT Authentication Lab', time: '10:00 AM' },
    { date: '2026-08-20', title: 'Security Audit & Token Expiry Test', time: '02:30 PM' },
    { date: '2026-08-25', title: 'Full Stack Deployment Release', time: '11:00 AM' }
  ];

  return (
    <div className="calendar-container">
      <h1 className="content-title">Calendar</h1>
      <div className="card calendar-card">
        <h3>Scheduled Events & Security Audits</h3>
        <div className="event-list">
          {events.map((evt, idx) => (
            <div key={idx} className="event-item">
              <div className="event-date">{evt.date}</div>
              <div className="event-details">
                <h4>{evt.title}</h4>
                <p>{evt.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
