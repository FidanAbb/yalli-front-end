import { useContext, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { YalliContext } from "../../../../Context/YalliContext";

import axios from "axios";
import StarRating from "./StarRating";
const CommentWrite = ({
  mentorInfoById,
  iscommentWrite,
  setIscommentWrite,
  onCommentSubmit,
}) => {
  const { userID } = useContext(YalliContext);

  const [contentState, setContentState] = useState("");
  const [rating, setRating] = useState(0);
  const mentorID = useParams();
console.log(rating);

  const textareaOnChange = (e) => {
    setContentState(e.target.value);
  }; const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating < 1) { 
      toast.warn("Zəhmət olmasa, ən azı bir ulduz seçin.", );
      return;
    }

    try {
      const normalizedRating = (rating).toString();
      const response = await axios.post(
        "https://yalli-back-end.onrender.com/v1/comments",
        {
          content: contentState,
          rate: normalizedRating,
          userId: userID,
          mentorId: mentorID.id,
        }
      );

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
 

  return (
    <div className="comment-write">
      <div className="write-con">
        <div className="box-con">
          <form onSubmit={handleSubmit} className="form" action="">
            <p>Fikirləriniz bizim üçün önəmlidir!</p>
            <div className="App">
              <StarRating totalStars={5} onRatingChange={handleRatingChange} />
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
