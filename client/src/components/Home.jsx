import "./Home.css";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "react-responsive-modal/styles.css";
import InfiniteSection from "./InfiniteSection";
import ScrollToTop from "react-scroll-to-top";
import Header from "./Header";
import MoviesSection from "./MoviesSection";
import UpcomingSection from "./UpcomingSection";
import { useRef } from "react";
import Caro from "./ReccomendCarousel";
import RecentSection from "./RecentSection";
import AnimeSection from "./AnimeSection";
import Cutter from "./Cutter";
export const SharedState = React.createContext();
export default function Home() {
  const location = useLocation();
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  console.log(location.state);

  useEffect(() => {
    const onPageLoad = () => {
      console.log("bruh");
      setTimeout(() => {
        document.querySelector("#popular").scrollIntoView();
        console.log(document.querySelector(".scrolltop"));
        setTimeout(() => {
          window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        }, 1000);
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
        {/* <AnimeSection
          url={
            "https://consumet-api.herokuapp.com/meta/anilist/recent-episodes"
          }
          id={"recent"}
          sectiontitle={"Recent Episodes"}
        ></AnimeSection> */}
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
        <ScrollToTop className="scrolltop" top={1500} smooth color="#6f00ff" />
      </>
    </SharedState.Provider>
  );
}
