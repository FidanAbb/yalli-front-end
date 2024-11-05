import React, { useContext, useEffect, useState } from "react";
import { YalliContext } from "../../../Context/YalliContext";
import Card from "../../../components/ui/card/Card";
import { useNavigate } from "react-router-dom";

const ProfileCommunityEdit = () => {
  const { groupsByUserID, userID, findGroupByUserId } = useContext(YalliContext);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const navigate = useNavigate();


  return (
    <div className="row group-edit">
      {Array.isArray(groupsByUserID) && groupsByUserID.map((group, i) => (
        <div key={i} className="col-md-4 col-sm-12 col-12" onClick={() => navigate(`/group-edit/${group.id}/all-info`)}>
          <Card sectionName="group" group={group} />
        </div>
      ))}
      {selectedGroup && <div>Selected Group: {JSON.stringify(selectedGroup)}</div>}
    </div>
  );
};

export default ProfileCommunityEdit;
