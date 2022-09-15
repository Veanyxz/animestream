import { v4 as uuidv4 } from "uuid";
import { setConfiguration } from "react-grid-system";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import InfiniteSection from "../Sections/InfiniteSection";
import "./GenresPage.css";
import Select from "react-select";
import Navbar from "../Sections/Navbar";
setConfiguration({ breakpoints: [768, 1170, 1500, 1700, 1800, 1900] });

export default function GenresPage({ setAnimeInfo }) {
  const [query, setQuery] = useState({});
  const [queryUrl, setQueryUrl] = useState("");
  const formatOptions = [
    { value: "tv", label: "TV" },
    { value: "tvshort", label: "TV_SHORT" },
    { value: "ova", label: "OVA" },
    { value: "ona", label: "ONA" },
    { value: "movie", label: "MOVIE" },

    { value: "special", label: "SPECIAL" },

    { value: "music", label: "MUSIC" },
  ];
  const statusOptions = [
    { value: "finished", label: "Finished" },
    { value: "releasing", label: "Releasing" },
    { value: "notyetreleased", label: "Not Yet Released" },
    { value: "cancelled", label: "Cancelled" },
    { value: "hiatus", label: "Hiatus" },
  ];

  const resetAll = () => {
    setSelectedFormat(null);
    setselectedSortCriteria(null);
    setSelectedStatus(null);
    setselectedYear(null);
    setQuery({});
  };
  const sortCriteriaOptions = [
    { value: "popularitydescending", label: "Popularity Descending" },
    { value: "popularityascending", label: "Popularity Ascending" },
    { value: "scoredescending", label: "Score Descending" },
    { value: "scoreascending", label: "Score Ascending" },
    { value: "trendingdescending", label: "Trending Descending" },
    { value: "trendingascending", label: "Trending Ascending" },
  ];
  const yearOptions = [];

  for (let i = 1980; i <= 2022; i++) {
    yearOptions.push({
      value: String(i),
      label: i,
    });
  }

  //   const generateQueryUrl = () => {
  //     let url =
  //     return url;
  //   };

  const [selectedFormat, setSelectedFormat] = useState(null);
  const [selectedSortCriteria, setselectedSortCriteria] = useState(null);
  const [selectedYear, setselectedYear] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  useEffect(() => {
    if (selectedFormat) {
      setQuery({ ...query, selectedFormat });
    }
  }, [selectedFormat]);
  useEffect(() => {}, [queryUrl]);
  useEffect(() => {
    if (selectedYear) setQuery({ ...query, selectedYear });
  }, [selectedYear]);
  useEffect(() => {
    if (selectedStatus) setQuery({ ...query, selectedStatus });
  }, [selectedStatus]);
  useEffect(() => {
    if (selectedSortCriteria) setQuery({ ...query, selectedSortCriteria });
  }, [selectedSortCriteria]);

  return (
    <>
      <Navbar></Navbar>
      <h1
        style={{
          fontSize: "3rem",
          color: "#fdba74",
          marginTop: 80,
          marginLeft: "21px",
        }}
      >
        Filter
      </h1>

      <div
        className="selections-container"
        style={{ display: "flex", gap: 10, marginLeft: "21px", marginTop: 15 }}
      >
        <Select
          defaultValue={selectedFormat}
          onChange={setSelectedFormat}
          options={formatOptions}
          placeholder="Format"
          value={selectedFormat}
        />

        <Select
          options={sortCriteriaOptions}
          defaultValue={selectedFormat}
          onChange={setselectedSortCriteria}
          placeholder="Sort By"
          value={selectedSortCriteria}
        />
        <Select
          defaultValue={selectedFormat}
          onChange={setselectedYear}
          options={yearOptions}
          placeholder="Year"
          value={selectedYear}
        />
        <Select
          defaultValue={selectedFormat}
          onChange={setSelectedStatus}
          options={statusOptions}
          placeholder="Status"
          value={selectedFormat}
        />
      </div>
      <div
        className="genres-container"
        style={{ display: "flex", gap: 10, marginLeft: 21 }}
      >
        <div className="genre-button">Action</div>
        <div className="genre-button">Adventure</div>
        <div className="genre-button">Comedy</div>

        <div className="genre-button">Drama</div>
        <div className="genre-button">Fantasy</div>

        <div className="genre-button">Horror</div>

        <div className="genre-button">Mecha</div>
        <div className="genre-button">Music</div>

        <div className="genre-button">Mystery</div>
        <div className="genre-button">Psychological</div>

        <div className="genre-button">Romance</div>
        <div className="genre-button">Sci-Fi</div>
        <div className="genre-button">Slice Of Life</div>
        <div className="genre-button">Sports</div>

        <div className="genre-button">Supernatural</div>

        <div className="genre-button">Thriller</div>
      </div>

      <div className="searchandfilter-container">
        <button
          className="btn-search-genre"
          onClick={() => {
            setQueryUrl(
              "https://consumet-api.herokuapp.com/meta/anilist/advanced-search" +
                "?format=" +
                query.selectedFormat.label
            );
          }}
        >
          Search
        </button>
        <button
          className="btn-reset-genre"
          onClick={() => {
            resetAll();
          }}
        >
          Reset
        </button>
      </div>

      <h1 className="results-title">Results</h1>
      {queryUrl !== "" && (
        <InfiniteSection
          isGenresPage={true}
          url={queryUrl}
          itemlimit={18}
          id="filterresults"
          querytype={"?"}
        ></InfiniteSection>
      )}
    </>
  );
}
