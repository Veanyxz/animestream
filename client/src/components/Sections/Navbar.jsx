import "./Navbar.css";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/images/image.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import React, { useRef } from "react";

import { toast } from "react-toastify";
export default function Navbar() {
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIcon("nav__toggler");
          setActive("nav__menu");
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  const location = useLocation();
  const [input, setInput] = useState("");

  const navigate = useNavigate();
  const searchAnime = async () => {
    return fetch("https://consumet-api.herokuapp.com/meta/anilist/" + input)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        navigate("/search", {
          state: {
            finalResults: data.results,
            input: input,
          },
        });
      });
  };
  useEffect(() => {
    if (input !== "") {
      searchAnime();
    }
  }, [input]);

  const [value, setValue] = useState("");

  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else {
      setActive("nav__menu");
    }

    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };

  return (
    <nav className="nav" ref={wrapperRef}>
      <div className="nav-side-div">
        <div
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
            window.location.reload();
          }}
          style={{
            cursor: "pointer",
            gap: 10,
            display: "flex",
            alignItems: "center",
            color: "white",
            justifyContent: "center",
          }}
        >
          <img
            height="34"
            src={logo}
            style={{ color: "white", padding: 0 }}
            alt=""
          />

          <h3 className="brand-title">Animebliss</h3>
        </div>
        <FontAwesomeIcon
          className="magnify-icon"
          icon={faMagnifyingGlass}
          style={{ color: "white", fontSize: 25 }}
        ></FontAwesomeIcon>

        <input
          onInput={(e) => {
            setValue(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setInput(e.target.value);
            }
          }}
          placeholder="Search for anime"
          className="searchbar"
          type="text"
          value={value}
        ></input>
        <ul className={active}>
          <li className="nav__item">
            <span
              onClick={(e) => {
                e.preventDefault();
                if (location.pathname !== "/") {
                  navigate("/");
                } else document.querySelector("#popular").scrollIntoView();
              }}
              className="nav__link"
            >
              Popular
            </span>
          </li>
          <li
            onClick={(e) => {
              e.preventDefault();
              navigate("/movies");
            }}
            className="nav__item"
          >
            <span className="nav__link">Top Movies</span>
          </li>
          <li
            onClick={(e) => {
              e.preventDefault();
              navigate("/recentep");
            }}
            className="nav__item"
          >
            <span className="nav__link">Recent Ep</span>
          </li>
          <li
            onClick={(e) => {
              e.preventDefault();
              navigate("/random");
            }}
            className="nav__item"
          >
            <span className="nav__link">Random</span>
          </li>
          <li
            onClick={(e) => {
              e.preventDefault();
              navigate("/genres");
            }}
            className="nav__item"
          >
            <span className="nav__link">Filter</span>
          </li>
<div className="auth">
          <li
            onClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
            className="nav__item nav__item-login"
          >
            <span className="nav__link">Login</span>
          </li>
          <li
            onClick={(e) => {
              e.preventDefault();
              navigate("/signup");
            }}
            className="nav__item "
          >
            <span className="nav__link">Signup</span>
          </li>
          </div>
        </ul>
      </div>
      {/* <div className="auth">
        <button>Login</button>
        <button>Signup</button>
      </div> */}
      <div onClick={navToggle} className={icon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}
