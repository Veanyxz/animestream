import { useEffect, useState, useContext } from "react";
import TextTruncate from "react-text-truncate";
import axios from "axios";
import { SharedState } from "../App";
import { useNavigate } from "react-router-dom";
export default function ReccomendCard({
  title,
  image,
  rowTitle,
  episodeNumber,
  rating,
  id,
}) {
  const animestate = useContext(SharedState);
  const navigate = useNavigate();
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
    });
  });
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const calculateSize = (windowSize) => {
    if (windowSize > 1700) return [340, 230];
    else if (windowSize > 1600 && windowSize < 1700) return [230, 360];
    else if (windowSize > 1300 && windowSize < 1600) return [200, 310];
    else if (windowSize >= 768 && windowSize < 1300) return [180, 270];
  
    else if (windowSize >= 440 && windowSize <768) return [130, 185];
    else if (windowSize >= 420 && windowSize < 440) return [130, 185];
    else if (windowSize >= 390 && windowSize < 420) return [110, 175];
    else if (windowSize >= 360 && windowSize < 390) return [110, 165];
    else return [90, 150];
  };

  async function fetchVideo(id) {
    animestate.setVideoIsLoading(true);
    return await axios
      .get("https://consumet-api.herokuapp.com/meta/anilist/info/" + id)
      .then((res) => {
        animestate.setAnimeInfo(res.data);
        navigate("/animeplay", { state: { animeInfo: res.data } });
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <>
      <div
        onClick={() => {
          fetchVideo(id);
        }}
        className="animecard-wrapper"
        style={{
          display: "flex",
          marginTop: 5,
          flexDirection: "column",
          alignItems: "center",
          height: "fit-content",

          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            borderRadius: "10px",
            backgroundImage: `url(${image})`,
            height: calculateSize(windowSize)[0],
            width: calculateSize(windowSize)[1],
            backgroundPosition: "center",
            animation: "x 1s",
          }}
        ></div>

        {episodeNumber > 0 && (
          <h5 style={{ color: "white", marginTop: 5 }}>
            Episode {episodeNumber}
          </h5>
        )}

        <a
          href="/"
          className="anime-card-title"
          style={{ color: "white", fontWeight: "lighter", marginTop: 5 }}
        >
          <TextTruncate text={title} line={2}></TextTruncate>
        </a>
      </div>
    </>
  );
}
