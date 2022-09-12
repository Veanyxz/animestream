import { useEffect, useState, useContext } from "react";
import TextTruncate from "react-text-truncate";
import axios from "axios";
import { SharedState } from "../App";
import { useNavigate } from "react-router-dom";
import { StarFilled } from "@ant-design/icons";
import "./CarouselCard.css";
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
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  async function fetchVideo(id) {
    animestate.setVideoIsLoading(true);
    return await axios
      .get("https://consumet-api.herokuapp.com/meta/anilist/info/" + id)
      .then((res) => {
        animestate.setAnimeInfo(res.data);
        console.log(res.data);

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
          className="animecard-card"
          style={{
            borderRadius: "10px",
            backgroundImage: `url(${image})`,
            // height: calculateSize(windowSize)[0],
            // width: calculateSize(windowSize)[1],
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
