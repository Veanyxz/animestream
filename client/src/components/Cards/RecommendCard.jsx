import { useContext } from "react";
import TextTruncate from "react-text-truncate";
import axios from "axios";
import { SharedState } from "../../App";
import "./RecommendCard.css";
import { useNavigate } from "react-router-dom";
import { StarFilled } from "@ant-design/icons";
export default function RecommendCard({
  title,
  image,
  episodeNumber,
  rating,
  id,
}) {
  const animestate = useContext(SharedState);
  const navigate = useNavigate();

  async function fetchVideo(id) {
    animestate.setVideoIsLoading(true);
    return await axios
      .get("https://consumet-api.herokuapp.com/meta/anilist/info/" + id)
      .then((res) => {
        animestate.setAnimeInfo(res.data);
        navigate("/watch/" + res.data.id);

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
        className="recommend-wrapper"
      >
        <div
          className="recommend-card"
          style={{
            backgroundImage: `url(${image})`,
          }}
        >
          <div className="stardiv">
            <StarFilled />
            {rating / 10}
          </div>
        </div>

        {episodeNumber > 0 && (
          <h5 className="epnumber">Episode {episodeNumber}</h5>
        )}

        <a href="/" className="recommend-card-title">
          <TextTruncate text={title} line={2}></TextTruncate>
        </a>
      </div>
    </>
  );
}
