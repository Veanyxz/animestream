import Login from "./components/Pages/Login";
import "./App.css";
import Home from "./components/Pages/Home";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClockLoader from "react-spinners/PuffLoader";
import AnimePlayerPage from "./components/Pages/AnimePlayerPage";
import MoviesSection from "./components/Pages/MoviesPage";
import RecentPage from "./components/Pages/RecentPage";
import SearchResults from "./components/Pages/SearchResults";
export const SharedState = React.createContext();
const App = () => {
  const [animeInfo, setAnimeInfo] = useState(null);
  const [videoIsLoading, setVideoIsLoading] = useState(false);
  useEffect(() => {}, [animeInfo]);

  const override = {
    position: "fixed",
    zIndex: 800000,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,

    margin: "auto",

    borderColor: "red",
  };

  return (
    <SharedState.Provider
      value={{
        setAnimeInfo,
        videoIsLoading,
        setVideoIsLoading,
      }}
    >
      <div className="App">
        {videoIsLoading && (
          <ClockLoader
            className="spinner"
            color={"white"}
            loading={videoIsLoading}
            cssOverride={override}
            size={80}
          />
        )}
        <BrowserRouter>
          <>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/recentep" element={<RecentPage></RecentPage>} />

              <Route
                path="/watch/:id"
                element={<AnimePlayerPage animeInfo={animeInfo} />}
              />

              <Route path="/" element={<Home />} />
              <Route
                path="/movies"
                element={
                  <MoviesSection
                    setAnimeInfo={setAnimeInfo}
                    setVideoIsLoading={setVideoIsLoading}
                  ></MoviesSection>
                }
              />

              <Route
                path="/search"
                element={<SearchResults setAnimeInfo={setAnimeInfo} />}
              />
            </Routes>
          </>
        </BrowserRouter>
      </div>
    </SharedState.Provider>
  );
};

export default App;
