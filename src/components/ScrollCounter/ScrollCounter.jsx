import React, { useState, useEffect } from "react";

const ScrollCounter = () => {
  const [count, setCount] = useState(0);
  const [lastScroll, setLastScroll] = useState(0); // Son scroll dəyəri
console.log(count);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY; // Hazırkı scroll məsafəsi
      const viewportHeight = window.innerHeight; // Ekran hündürlüyü (100vh)

      // Aşağı hərəkət
      if (scrollY > lastScroll && scrollY >= count * viewportHeight) {
        setCount((prevCount) => prevCount + 1);
      }
      // Yuxarı hərəkət
      else if (scrollY < lastScroll && scrollY < (count - 1) * viewportHeight) {
        setCount((prevCount) => Math.max(prevCount - 1, 0));
      }

      setLastScroll(scrollY); // Son scroll vəziyyətini yenilə
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [count, lastScroll]);

  return (
    <div style={{ height: "300vh", padding: "10px" }}>
      <h1>Scroll Count: {count}</h1>
      <p>Scroll edin və geri qayıdın! İlk dəyər 0-dan başlayır.</p>
    </div>
  );
};

export default ScrollCounter;
