import React, { useEffect, useState } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setIsVisible(scrollTop > 0);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const buttonStyle = {
    display: isVisible ? "block" : "none",
    position: "fixed",
    bottom: "25px",
    right: "25px",
    zIndex: "999",
    backgroundColor: "#c08cf4",
    borderRadius: '26%', 
    width: '40px',
    height: '40px',
    border: 'none',
    color: 'white',
    fontSize: '16px',
  };

  return (
    <div>
      {
        <p className="mb-4">
        </p>
      }
      <button onClick={handleScrollToTop} style={buttonStyle}>
        Top
      </button>
    </div>
  );
};

export default ScrollToTopButton;
