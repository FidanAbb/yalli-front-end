// components/Events/Events.jsx
import React from 'react';
import Card from '../../ui/card/Card';

const Events = ({ eventsData= [] }) => {
    return (
        <>
            {eventsData.map((event, i) => (
                <Card key={i} sectionName="event" event={event} />
            ))}
        </>
    );
};

export default Events;