import { useEffect, useState } from "react";
import CarouselRenderer from "../Layouts/CarouselRenderer";
import TrailerPlayer from "../Players/TrailerPlayer";
import axios from "axios";
export default function UpcomingSection() {
  const [trailerId, setTrailerId] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [upcoming, setUpComing] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.jikan.moe/v4/top/anime?filter=upcoming")
      .then((res) => {
        setUpComing(res.data.data);
      });
  }, []);
  return (
    <section
      style={{
        marginTop: 30,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
      className="section section-upcoming"
      id="upcoming"
    >
      {upcoming.length > 0 && (
        <CarouselRenderer
          finalQuery={upcoming}
          rowTitle="Upcoming"
          isUpcoming={true}
          setIsPlaying={setIsPlaying}
          setTrailerId={setTrailerId}
        ></CarouselRenderer>
      )}
      <TrailerPlayer
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        trailerId={trailerId}
      ></TrailerPlayer>
    </section>
  );
}
