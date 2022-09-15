import { useContext } from "react";
import TextTruncate from "react-text-truncate";
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

    navigate("/watch/" + id);
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
