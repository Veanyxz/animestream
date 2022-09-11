import ShakaPlayer from "shaka-player-react";
import "shaka-player-react/dist/controls.css";
import Select from "react-select";
import { useEffect, useState, useContext } from "react";
import TextTruncate from "react-text-truncate";
import ReccomendCarousel from "./ReccomendCarousel";
import { SharedState } from "../App";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
const AnimePlayerPage = ({ animeInfo, onOpenModal }) => {
  console.log(animeInfo);
  const animestate = useContext(SharedState);
  const [anime, setAnime] = useState(animeInfo);
  const [selectedOption, setSelectedOption] = useState(1);
  const [currentStreamUrl, setCurrentStreamUrl] = useState(null);
  const [currentId, setCurrentId] = useState(animeInfo.episodes[0].id);
  const epArray = [];
  for (let i = 1; i < anime.episodes.length; i++) {
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
      console.log("stream url changed");
      console.log(currentStreamUrl);
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
    setAnime(animeInfo);
    setCurrentId(animeInfo.episodes[0].id);
  }, [animeInfo]);

  useEffect(() => {
    console.log(selectedOption);
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

  return (
    <>
      <Navbar></Navbar>
      {currentStreamUrl !== null && (
        <div
          style={{
            width: "100%",
            maxWidth: 1200,
            margin: "0 auto",
            marginTop: 70,
          }}
        >
          {animestate.setVideoIsLoading(false)}

          <ShakaPlayer width="100vw" autoPlay src={currentStreamUrl} />
          <div
            className="curranime"
            style={{
              height: "100%",
              padding: 20,
              backgroundColor: "#10141e",
              fontFamily: "'Inter', sans-serif",
              lineHeight: "1.5",
            }}
          >
            <h2 style={{ color: "red" }}>{anime.title.english}</h2>
            <div
              className="curranimeinfo"
              style={{ marginTop: 5, display: "flex", gap: 25 }}
            >
              <span style={{ color: "white" }} className="curranime-platform">
                TV Show
              </span>
              <span style={{ color: "white" }} className="curranime-score">
                Rating: {anime.rating}
              </span>
              <span style={{ color: "white" }} className="curranime-epaired">
                Episodes Aired: {anime.episodes.length}
              </span>
              <span
                style={{ color: "white" }}
                className="curranime-releaseyear"
              >
                {anime.releaseDate}
              </span>
              <span style={{ color: "white" }} className="curranime-status">
                {anime.status}
              </span>
            </div>

            <form style={{ marginTop: 15 }}>
              <div
                className="contindex"
                style={{
                  overflowY: "scroll",
                  maxHeight: 95,
                  height: "fit-content",
                  display: "grid",
                  gap: "5px",
                  justifyItems: "start",

                  gridTemplateColumns: "repeat(auto-fit, minmax(50px, 1fr))",
                }}
              >
                {epArray.map((ep, index) => {
                  return (
                    <div
                      className="epindex"
                      onClick={(e) => {
                        setSelectedOption(e.target.innerText);
                      }}
                      style={{
                        cursor: "pointer",
                        height: 30,
                        width: 50,
                        color: "white",
                        backgroundColor: "#366083",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {ep}
                    </div>
                  );
                })}
              </div>
            </form>

            <hr style={{ marginTop: 20, background: "grey" }}></hr>
            <h3 style={{ color: "red", marginTop: 10 }}>Summary</h3>
            <p style={{ textAlign: "justify", color: "white" }}>
              <TextTruncate
                text={regexeddescription}
                line={window.innerWidth < 800 ? 4 : 8}
              ></TextTruncate>
            </p>
            <br />
            <h4 style={{ color: "red" }}>
              Genres:&nbsp;
              <span style={{ color: "white" }}>{anime.genres.join(", ")}</span>
            </h4>
            <h4 style={{ color: "red" }}>
              Studios:&nbsp;
              <span style={{ color: "white" }}>{anime.studios.join(", ")}</span>
            </h4>

            <h4 style={{ color: "red" }}>Adapation: </h4>

            <h4 style={{ color: "red" }}>Sequel: </h4>

            <br />
            <div className="recommendations">
              <h3 style={{ color: "red" }}>Recommendations</h3>

              <ReccomendCarousel
                finalQuery={anime.recommendations}
              ></ReccomendCarousel>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AnimePlayerPage;
