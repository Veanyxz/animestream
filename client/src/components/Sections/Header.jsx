import { useEffect, useState, useContext } from "react";
import "./Header.css";
import React from "react";
import axios from "axios";
import HeaderCarouselRenderer from "../Layouts/HeaderCarouselRenderer";
import Navbar from "./Navbar";
const Header = () => {
  const [finalResults, setFinalResults] = useState([]);

  useEffect(() => {
    axios
      .get("https://consumet-api.herokuapp.com/meta/anilist/trending")
      .then((data) => {
        setFinalResults(data.data.results);
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
