import ShakaPlayer from "shaka-player-react";
import "shaka-player-react/dist/controls.css";
import ScrollToTop from "react-scroll-to-top";
import "./AnimePlayerPage.css";
import { useEffect, useState, useContext } from "react";
import TextTruncate from "react-text-truncate";
import { v4 as uuidv4 } from "uuid";

import ReccomendCarousel from "./ReccomendCarousel";
import {
  StarFilled,
  CalendarOutlined,
  OrderedListOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { SharedState } from "../App";
import axios from "axios";
import Navbar from "./Navbar";
const AnimePlayerPage = ({ animeInfo, onOpenModal }) => {
  const animestate = useContext(SharedState);

  animestate.setVideoIsLoading(true);

  if (animeInfo) {
    localStorage.setItem("animeInfo", JSON.stringify(animeInfo));
  }
  const [anime, setAnime] = useState(
    animeInfo ? animeInfo : JSON.parse(localStorage.getItem("animeInfo"))
  );
  useEffect(() => {
  }, []);
  const [selectedOption, setSelectedOption] = useState(1);
  const [currentStreamUrl, setCurrentStreamUrl] = useState(null);
  const [currentId, setCurrentId] = useState("");
  const epArray = [];
  for (let i = 1; i <= anime.episodes.length; i++) {
    epArray.push(i);
  }

  useEffect(() => {
    let epindexes = document.querySelectorAll(".epindex");

    Array.from(epindexes).forEach((epindex) => {
      if (epindex.innerText === selectedOption)
        epindex.style.backgroundColor = "red";
      else epindex.style.backgroundColor = "#366083";
    });
  }, [selectedOption]);

  async function fetchVideoById(url) {
    return await axios.get(url).then((response) => {
      setCurrentStreamUrl(response.data.sources[1].url);
    });
  }

  const changeStream = () => {
    setCurrentId(anime.episodes[selectedOption - 1].id);
  };

  useEffect(() => {
    fetchVideoById(
      " https://consumet-api.herokuapp.com/meta/anilist/watch/" + currentId
    );
  }, [currentId]);

  useEffect(() => {
    if (animeInfo) {
      setAnime(animeInfo);
      setCurrentId(animeInfo.episodes[selectedOption - 1].id);
    }
  }, [animeInfo]);

  useEffect(() => {
    changeStream();
  }, [selectedOption]);

  let regexeddescription = anime.description.replaceAll(
    /<\/?[\w\s]*>|<.+[\W]>/g,
    ""
  );
  regexeddescription = regexeddescription.substring(
    0,
    regexeddescription.indexOf("("),
    4
  );
  let adaptation = "";
  if (anime.relations !== null) {
    for (let i = 0; i < anime.relations.length; i++) {
      if (anime.relations[i].relationType === "ADAPTATION") {
        adaptation =
          anime.relations[i].title.english || anime.relations[i].title.romaji;
      }
    }
  }

  return (
    <>
      <Navbar></Navbar>

      {currentStreamUrl !== null && anime && (
        <div className="animeplayer-container">
          {animestate.setVideoIsLoading(false)}
          <div className="top-narrowbar">
            <span style={{ color: "white" }}> EP {selectedOption}</span>
          </div>
          <ShakaPlayer autoPlay src={currentStreamUrl} />

          <div className="curranime">
            <h2 style={{ color: "red" }}>{anime.title.english}</h2>
            <div className="curranimeinfo">
              <span className="curranime-platform">
                <PlayCircleOutlined /> TV Show
              </span>
              <span className="curranime-score">
                Rating: <StarFilled style={{ color: "yellow" }} />{" "}
                {anime.rating / 10}
              </span>
              <span className="curranime-epaired">
                <OrderedListOutlined /> Ep Total: {anime.episodes.length}
              </span>
              <span className="curranime-releaseyear">
                <CalendarOutlined /> {anime.releaseDate}
              </span>
            </div>

            <form style={{ marginTop: 15 }}>
              <div className="contindex">
                {epArray.map((ep, index) => {
                  return (
                    <div
                      key={uuidv4()}
                      className="epindex"
                      onClick={(e) => {
                        setSelectedOption(e.target.innerText);
                      }}
                    >
                      {ep}
                    </div>
                  );
                })}
              </div>
            </form>

            <hr></hr>

            <h3 className="summary-title">Summary</h3>
            <p className="summary-content">
              <TextTruncate
                text={regexeddescription}
                line={window.innerWidth < 800 ? 4 : 8}
              ></TextTruncate>
            </p>

            <br />

            <h4 style={{ color: "red" }}>
              Genres:&nbsp;
              <span className="curranime-genres">
                {anime.genres.join(", ")}
              </span>
            </h4>
            <h4 style={{ color: "red" }}>
              Studios:&nbsp;
              <span className="curranime-studios">
                {anime.studios.join(", ")}
              </span>
            </h4>

            {adaptation !== "" && (
              <h4 style={{ color: "red" }}>
                Adapation:&nbsp;
                <span className="curranime-adaptation">{adaptation}</span>
              </h4>
            )}
            <h4 style={{ color: "red" }}>
              Status:&nbsp;
              <span className="curranime-status">{anime.status}</span>
            </h4>

            <br />
            <div className="recommendations-title">
              <h3>Recommendations</h3>

              <ReccomendCarousel
                finalQuery={anime.recommendations}
              ></ReccomendCarousel>
            </div>
          </div>
        </div>
      )}
      <ScrollToTop
        style={{
          border: "1px solid dodgerblue",
          background: "rgb(33, 33, 33)",
          color: "white",
          boxShadow: "none",
        }}
        className="scrolltop"
        top={1500}
        smooth
        color="#fff"
      />
    </>
  );
};

export default AnimePlayerPage;
