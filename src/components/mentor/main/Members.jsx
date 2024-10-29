// components/Members/Members.jsx
import React, {useEffect, useState} from 'react';
import MembersCard from '../../member/MembersCard';

const Members = ({ membersData= [] }) => {
    const [userData, setUserData] = useState("");
    console.log('members page')
    useEffect(() => {
        const loggedUser = localStorage.getItem("userInfo");

        if (loggedUser) {
            setUserData(JSON.parse(loggedUser));
        }
    }, []);
    return (
        <div className={userData ? '' : 'blur'}>
            {membersData.map((member, i) => (
                <MembersCard key={i} data={member} />
            ))}
            {!userData && <div className="overlay">You need to log in to view members.</div>}
        </div>
    );
};

export default Members;