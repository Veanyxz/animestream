import {
  PlayCircleOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import "./HeaderCarouselCard.css";
import { useContext } from "react";
import { faListOl,faChevronRight,faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextTruncate from "react-text-truncate";
import { SharedState } from "../../App";
import { useNavigate } from "react-router-dom";
export default function HeaderCarouselCard({
  duration,
  cover,
  title,
  id,
  year,
  description,
  epcount,
  coversmall,
}) {
  const navigate = useNavigate();

  const animestate = useContext(SharedState);

  async function fetchVideo(id) {
    animestate.setVideoIsLoading(true);

    return await axios
      .get("https://consumet-api.herokuapp.com/meta/anilist/info/" + id)
      .then((res) => {
        animestate.setAnimeInfo(res.data);

        navigate("/watch");
        animestate.setVideoIsLoading(false);
      });
  }

  let regexeddescription = description.replaceAll(/<\/?[\w\s]*>|<.+[\W]>/g, "");
  regexeddescription = regexeddescription.substring(
    0,
    regexeddescription.indexOf("("),
    4
  );

  return (
    <>
      <div
        className="header-card"
        style={{
          backgroundImage: ` linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3) ),url(${cover})`,
        }}
      >
        <div className="anime-info-div">
          <h1 className="anime-title">{title !== "" && title}</h1>
          <div className="anime-info">
            <p className="anime-info-item">
              {" "}
              <PlayCircleOutlined /> TV
            </p>

            <p className="anime-info-item">
              <FontAwesomeIcon icon={faListOl} /> {epcount} Episodes
            </p>
            <p className="anime-info-item">
              <ClockCircleOutlined /> {duration} Minutes
            </p>
            <p className="anime-info-item">
              <CalendarOutlined /> {year}
            </p>
          </div>
          <p className="anime-description">
            {" "}
            <TextTruncate text={regexeddescription} line={4}></TextTruncate>
          </p>
        </div>
        <a
          onClick={(e) => {
            e.preventDefault();
            fetchVideo(id);
          }}
          className="btn btn-watchnow"
          href="/login"
        >
          {" "}
          <PlayCircleOutlined /> Watch Now
        </a>
      </div>
    </>
  );
}
