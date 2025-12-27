import React from 'react';

// Props: date (string like "SEP 06"), title, location, description
function EventItem({ date, title, location, description }) {
    // Split date safely (e.g., "SEP 06")
    const [month, day] = date.split(" ");

    return (
        <div className="event-card">
            {/* DATE STRIP */}
            <div className="event-date">
                <span className="event-month">{month}</span>
                <span className="event-day">{day}</span>
            </div>

            {/* EVENT CONTENT */}
            <div className="event-content">
                <h3 className="event-title">{title}</h3>
                <div className="event-venue">{location}</div>

                <p className="event-description">{description}</p>

                {/* CTA */}
                <div className="event-actions">
                    <button>View Details</button>
                </div>
            </div>
        </div>
    );
}

export default EventItem;
