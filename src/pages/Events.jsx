import React from 'react';
import EventItem from '../components/EventItem'; // Import the new component
import "./Events.css"

function Events() {

  // A list of sample events
  const eventData = [
    {
      id: 1,
      date: 'SEP 06',
      title: 'CAD Workshop',
      location: 'MPH-214',
      description: 'Join us for a beginner-friendly workshop covering the basics of robotics, from simple circuits to programming a microcontroller.'
    },
    {
      id: 2,
      date: 'OCT 31',
      title: 'Robotics & E.D. Domain Intro Workshop',
      location: 'Manthan',
      description: 'Show us your skills! We are recruiting programmers, engineers, and strategists for the 2026 RoboSoccer competition team.'
    },
    {
      id: 3,
      date: 'NOV 15',
      title: 'KickOff-2025 / RoboSoccer 1st Edition',
      location: 'Rajabaug',
      description: 'A special lecture from Dr. Eva Rostova on the future of AI and its role in modern industrial automation.'
    }
  ];

  return (
    <div>
      <h1 className="page-header">Events</h1>
      <p style={{marginBottom: '2rem'}}>Check out our calendar for workshops, competitions, and meetups.</p>

      <div className="event-list">
        {eventData.map(event => (
          <EventItem
            key={event.id}
            date={event.date}
            title={event.title}
            location={event.location}
            description={event.description}
          />
        ))}
      </div>
    </div>
  );
}

export default Events;