import React from 'react';
import MentorsCard from "../../ui/MentorsCard/MentorsCard";

const Mentors = ({ mentorsData= [] }) => {
    return (
        <>
            {mentorsData.map((mentor, i) => (
                <MentorsCard key={i} data={mentor} />
            ))}
        </>
    );
};

export default Mentors;