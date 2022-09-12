import "./Home.css";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "react-responsive-modal/styles.css";
import InfiniteSection from "./InfiniteSection";
import ScrollToTop from "react-scroll-to-top";
import Header from "./Header";
import UpcomingSection from "./UpcomingSection";
import RecentSection from "./RecentSection";
import AnimeSection from "./AnimeSection";
import GenresCard from "./GenresCard";
export const SharedState = React.createContext();
export default function Home() {
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");

  useEffect(() => {
    const onPageLoad = () => {
      setTimeout(() => {
        document.querySelector("#popular").scrollIntoView();
      }, 1500);
    };

    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad);
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, []);
  return (
    <SharedState.Provider
      value={{
        setActive,
        setIcon,
        active,
        icon,
      }}
    >
      <>
        <Header></Header>
        <UpcomingSection></UpcomingSection>

        <AnimeSection
          url={
            "https://consumet-api.herokuapp.com/meta/anilist/recent-episodes"
          }
          id={"recent"}
          sectiontitle={"Recent"}
        ></AnimeSection>

        {/* <GenresCard></GenresCard> */}
        <AnimeSection
          url={"https://consumet-api.herokuapp.com/meta/anilist/trending"}
          id={"trending"}
          sectiontitle={"Trending"}
        ></AnimeSection>
        <AnimeSection
          url={
            "https://consumet-api.herokuapp.com/meta/anilist/advanced-search?format=SPECIAL"
          }
          id={"special"}
          sectiontitle={"Special"}
        ></AnimeSection>
        <InfiniteSection
          url={"https://consumet-api.herokuapp.com/meta/anilist/popular"}
          itemlimit={18}
          sectiontitle={"Most Popular"}
          id="popular"
          querytype={"?"}
        ></InfiniteSection>
        <ScrollToTop
          style={{
            border: "1px solid dodgerblue",
            background: "rgb(33, 33, 33)",
            color: "white",
            boxShadow: "none",
          }}
          className="scrolltop"
          top={1500}
          smooth
          color="#fff"
        />
      </>
    </SharedState.Provider>
  );
}
