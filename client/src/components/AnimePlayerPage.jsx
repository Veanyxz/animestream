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
  const animestate = useContext(SharedState);

  animestate.setVideoIsLoading(true);

  if (animeInfo) {
    localStorage.setItem("animeInfo", JSON.stringify(animeInfo));
  }
  const [anime, setAnime] = useState(
    animeInfo ? animeInfo : JSON.parse(localStorage.getItem("animeInfo"))
  );
  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("animeInfo")));
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
        <div
          style={{
            width: "100%",
            maxWidth: 1100,
            margin: "0 auto",
            marginTop: 70,
          }}
        >
          {animestate.setVideoIsLoading(false)}

          <ShakaPlayer autoPlay src={currentStreamUrl} />

          <div
            className="curranime"
            style={{
              height: "100%",
              padding: 15,
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
                Ep Total: {anime.episodes.length}
              </span>
              <span
                style={{ color: "white" }}
                className="curranime-releaseyear"
              >
                {anime.releaseDate}
              </span>
            </div>

            <form style={{ marginTop: 15 }}>
              <div
                className="contindex"
                style={{
                  overflowY: "scroll",
                  maxHeight: 100,
                  height: "fit-content",
                  display: "grid",
                  gap: "5px",
                  justifyItems: "start",

                  gridTemplateColumns: "repeat(auto-fit, minmax(45px, 1fr))",
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
                        height: 25,
                        width: 45,
                        color: "white",
                        backgroundColor: "#366083",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "1.3rem",
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

            {adaptation !== "" && (
              <h4 style={{ color: "red" }}>
                Adapation:&nbsp;
                <span style={{ color: "white" }}>{adaptation}</span>
              </h4>
            )}
            <h4 style={{ color: "red" }}>
              Status:&nbsp;
              <span style={{ color: "white" }} className="curranime-status">
                {anime.status}
              </span>
            </h4>

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
