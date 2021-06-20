import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaLandmark, FaLaptopCode, FaListAlt } from "react-icons/fa";
import styled from "styled-components";
import { useGlobalContext } from "../context/context";

const Sidebar = () => {
  const [display, setDisplay] = useState(true);
  const { isSidebarOpen, handleSidebar } = useGlobalContext();
  const [value, setValue] = useState(0);
  /*  const showDisplay = () => {
    /*if (window.innerWidth <= 800) {
      setDisplay(false);
    } else {
      setDisplay(true);
    }
    console.log(window.innerWidth);
    if (window.innerWidth <= 900) {
      if (isSidebarOpen) {
        setDisplay(true);
      } else {
        setDisplay(false);
      }
    } else {
      setDisplay(true);
    }

    if (window.innerWidth <= 900) {
      if (isSidebarOpen) {
        console.log("x");
        setDisplay(true);
      } else {
        console.log("y");
        setDisplay(false);
      }
    } else {
      if (!isSidebarOpen) {
        console.log("z");
        setDisplay(false);
      }
    }
  };

  useEffect(() => {
    showDisplay();
  }, [isSidebarOpen]); */

  //window.addEventListener("resize", showDisplay);
  return (
    <LuckyContainer>
      <div className={`${isSidebarOpen ? "show-sidebar" : "sidebar"}`}>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link
              className="nav-links"
              to="/"
              id="links"
              onClick={handleSidebar}
            >
              <span className="icons">
                <FaListAlt />
              </span>{" "}
              dashboard
            </Link>
          </li>
          <hr></hr>
          <li className="nav-item">
            <Link
              to="/reports"
              className="nav-links"
              id="links"
              onClick={handleSidebar}
            >
              <span className="icons">
                <FaLaptopCode />
              </span>{" "}
              reports
            </Link>
          </li>
          <hr></hr>
          <li className="nav-item">
            <Link
              to="/accounts"
              className="nav-links"
              id="links"
              onClick={handleSidebar}
            >
              <span className="icons">
                <FaLandmark />
              </span>{" "}
              accounts
            </Link>
          </li>
          <hr></hr>
        </ul>
      </div>
    </LuckyContainer>
  );
};

const LuckyContainer = styled.aside`
  .sidebar {
    width: 250px;
    background-color: var(--clr-white);
    height: 100vh;
    position: relative;
    color: #eb4034;
    opacity: 1;
    transition: all 0.3s linear;
    @media screen and (max-width: 900px) {
      display: none;
    }
  }
  .show-sidebar {
    width: 250px;
    background-color: var(--clr-white);
    height: 100vh;
    position: relative;
    color: #eb4034;
    opacity: 1;
    transition: all 0.3s linear;
  }
  .nav-menu {
    display: flex;
    flex-direction: column;
    width: 100%;
    list-style: none;
    padding-top: 50px;
  }

  .nav-item {
    height: 70px;
    list-style: none;
    width: 100%;
    padding-top: 10px;
  }
  .nav-links {
    padding-left: 30px;
    text-decoration: none;
    font-size: 1.7rem;
    text-transform: capitalize;
    color: var(--clr-grey-4);
  }

  .nav-links:hover {
    color: var(--clr-green-2);
  }
  .active {
    color: var(--clr-green-3);
  }
  .icons {
    font-size: 1.2rem;
  }
`;
export default Sidebar;
