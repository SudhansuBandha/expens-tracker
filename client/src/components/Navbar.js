import React from "react";
import { Link } from "react-router-dom";
import { FaGlobeAsia, FaBars, FaTimes } from "react-icons/fa";
import { AiFillPlusSquare } from "react-icons/ai";
import styled from "styled-components";
import AddAccount from "./Modals/AddAccount";
import { useGlobalContext } from "../context/context";

function Navbar() {
  //const [isOpen, setIsOpen] = useState(false);
  const { isSidebarOpen, handleSidebar, isModalOpen, openModal } =
    useGlobalContext();
  return (
    <NavContainer>
      <div className="nav-center">
        {/**/}
        <div className="nav-sidebar" onClick={handleSidebar}>
          {isSidebarOpen ? (
            <h2>
              <FaTimes />
            </h2>
          ) : (
            <h2>
              <FaBars />
            </h2>
          )}
        </div>
        <div className="nav-header">
          <Link to="/">
            <h3 style={{ marginRight: "5px", marginTop: "2px" }}>
              <FaGlobeAsia />
            </h3>
            <h3>expense manager</h3>
          </Link>
        </div>
        <div className="nav-modal" onClick={openModal}>
          <p style={{ fontWeight: "bold", marginRight: "2px" }}>add account</p>
          <span style={{ fontSize: "1.2rem" }}>
            <AiFillPlusSquare />
          </span>
        </div>
        <div className="nav-modal-btn" onClick={openModal}>
          <h1>
            <AiFillPlusSquare />
          </h1>
        </div>
        {isModalOpen && <AddAccount />}
      </div>
    </NavContainer>
  );
}
const NavContainer = styled.nav`
  height: 3rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--clr-green-3);
  z-index: 999;

  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: 1400px;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    @media screen and (max-width:450px){
      width:100vw
    }
  }
  .nav-header {
    /*display: flex;
    align-items: center;
    justify-content: space-between;*/
    margin: auto;
    a {
      display: flex;
      width: 350px;
      margin-left: 200px;
      margin-top: 10px;
      text-decoration: none;
      color: var(--clr-white);

      @media screen and (max-width: 900px) {
        margin-left: 0px;
      }
      @media screen and (max-width: 450px) {
        width: 250px;
        margin-left: 10px;
      }
    }
    h3 {
      font-size: 2rem;
    }
    @media screen and (max-width: 450px) {
      h3{
        font-size: 1.35rem;
      }
    }
  }
  .nav-sidebar {
    margin-top: 20px;
  }
  .nav-modal {
    display: none;
  }
  .nav-modal-btn {
    color: var(--clr-blue-1);
    background-color: var(--clr-white);
    height: 42px;
    font-size:3rem;    
  }
  .nav-modal:hover,
  .nav-modal-btn:hover,
  .nav-sidebar {
    cursor: pointer;
  }
 

  @media (min-width: 900px) {
    .nav-center {
      grid-template-columns: 1fr auto;
    }
    .nav-sidebar {
      display: none;
    }
    .nav-modal {
      display: flex;
      justify-content: center;
      width: 155px;
      background-color: var(--clr-white);
      color: var(--clr-blue-1);
      text-transform: uppercase;
      height: 25px;
      border-radius: 3px;
    }
    .nav-modal-btn {
      display: none;
    }
  }

  }
`;

export default Navbar;
