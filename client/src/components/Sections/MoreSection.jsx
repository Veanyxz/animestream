import React from "react";
import { useLocation } from "react-router-dom";
import InfiniteSection from "./InfiniteSection";
import Navbar from "./Navbar";
const MoreSection = () => {
  const location = useLocation();

  console.log(location.state.url);
  return (
    <>
      <Navbar></Navbar>
      <h1
        className="more-title"
        style={{
          color: "white",
          fontSize: "3.2rem",
          marginLeft: 25,
          marginBottom: 3,
          marginTop: 90,
        }}
      >
        {location.state.section}
      </h1>

      <InfiniteSection
        itemlimit={28}
        id={location.state.section.toLowerCase()}
        querytype={"?"}
        url={location.state.url}
      ></InfiniteSection>
    </>
  );
};

export default MoreSection;
