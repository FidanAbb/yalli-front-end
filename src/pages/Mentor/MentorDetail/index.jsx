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
import fillStar from "../../../../src/pages/Mentor/MentorDetail/image/star-fill.png";
import halfStar from "../../../../src/pages/Mentor/MentorDetail/image/star-half.png";
import lineStar from "../../../../src/pages/Mentor/MentorDetail/image/star-line.png";
import CommentWrite from "./components/CommentWrite";
const mentorCategory = [
  { id: "LIFE", label: "Yaşam" },
  { id: "EDUCATION", label: "Təhsil" },
  { id: "CAREER", label: "Karyera" },
];
const countryTranslations = {
  "Almanya": "Almaniya",
  "Azerbaijan": "Azərbaycan",
  "Turkey": "Türkiyə",
  "Russia": "Rusiya",
  "Germany": "Almaniya",
  "United States": "ABŞ",
  "Ukraine": "Ukrayna",
  "United Kingdom": "Böyük Britaniya",
  "Canada": "Kanada",
  "France": "Fransa",
  "Israel": "İsrail",
  "Georgia": "Gürcüstan",
  "Italy": "İtaliya",
  "Australia": "Avstraliya",
  "Spain": "İspaniya",
  "Netherlands": "Niderland",
  "Austria": "Avstriya",
  "Sweden": "İsveç",
  "Belgium": "Belçika",
  "Norway": "Norveç",
  "Finland": "Finlandiya",
  "Hungary": "Macarıstan",
  "Poland": "Polşa",
  "Greece": "Yunanıstan",
  "Slovakia": "Slovakiya",
  "Lithuania": "Litva",
  "Latvia": "Latviya",
  "Estonia": "Estoniya",
  "Kazakhstan": "Qazaxıstan",
  "United Arab Emirates": "Birləşmiş Ərəb Əmirlikləri",
  "Japan": "Yaponiya",
  "Iran": "İran",
  "Saudi Arabia": "Səudiyyə Ərəbistanı",
  "Belarus": "Belarus",
  "Moldova": "Moldova",
  "Kyrgyzstan": "Qırğızıstan",
  "Tajikistan": "Tacikistan",
  "Turkmenistan": "Türkmənistan",
  "Uzbekistan": "Özbəkistan",
  "Malaysia": "Malayziya",
  "Singapore": "Sinqapur",
  "Brazil": "Braziliya",
  "Argentina": "Argentina",
  "Mexico": "Meksika",
  "Vietnam": "Vietnam",
  "Bali (Indonesia)": "Bali (İndoneziya)",
  "Switzerland": "İsveçrə",
  "Portugal": "Portuqaliya",
  "South Korea": "Cənubi Koreya"
};
export default function MentorDetail() {
  const mentorID = useParams();
  const [mentorInfoById, setMentorInfoById] = useState("");
  const [mentorCategoryState, setMentorCategoryState] = useState("");
  const [iscommentWrite, setIscommentWrite] = useState(false);
  console.log();
  
  
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]); 
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
    if (iscommentWrite) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflowY = "auto";
      document.documentElement.style.overflowY = "auto";
    }
  }, [iscommentWrite]);
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
  const handleCommentSubmit = () => {
    getMentorInfoByIdFunc(); // Rəy siyahısını yeniləyir
  };
  const starRating = useMemo(
    () =>
      Array(5)
        .fill(0)
        .map((_, index) => (
          <span key={index}>
            {index + 1 <= rating ? (
              <img className="big-star-img" src={fillStar} />
            ) : index + 0.5 === rating ? (
              <img className="big-star-img half" src={halfStar} />
            ) : (
              <img className="big-star-img" src={lineStar} />
            )}
          </span>
        )),
    [rating]
  );
  const commentStarRating = (rate) => {
    return (
      <div className="comment-rating">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <span key={index}>
              {index + 1 <= rate ? (
                <img
                  className="comment-star-img"
                  src={fillStar}
                  alt="filled star"
                />
              ) : index + 0.5 < rate ? (
                <img
                  className="comment-star-img half"
                  src={halfStar}
                  alt="half star"
                />
              ) : (
                <img
                  className="comment-star-img"
                  src={lineStar}
                  alt="empty star"
                />
              )}
            </span>
          ))}
      </div>
    );
  };
  const formatDate = (dateString) => {
    const months = [
      "Yanvar",
      "Fevral",
      "Mart",
      "Aprel",
      "May",
      "İyun",
      "İyul",
      "Avqust",
      "Sentyabr",
      "Oktyabr",
      "Noyabr",
      "Dekabr",
    ];
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();

    return `${day} ${month} ${year}`;
  };
  function maskUserName(userName) {
    const parts = userName.toUpperCase().split(" ");
    const maskedParts = parts.map(
      (part) => part.charAt(0) + "*".repeat(part.length - 1)
    );
    return maskedParts.join(" ");
  }
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
                      <p>{countryTranslations[mentorInfoById.country] || mentorInfoById.country}</p>
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
                          Number.isInteger(rating)
                            ? `${rating}.0`
                            : rating.toFixed(1)
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
                      <p onClick={() => setIscommentWrite(true)}>Rəy bildir</p>
                      {iscommentWrite ? (
                        <CommentWrite
                          mentorInfoById={mentorInfoById}
                          iscommentWrite={iscommentWrite}
                          setIscommentWrite={setIscommentWrite}
                          onCommentSubmit={handleCommentSubmit}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="bottom">
                  {mentorInfoById?.comments?.length <= 0 ? (
                    <h4 className="text-center my-5">Rəy yoxdur</h4>
                  ) : (
                    <div className="comments">
                      <h4>Bütün dəyərləndirmələr</h4>
                      {mentorInfoById?.comments?.map((item, commentIndex) => (
                        <div key={commentIndex} className="comment">
                          <div>
                            {commentStarRating(item.rate)}
                            <div className="cricle"></div>
                            <span>{formatDate(item.createdAt)}</span>
                          </div>
                          <p>{item.content}</p>
                          <p>{maskUserName(item.userName)}</p>
                        </div>
                      ))}
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
