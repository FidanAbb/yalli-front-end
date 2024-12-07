import React, { useContext, useEffect, useState } from "react";
import { YalliContext } from "../../../Context/YalliContext";
import Card from "../../../components/ui/card/Card";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GroupEditModal from "../../../components/GroupEditModal/GroupEditModal";



const ProfileCommunityEdit = () => {
  const { groupsByUserID, setGroupsByUserID, userID,setHideGroupEdit,hideGroupEdit ,groupEditModal} =
    useContext(YalliContext);
  const [isSelectGroup, setIsSelectGroup] = useState(false);
  const [selectedGroupsID, setSelectedGroupsID] = useState([]);
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    if (hideGroupEdit) {
      setHideGroupEdit(true);
    } else {
      setHideGroupEdit(false);
    }
  }, [location.pathname, hideGroupEdit]);

  const deleteGroup = () => {
    if (selectedGroupsID?.length > 0) {
      const url = `https://yalli-back-end.onrender.com/v1/groups/users/${userID}`;
      const params = {
        groupIds: selectedGroupsID.join(","),
      };

      axios
        .delete(url, { params })
        .then((response) => {
          console.log("Qrup(lar) silindi", response.data);
          // Silinmiş qrupları `groupsByUserID`-dən çıxarmaq
          const updatedGroups = groupsByUserID.filter(
            (group) => !selectedGroupsID.includes(group.id)
          );
          setGroupsByUserID(updatedGroups);

          // Toast mesajı göstərmək
          toast.success("Seçilmiş qruplar uğurla silindi!", {
          });

          // Seçilmiş ID-ləri təmizləmək
          setSelectedGroupsID([]);
        })
        .catch((error) => {
          console.error("Qrup silinərkən xəta baş verdi", error);
          toast.error("Qrup silinərkən xəta baş verdi!", {
          });
        });
    } else {
      console.log("Nəsə seçin");
      toast.warn("Zəhmət olmasa silmək üçün qrup seçin!", {
      });
    }
  };

  return (
    <div id="profile-community-section" className="group-edit-con">
      {groupsByUserID?.length > 0 && (
        <div className="btns">
          {isSelectGroup && (
            <button
              onClick={() => deleteGroup()}
              className={selectedGroupsID.length > 0 ? "active" : ""}
            >
              Seçilənləri sil
            </button>
          )}


          <button onClick={() => setIsSelectGroup((prev) => !prev)}>
            {isSelectGroup ? "Ləğv Et" : "Seç"}
          </button>
        </div>
      )}
      <div className="row group-edit">
        {groupsByUserID.length>0 ?Array.isArray(groupsByUserID) &&
          groupsByUserID.map((group, i) => (
            <div key={i} className="col-md-4 col-sm-12 col-12">
              <Card
                sectionName="group"
                group={group}
                isSelectGroup={isSelectGroup}
                setIsSelectGroup={setIsSelectGroup}
                setSelectedGroupsID={setSelectedGroupsID}
                selectedGroupsID={selectedGroupsID}
              />
            </div>
          ))
          :<p>Icma yoxdu</p>
        }
      </div>
      {groupEditModal &&<GroupEditModal/>}
    </div>
  );
};

export default ProfileCommunityEdit;
