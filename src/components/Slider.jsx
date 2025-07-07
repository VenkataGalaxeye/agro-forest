import React, { useState, useRef } from "react";
import { styled } from "@stitches/react";
const SliderMainContainer = styled("div", {
  border: "1px solid black",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "10px",
  WebkitUserSelect: "none",
  userSelect: "none"
});
const SliderWheel = styled("div", {
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "larger",
  zIndex: 10,
  position: "absolute",
  top: "50%",
  transform: "translate(-50%, -50%)"
});
const WheelMainLine = styled("div", {
  width: "0px",
  height: "100%",
  border: "2px solid black"
});
const TriangleLeft = styled("div", {
  width: 0,
  height: 0,
  borderTop: "7px solid transparent",
  borderRight: "15px solid white",
  borderBottom: "7px solid transparent",
  marginRight: "5px"
});
const TriangleRight = styled("div", {
  width: 0,
  height: 0,
  borderTop: "7px solid transparent",
  borderLeft: "15px solid white",
  borderBottom: "7px solid transparent",
  marginLeft: "5px"
});
function Slider({ img }) {
  const [scrollOffset, setScrollOffset] = useState({
    clip1: "inset(0% 50% 0% 0%)",
    clip2: "inset(0% 0% 0% 50%)"
  });
  const [sliderOffset, setSliderOffset] = useState(50);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const mainDivRef = useRef(null);
  // Update divWidth on mount/resize so dragging works properly
  // useEffect(() => {
  //   function handleResize() {
  //     if (mainDivRef.current) {
  //     }
  //   }
  //   window.addEventListener("resize", handleResize);
  //   handleResize();
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);
  // Handle dragging
  const handleMouseMove = (e) => {
    if (!isMouseDown || !mainDivRef.current) return;
    const rect = mainDivRef.current.getBoundingClientRect();
    const mouseX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const pct = (mouseX / rect.width) * 100;
    setSliderOffset(pct);
    setScrollOffset({
      clip1: `inset(0% ${100 - pct}% 0% 0%)`,
      clip2: `inset(0% 0% 0% ${pct}%)`
    });
  };
  return (
    <SliderMainContainer
      // Shrink the container so it fits nicely on a laptop
      //  - max-w: limit overall width to 800px
      //  - aspect-[16/9]: ratio so it's not too tall
      //  - relative: for the absolute-positioned second image
      className="w-full max-w-[1000px] aspect-[16/9] relative mx-auto"
      ref={mainDivRef}
      onMouseMove={handleMouseMove}
      onMouseUp={() => setIsMouseDown(false)}
      onMouseLeave={() => setIsMouseDown(false)}
    >
      {/* The draggable wheel */}
      <SliderWheel
        style={{
          left: `${sliderOffset}%`,
          cursor: isMouseDown ? "grabbing" : "grab"
        }}
        onMouseDown={() => setIsMouseDown(true)}
      >
        <TriangleLeft />
        <WheelMainLine />
        <TriangleRight />
      </SliderWheel>
      {/* Left (Before) image */}
      {img[0] && (
        <img
          src={img[0]}
          alt="Before"
          draggable="false"
          style={{
            width: "full",
            height: "500px",
            objectFit: "contain", // show entire image
            clipPath: scrollOffset.clip1
          }}
        />
      )}
      {/* Right (After) image */}
      {img[1] && (
        <img
          src={img[1]}
          alt="After"
          draggable="false"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "full",
            height: "500px",
            objectFit: "contain", // show entire image
            clipPath: scrollOffset.clip2
          }}
        />
      )}
    </SliderMainContainer>
  );
}
export default Slider;