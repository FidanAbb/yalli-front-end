import { useContext, useState } from "react";
import { Rating } from "react-simple-star-rating";
import fillStar from "../../../../../src/pages/Mentor/MentorDetail/image/star-fill.png";
import halfStar from "../../../../../src/pages/Mentor/MentorDetail/image/star-half.png";
import lineStar from "../../../../../src/pages/Mentor/MentorDetail/image/star-line.png";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { YalliContext } from "../../../../Context/YalliContext";
import axios from "axios";
const CommentWrite = ({
  mentorInfoById,
  iscommentWrite,
  setIscommentWrite,
  onCommentSubmit
}) => {
  const { userID } = useContext(YalliContext);
  console.log(userID);

  const [contentState, setContentState] = useState("");
  const [rating, setRating] = useState(0);
  const mentorID = useParams();
  console.log(mentorID.id);

  const handleRating = (rate) => {
    const normalizedRating = rate / 20;
    setRating(normalizedRating);
    console.log(`Rating: ${normalizedRating}`);
  };
  const textareaOnChange = (e) => {
    setContentState(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Həm `rating`, həm də `contentState` yoxlanır
    if (rating <1 && contentState.trim() === "") {
      toast.warn(
        "Zəhmət olmasa, ən azı bir ulduz və ya rəy mətnini daxil edin.",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
      return;
    }

    try {
      
      const normalizedRating = (rating * 20).toString();
      const response = await axios.post("https://yalli-back-end.onrender.com/v1/comments", {
        content: contentState,
        rate: normalizedRating, 
        userId: userID, 
        mentorId: mentorID.id 
      });
  
      // Müvəffəqiyyət mesajı
      toast.success("Rəy uğurla göndərildi!", {
        position: "top-center",
        autoClose: 3000,
      });
  
      // Formu təmizləmək
      setContentState("");
      setRating(0);
      setIscommentWrite(false);
      onCommentSubmit();
    } catch (error) {
      // Xəta mesajı
      toast.error("Rəy göndərilmədi, bir problem yarandı.", {
        position: "top-center",
        autoClose: 3000,
      });
      console.error("Error submitting comment:", error);
    }
  };
  const onPointerEnter = () => console.log("Hover başladı");
  const onPointerLeave = () => console.log("Hover dayandı");
  const onPointerMove = (value, index) =>
    console.log(`Hover: ${value}, Index: ${index}`);

  return (
    <div className="comment-write">
      <div className="write-con">
        <div className="box-con">
          <form onSubmit={handleSubmit} className="form" action="">
            <p>Fikirləriniz bizim üçün önəmlidir!</p>
            <div className="App">
              <Rating
                onClick={handleRating}
                onPointerEnter={onPointerEnter}
                onPointerLeave={onPointerLeave}
                onPointerMove={onPointerMove}
                ratingValue={rating * 20}
                size={50}
                allowHalfIcon
                transition
                className="star-icons"
              />
              <p>Seçilmiş Reytinq: {rating * 20} </p>{" "}
            </div>
            <textarea
              name=""
              id=""
              className="textarea"
              placeholder="Rəyinizi bildirin"
              onChange={textareaOnChange}
            ></textarea>
            <button className="submit-btn" type="submit">
              Göndər
            </button>
            <div onClick={() => setIscommentWrite(false)} className="close-btn">
              <IoIosCloseCircleOutline />
            </div>
          </form>
        </div>
      </div>

      {/* Əlavə qara fon və close düyməsi üçün */}
      <div
        onClick={() => setIscommentWrite(false)}
        className="black-background"
      ></div>
    </div>
  );
};

export default CommentWrite;
