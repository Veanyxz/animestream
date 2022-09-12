import { useContext } from "react";
import axios from "axios";
import { SharedState } from "../App";
import { useNavigate } from "react-router-dom";
import { StarFilled } from "@ant-design/icons";
import "./GridCard.css";
export default function GridCard({
  title,
  image,
  episodeNumber,
  year,
  rating,

  id,
}) {
  const navigate = useNavigate();
  const animestate = useContext(SharedState);

  async function fetchVideo(id) {
    animestate.setVideoIsLoading(true);

    return await axios
      .get("https://consumet-api.herokuapp.com/meta/anilist/info/" + id)
      .then((res) => {
        animestate.setAnimeInfo(res.data);

        navigate("/animeplay");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <>
      <div
        className="gridcard-wrapper"
        onClick={() => {
          fetchVideo(id);
        }}
      >
        <div
          className="gridcard-card"
          style={{
            backgroundImage: `url(${image})`,
          }}
        >
          <div className="stardiv">
            <StarFilled />
            <span style={{ color: "white" }}>{rating / 10}</span>
          </div>
        </div>

        {episodeNumber > 0 && (
          <h5 className="gridcard-epnumber">Episode {episodeNumber}</h5>
        )}

        <h4 className="grid-card-title">{title}</h4>

        {year && <p className="gridcardinfo-year">{year}</p>}
      </div>
    </>
  );
}
