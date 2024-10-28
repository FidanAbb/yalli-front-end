import { RiFacebookCircleLine } from "react-icons/ri";
import UserImg from "../../../../src/pages/Profile/assets/img/user-img.svg";
import { BiLogoTelegram } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { CiCircleInfo } from "react-icons/ci";

const ProfileMentoring = () => {
  
  return (
    <>
      <div className="profile-mentor ">
        <div className="mentor-top">
          <div className="row h-100">
            <div className="col-md-2 col-sm-6 col-12 h-100">
              <div className="left">
                <div className="img-block ">
                  <img src={UserImg} alt="" />
                </div>
                <p>Lalə Əzimli</p>
                <span>Toronto, Kanada</span>
                <div>
                  <ul className="dp-bettween">
                    <li>
                      <RiFacebookCircleLine className="icon" />
                    </li>
                    <li>
                      <div className="teleqram-icon dp-center">
                        <BiLogoTelegram className="icon" />
                      </div>
                    </li>
                    <li>
                      <FaWhatsapp className="icon what-icon" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-5 col-sm-6 col-12 ">
              <div className="middle">
                <div className="top dp-bettween">
                  <p>Kateqoriya</p>
                  <IoIosArrowDown />
                </div>
                <div className="bottom ">
                  <p>Haqqında (minimum 300 simvol)</p>
                  <CiCircleInfo />
                </div>
              </div>
            </div>
            <div className="col-md-5 col-sm-12 col-12 h-100">
              <div className="right h-100">
                <div className="top dp-bettween">
                  <p>Kateqoriya</p>
                  <IoIosArrowDown />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mentor-bottom dp-center h-100 w-100">
          <div className="w-50 text-center dp-cloumn gap-5">
            <button className="apply-btn">Müraciət et</button>
            <p>
              Mentor olmaq üçün bütün məlumatlarını düzgün qeyd etdiyindən əmin
              ol. Hər hansı çətinlik yaşadınsa,<span>contact@yalli.org</span> ilə əlaqə
              saxla.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileMentoring;
