import React from "react";
import EventItem from "../components/EventItem";
import "./Events.css";

function Events() {
  const eventData = [
    {
      id: 1,
      date: "TBA --",
      title: "Gear Up 2026",
      location: "Online Mode",
      description: "Exclusive online sessions for the Domain Members.",
      fullDetails:
          "Mode: Online | Eligibility: Domain Members Only | Platform: Google Meet | Certificate Provided\n"+
          "Session 1.: Virtual Machine (VM) by Assir Thota (TY ECE)\n" +
          "Session 2.: Fundamentals of Linux Operating by Anirban Das (TY ECE)\n" +
          "Session 3.: Robotics Operating System (ROS) by Assir Thota (TY ECE)\n"
    },
    {
      id: 2,
      date: "NOV 15",
      title: "KickOff-2025 / RoboSoccer 1st Edition",
      location: "Rajabaug",
      description:
          "A special lecture on the future of AI and its role in robotics competitions.",
      fullDetails:
          "Speaker: Dr. Eva Rostova | Time: 11:00 AM | Includes live demo & Q&A session"
    },
    {
      id: 3,
      date: "OCT 31",
      title: "Robotics & E.D. Domain Intro Workshop",
      location: "Manthan",
      description:
          "We are recruiting programmers, engineers, and strategists for RoboSoccer 2026.",
      fullDetails:
          "Recruitment Drive | Open for FY & SY students | Bring your laptops | No prior experience required"
    },
    {
      id: 4,
      date: "SEP 06",
      title: "CAD Workshop",
      location: "MPH-214",
      description:
          "Beginner-friendly workshop covering CAD fundamentals for robotics.",
      fullDetails:
          "Software: Fusion 360 | Duration: 3 Hours | Certificate + Resources Provided"
    }
  ];

  return (
      <div className="events-page">
        <h1 className="page-header">Events</h1>
        <p className="page-subtitle">
          Check out our calendar for workshops, competitions, and meetups.
        </p>

        <div className="event-list">
          {eventData.map(event => (
              <EventItem
                  key={event.id}
                  date={event.date}
                  title={event.title}
                  location={event.location}
                  description={event.description}
                  fullDetails={event.fullDetails}
              />
          ))}
        </div>
      </div>
  );
}

export default Events;
