import React, { useRef, useState, useEffect, useContext } from 'react';
import styles from './style.module.scss';
import JoinGroupIcon from '../../ui/JoinGroupIcon';
import ShareIcon from '../../ui/ShareIcon';
import GroupIcon from '../../ui/GroupIcon';
import HeroImg from '../../../assets/img/groupDetail.svg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { YalliContext } from '../../../Context/YalliContext';

const Hero = ({ group }) => {
  const [isHover, setIsHover] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [userData, setUserData] = useState("");
  const { scrollToAbout } = useContext(YalliContext);
  let navigate = useNavigate();
  const moreTextRef = useRef(null); 
console.log();

  useEffect(() => {
    const loggedUser = localStorage.getItem("userInfo");
    if (loggedUser) {
      setUserData(JSON.parse(loggedUser));
    }
  }, []);

  const handleCopyToClipboard = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
      toast.success("URL copied!");
    } catch (err) {
      console.error('Failed to copy: ', err);
      toast.error("Failed to copy URL.");
    }
  };

  const handleJoinGroup = () => {
    if (userData) {
      const url = group.link;
      window.open(url);
    } else {
      navigate('/login');
    }
  };

  const handleMoreClick = () => {
    moreTextRef.current.scrollIntoView({ behavior: 'smooth' }); // Scrolls to the more text ref smoothly
  };

  const descriptionPreview = group.description.length > 350
    ? `${group.description.substring(0, 350)}...`
    : group.description;

  return (
    <div className={styles["hero"]}>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <div className="container">
        <div className={styles["hero"]}>
          <div className={styles["card"]}>
            <div className={styles["upper"]}>
              <h1>{group.title}</h1>
              <button
                onClick={handleJoinGroup}
                onMouseLeave={() => setIsHover(false)}
                onMouseEnter={() => setIsHover(true)}
              >
                İcmaya qoşul <JoinGroupIcon isHover={isHover} />
              </button>
            </div>
            <div className={styles["down"]}>
              <img
                src={`https://minio-server-4oyt.onrender.com/yalli/${group?.imageId}`}
                alt=""
              />
              <div className={styles["detail"]}>
                <p>
                  {descriptionPreview}
                  {group.description.length > 60 && (
                    <span onClick={scrollToAbout} style={{ cursor: 'pointer', color: 'black' }}>...</span> // Clickable more text
                  )}
                </p>
                <div className={styles["foot"]}>
                  <p>
                    <GroupIcon color="#111111" />
                    {group.memberCount}+ üzv
                  </p>
                  <div onClick={handleCopyToClipboard} style={{ cursor: "pointer" }} className={styles['copy-text']}>
                    {copySuccess && <span className={styles["copy-success"]}>Copied!</span>}
                    <ShareIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
