import { useNavigate, useParams } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
import ProfileNotification from "./ProfileNotification";
import ProfileMentoring from "./ProfileMentoring";
import ProfileCommunityEdit from "./ProfileCommunityEdit";
import ProfileSettings from "./ProfileSettings";
import ProfileHelp from "./ProfileHelp";
import { useEffect } from "react";

const ProfileRight = () => {
  const { section } = useParams("profile-info");
  const navigate = useNavigate();
  useEffect(() => {
    if (!section) {
      navigate("/profile/profile-info");
    }
  }, [section, navigate]);
  return (
    <>
        <div className="col-md-9 col-sm-12 col-12">
         <div className="profile-right">
           {section === "profile-info" && <ProfileInfo />}
           {section === "profile-notification" && <ProfileNotification />}
           {section === "profile-mentoring" && <ProfileMentoring />}
           {section === "profile-community-edit" && <ProfileCommunityEdit />}
           {section === "profile-settings" && <ProfileSettings />}
           {section === "profile-help" && <ProfileHelp />}
         </div>
        </div>
    </>
  );
};

export default ProfileRight;
