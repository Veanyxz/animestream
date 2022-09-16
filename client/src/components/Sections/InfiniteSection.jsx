import { useEffect, useState } from "react";
import GridRenderer from "../Layouts/GridRenderer.jsx";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import ClockLoader from "react-spinners/ClockLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from "react-hot-toast";
import {
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
const override = {
  position: "fixed",
  zIndex: 1,
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,

  margin: "auto",

  borderColor: "red",
};
export default function InfiniteSection({
  url,
  sectiontitle,
  itemlimit,
  isGenresPage,
  id,
  querytype,
}) {
  const [fetchedData, setFetchedData] = useState([]);
  const [currpage, setCurrpage] = useState(1);
  const [isAnimate, setIsAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);

  const [pageNumbers, setPageNumbers] = useState([1, 2, 3, 4, 5]);
  const updatePageNumberButtons = (e) => {
    if (e.target.classList.contains("nextPageButton")) {
      if (currpage % 5 === 0) {
        let temp = [];
        for (let i = 1; i <= 5; i++) {
          temp.push(currpage + i);
        }

        setPageNumbers(temp);
      }
    }

    if (e.target.classList.contains("previousPageButton")) {
      if (currpage % 5 === 1) {
        let temp = [];
        for (let i = 5; i >= 1; i--) {
          temp.push(currpage - i);
        }
        setPageNumbers(temp);
      }
    }
  };

  useEffect(() => {
    setCurrpage(1);
  }, [url]);
  useEffect(() => {
    setLoading(true);
    setIsAnimate(false);
    if (currpage > 1) {
      document.querySelector("#" + id).scrollIntoView();
    }
    axios
      .get(
        isGenresPage
          ? url + "&page=" + currpage + "&perPage=" + itemlimit
          : url + querytype + "page=" + currpage + "&perPage=" + itemlimit
      )

      .then((data) => {
        if (data.data.hasNextPage) {
          setHasNextPage(true);
        } else {
          setHasNextPage(false);
        }

        setFetchedData(data.data.results);
        setLoading(false);
        setIsAnimate(true);
      });
  }, [currpage, url]);

  return (
    <>
      <section
        id={id}
        className="section section-infinite"
        style={{
          paddingBottom: 40,
          marginTop: querytype === "&" ? 70 : "",
        }}
      >
        {fetchedData.length > 0 && (
          <>
            <h1
              style={{
                color: isGenresPage ? "yellow" : "#fdba74",
                fontSize: "3rem",
                marginLeft: "20px",
                marginTop: isGenresPage ? 30 : "",
              }}
            >
              {sectiontitle}
            </h1>

            <GridRenderer
              isAnimate={isAnimate}
              finalQuery={fetchedData}
            ></GridRenderer>
            <div
              className="pagination-wrapper"
              style={{
                marginTop: 20,
                display: "flex",
                alignItems: "center",
                width: "100vw",
                justifyContent: "center",
              }}
            >
              <div
                className="pagination"
                style={{
                  height: 60,
                  width: "96%",

                  display: "flex",
                  alignItems: "center",

                  marginTop: 20,
                  borderTop: "1px solid dodgerblue",
                  justifyContent: "space-between",
                }}
              >
                <button
                  className="previousPageButton"
                  onClick={(e) => {
                    if (currpage <= 1) {
                      toast.error("You are on the first page!");
                    } else {
                      updatePageNumberButtons(e);
                      setCurrpage((prev) => prev - 1);
                    }
                  }}
                  style={{
                    fontSize: "15px",
                    outline: "none",
                    border: "none",
                    color: "white",
                    width: 150,
                    backgroundColor: "transparent",
                  }}
                >
                  <FontAwesomeIcon icon={faArrowLeftLong}></FontAwesomeIcon>{" "}
                  &nbsp;Previous
                </button>

                <div
                  style={{
                    display: "flex",
                    gap: 40,
                    justifyContent: "center",
                  }}
                  className="pageindex"
                >
                  {pageNumbers.map((pageNumber) => (
                    <button
                      className="btn-pageindex"
                      key={uuidv4()}
                      onClick={() => {
                        setCurrpage(pageNumber);
                      }}
                      style={{
                        border: "none",
                        padding: "4px 8px",
                        borderRadius: 5,
                        color: "white",
                        background: "none",
                        fontSize: 14,
                        backgroundColor:
                          currpage === pageNumber ? "rgb(244, 67, 54)" : "none",
                      }}
                    >
                      {pageNumber}
                    </button>
                  ))}
                </div>

                <button
                  className="nextPageButton"
                  onClick={(e) => {
                    if (hasNextPage) {
                      updatePageNumberButtons(e);
                      setCurrpage((curr) => curr + 1);
                      console.log(currpage);
                    } else {
                      toast.error("This is the last page!");
                    }
                  }}
                  style={{
                    color: "white",
                    width: 150,
                    background: "red",
                    fontSize: "15px",
                    outline: "none",
                    border: "none",
                    backgroundColor: "transparent",
                  }}
                >
                  Next&nbsp;
                  <FontAwesomeIcon icon={faArrowRightLong}></FontAwesomeIcon>
                </button>
              </div>
            </div>
          </>
        )}
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              style: {
                background: "green",
              },
            },
            error: {
              style: {
                background: "rgb(216, 67, 21)",
                color: "white",
              },
            },
          }}
        />
      </section>
    </>
  );
}