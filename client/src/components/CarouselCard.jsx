import { useEffect, useState, useContext } from "react";
import TextTruncate from "react-text-truncate";
import axios from "axios";
import { SharedState } from "../App";
import { useNavigate } from "react-router-dom";
export default function CarouselCard({
  title,
  image,
  episodeNumber,
  rating,
  id,
}) {
  const navigate = useNavigate();
  const animestate = useContext(SharedState);

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
    else if (windowSize >= 800 && windowSize < 1300) return [180, 270];
    else if (windowSize >= 475 && windowSize < 800) {
      return [180, 145];
    } else if (windowSize >= 440 && windowSize < 475) return [160, 130];
    else if (windowSize >= 420 && windowSize < 440) return [170, 125];
    else if (windowSize >= 390 && windowSize < 420) return [140, 115];
    else if (windowSize >= 360 && windowSize < 390) return [140, 110];
    else return [90, 100];
  };

  async function fetchVideo(id) {
    animestate.setVideoIsLoading(true);
    return await axios
      .get("https://consumet-api.herokuapp.com/meta/anilist/info/" + id)
      .then((res) => {
        animestate.setAnimeInfo(res.data);
        // animestate.onOpenModal();
        navigate("/animeplay", { state: { animeInfo: res.data } });
        // animestate.setVideoIsLoading(false);
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
            backgroundSize: "cover",
            animation: "x 1s",
          }}
        ></div>

        {episodeNumber > 0 && (
          <h5
            style={{
              color: "white",
              fontWeight: "lighter",
              marginTop: 5,
              fontSize: windowSize < 768 ? "1.15rem" : "1.35rem",
            }}
          >
            Episode {episodeNumber}
          </h5>
        )}

        <a
          href="/"
          className="anime-card-title"
          style={{
            color: "white",
            fontSize: windowSize < 768 ? "1.2rem" : "1.5rem",
            marginTop: 5,
          }}
        >
          <TextTruncate text={title} line={2}></TextTruncate>
        </a>
      </div>
    </>
  );
}
