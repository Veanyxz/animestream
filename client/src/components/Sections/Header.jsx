import { useEffect, useState, useContext } from "react";
import "./Header.css";
import React from "react";
import HeaderCarouselRenderer from "../Layouts/HeaderCarouselRenderer";
import Navbar from "./Navbar";
const Header = () => {
  const [finalResults, setFinalResults] = useState([]);

  useEffect(() => {
    fetch("https://consumet-api.herokuapp.com/meta/anilist/trending")
      .then((response) => response.json())
      .then((data) => {
        setFinalResults(data.results);
      }, []);
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <header className="header">
        <section className="section section-carousel">
          {finalResults.length > 0 && (
            <HeaderCarouselRenderer
              finalResults={finalResults}
            ></HeaderCarouselRenderer>
          )}
        </section>
      </header>
    </>
  );
};

export default Header;
