import { useContext } from "react";
import TextTruncate from "react-text-truncate";
import { SharedState } from "../../App";
import { useNavigate } from "react-router-dom";
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
        className="animecard-wrapper"
      >
        <div
          className="animecard-card"
          style={{
            backgroundImage: `url(${image})`,
          }}
        ></div>

        {episodeNumber > 0 && (
          <h5 className="epnumber">Episode {episodeNumber}</h5>
        )}

        <a href={`/watch/${id}`} className="animecard-title">
          <TextTruncate text={title} line={2}></TextTruncate>
        </a>
      </div>
    </>
  );
}
