import { v4 as uuidv4 } from "uuid";
import { setConfiguration } from "react-grid-system";
import { useEffect, useState } from "react";
import InfiniteSection from "../Sections/InfiniteSection";
import "./GenresPage.css";
import Select from "react-select";
import Navbar from "../Sections/Navbar";
setConfiguration({ breakpoints: [768, 1170, 1500, 1700, 1800, 1900] });

export default function GenresPage({ setAnimeInfo }) {
  const [query, setQuery] = useState({});
  const [queryUrl, setQueryUrl] = useState(
    "https://consumet-api.herokuapp.com/meta/anilist/advanced-search?sort=" +
      "[" +
      '"' +
      "POPULARITY_DESC" +
      '"' +
      "]"
  );
  const [inResetState, setInResetState] = useState(false);

  const genres = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Mecha",
    "Music",
    "Mystery",
    "Psychological",
    "Romance",
    "Sci-Fi",
    "Slice_Of_Life",
    "Sports",
    "Supernatural",
    "Thriller",
  ];
  const formatOptions = [
    { value: "TV", label: "TV" },
    { value: "TV_SHORT", label: "TV_SHORT" },
    { value: "OVA", label: "OVA" },
    { value: "ONA", label: "ONA" },
    { value: "MOVIE", label: "MOVIE" },

    { value: "SPECIAL", label: "SPECIAL" },

    { value: "MUSIC", label: "MUSIC" },
  ];
  const statusOptions = [
    { value: "FINISHED", label: "Finished" },
    { value: "RELEASING", label: "Releasing" },
    { value: "NOT_YET_RELEASED", label: "Not Yet Released" },
    { value: "CANCELLED", label: "Cancelled" },
    { value: "HIATUS", label: "Hiatus" },
  ];
  const resetAll = () => {
    setInResetState(true);
    setSelectedFormat(null);
    setselectedSortCriteria(null);
    setSelectedStatus(null);
    setselectedYear(null);
    setQuery({});
  };

  const sortCriteriaOptions = [
    { value: "POPULARITY_DESC", label: "Popularity" },

    { value: "POPULARITY", label: "Popularity Ascending" },
    { value: "SCORE_DESC", label: "Score" },
    { value: "SCORE", label: "Score Ascending" },
    { value: "TRENDING_DESC", label: "Trending" },
    { value: "TRENDING", label: "Trending Ascending" },
    { value: "UPDATED_AT", label: "Updated At Ascending" },
    { value: "UPDATED_AT_DESC", label: "Updated At" },

    { value: "END_DATE", label: "End Date Ascending" },
    { value: "END_DATE_DESC", label: "End Date" },
  ];
  const yearOptions = [];

  for (let i = 1980; i <= 2022; i++) {
    yearOptions.push({
      value: String(i),
      label: i,
    });
  }

  const generateQueryUrl = () => {
    let isFirstParam = true;
    let url = "https://consumet-api.herokuapp.com/meta/anilist/advanced-search";

    if (query.selectedFormat) {
      url += isFirstParam ? "?" : "&";
      if (isFirstParam) isFirstParam = false;
      url += "format=" + query.selectedFormat.value;
    }

    if (query.selectedSortCriteria) {
      url += isFirstParam ? "?" : "&";
      if (isFirstParam) isFirstParam = false;
      url += "sort=" + "[" + '"' + query.selectedSortCriteria.value + '"' + "]";
    }
    if (query.selectedStatus) {
      url += isFirstParam ? "?" : "&";
      if (isFirstParam) isFirstParam = false;
      url = url + "status=" + query.selectedStatus.value;
    }
    if (query.selectedYear) {
      url += isFirstParam ? "?" : "&";
      if (isFirstParam) isFirstParam = false;
      url += "year=" + query.selectedYear.value;
    }

    if (selectedGenres.length > 0) {
      url += isFirstParam ? "?" : "&";
      url += "genres=[";

      selectedGenres.forEach((selectedGenre, index) => {
        url += '"' + selectedGenre + '"';
        if (index !== selectedGenres.length - 1) url += ","; //whats wrong?
      });

      url += "]";
    }
    console.log(url);
    return url;
  };
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [selectedSortCriteria, setselectedSortCriteria] = useState({
    value: "POPULARITY_DESC",
    label: "Popularity",
  });
  const [selectedYear, setselectedYear] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    if (selectedFormat) {
      setQuery({ ...query, selectedFormat });
    }
  }, [selectedFormat]);

  useEffect(() => {
    console.log(selectedGenres);
  }, [selectedGenres]);
  useEffect(() => {
    if (selectedYear) {
      setQuery({ ...query, selectedYear });
    }
  }, [selectedYear]);
  useEffect(() => {
    if (selectedStatus) {
      setQuery({ ...query, selectedStatus });
    }
  }, [selectedStatus]);
  useEffect(() => {
    if (selectedSortCriteria) {
      setQuery({ ...query, selectedSortCriteria });
    }
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
          defaultValue={selectedSortCriteria}
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
          defaultValue={selectedStatus}
          onChange={setSelectedStatus}
          options={statusOptions}
          placeholder="Status"
          value={selectedStatus}
        />
      </div>
      <div
        className="genres-container"
        style={{ display: "flex", gap: 10, marginLeft: 21 }}
      >
        {genres.map((genre, index) => {
          return (
            <div
              style={{
                backgroundColor: selectedGenres.includes(genre)
                  ? "white"
                  : "#fc4747",
                color: selectedGenres.includes(genre) ? "#fc4747" : "white",
              }}
              key={uuidv4()}
              onClick={(e) => {
                if (selectedGenres.includes(e.target.innerText)) {
                  setSelectedGenres(
                    selectedGenres.filter(
                      (genre) => genre !== e.target.innerText
                    )
                  );
                } else {
                  setSelectedGenres([...selectedGenres, e.target.innerText]);
                }
              }}
              className="genre-button"
            >
              {genre}
            </div>
          );
        })}
      </div>

      <div className="searchandfilter-container">
        <button
          className="btn-search-genre"
          onClick={() => {
            setQueryUrl(generateQueryUrl());
            setInResetState(false);
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

      {!inResetState && (
        <InfiniteSection
          isGenresPage={true}
          url={queryUrl}
          sectiontitle={"Results"}
          itemlimit={21}
          id="filterresults"
          querytype={"?"}
        ></InfiniteSection>
      )}
    </>
  );
}
