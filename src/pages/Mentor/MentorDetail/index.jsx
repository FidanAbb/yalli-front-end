import Header from "../../../components/Layout/Header/Header";
import Footer from "../../../components/Layout/Footer/Footer";
import UpperIcon from "../../../components/icon/UpperIcon";
import "./mentor.css";
import StarIcon from "../../../components/icon/StarIcon";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { MdArrowOutward } from "react-icons/md";
import { RiStarHalfSFill, RiStarLine, RiStarSFill } from "react-icons/ri";
const mentorCategory = [
  { id: "LIFE", label: "Yaşam" },
  { id: "EDUCATION", label: "Təhsil" },
  { id: "CAREER", label: "Karyera" },
];
export default function MentorDetail() {
  const location = useLocation();
  const mentorID = useParams();
  const [mentorInfoById, setMentorInfoById] = useState("");
  const [mentorCategoryState, setMentorCategoryState] = useState("");
  console.log(mentorInfoById);
  console.log();

  const getMentorInfoByIdFunc = async () => {
    try {
      const response = await axios.get(
        `https://yalli-back-end.onrender.com/v1/mentors/${mentorID.id}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      setMentorInfoById(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMentorInfoByIdFunc();
  }, []);
  useEffect(() => {
    if (mentorInfoById.mentorCategory) {
      const matchedCategory = mentorCategory.find(
        (item) => item.id === mentorInfoById.mentorCategory
      );
      if (matchedCategory) {
        setMentorCategoryState(matchedCategory.label);
      }
    }
  }, [mentorInfoById]);

  const rating = mentorInfoById.averageRating || 0;

  const starRating = useMemo(
    () =>
      Array(5)
        .fill(0)
        .map((_, index) => (
          <span key={index}>
            {index + 1 <= rating ? (
              <img
                className="big-star-img"
                src="../../../../src/pages/Mentor/MentorDetail/image/Star-fill.png"
              />
            ) : index + 0.5 === rating ? (
              <img
                className="big-star-img falf"
                src="../../../../src/pages/Mentor/MentorDetail/image/Star-half.png"
              />
            ) : (
              <img
                className="big-star-img"
                src="../../../../src/pages/Mentor/MentorDetail/image/Star-line.png"
              />
            )}
          </span>
        )),
    [rating]
  );
  return (
    <>
      <Header />
      <div className="mentor-detail">
        <div className="container">
          <div className="detail-con">
            <div className="detail-head">
              <div className="row">
                <div className="col-md-4 col-sm-12 col-12">
                  <div className="left">
                    <div className="img-block">
                      <img
                        src={`https://minio-server-4oyt.onrender.com/yalli/${mentorInfoById.profilePicture}`}
                        alt=""
                      />
                    </div>
                    <div className="text-center">
                      <h4>{mentorInfoById.fullName}</h4>
                      <p>{mentorInfoById.country}</p>
                      <p>{mentorCategoryState}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-8 col-sm-12 col-12">
                  <div className="right">
                    <p>{mentorInfoById.description}</p>
                    <div className="contact-btn ">
                      <a href={mentorInfoById.link} target="_blank">
                        Əlaqəyə keç <MdArrowOutward className="icon" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="detail-body">
              <div>
                <div className="top">
                  <div className="top-con">
                    <div className="left">
                      <div>{starRating}</div>
                      <div>
                        <p>{`${
                          Number.isInteger(rating) ? `${rating}.0` : rating
                        }`}</p>
                      </div>
                      <div className="cricle"></div>
                      <div>
                        {mentorInfoById?.comments?.length}{" "}
                        <span>dəyərləndirmə</span>
                      </div>
                      <div className="cricle"></div>
                      <div>
                        {mentorInfoById?.comments?.length} <span>rəy</span>
                      </div>
                    </div>
                    <div className="right">
                      <p>Rəy bildir</p>
                    </div>
                  </div>
                </div>
                <div className="bottom">
                  {mentorInfoById?.comments?.length <= 0 ? (
                    <div>Rəy yoxdur</div>
                  ) : (
                    <div className="comments">
                        <h4>Bütün dəyərləndirmələr</h4>
                        <div>
                            <div>
                                <div>

                                </div>
                            </div>
                        </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
