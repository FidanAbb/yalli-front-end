import React from 'react';
import Card from "../../ui/card/Card";

const Groups = ({ groupsData=[], handleCardClick }) => {
    console.log(groupsData)
    return (
        <>
            {groupsData.map((group, i) => (
                <div key={i} onClick={() => handleCardClick(group.id)}>
                    <Card sectionName="group" group={group} />
                </div>
            ))}
        </>
    );
};

export default Groups;