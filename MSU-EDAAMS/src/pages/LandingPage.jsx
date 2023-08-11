import React from "react";
import { useNavigate } from "react-router-dom";
import "./CSS Files/LandingPage.css";
import cicslogo from "../pages/images/CICS Logo.png";
import msulogo from "../pages/images/msulogo.png";
import asset1 from "../pages/images/asset1.jpg";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div>
      <div class="container"></div>
      <div className="background-images">
        <img className="asset1" src={asset1} alter="image1" />
      </div>
      <nav className="navbar">
        <div className="logos">
          <img src={cicslogo} alt="logo" />
          <img src={msulogo} alt="logo" />
        </div>
        <div className="menu-items">
          <a href="#about-us">About Us</a>
          <a href="#mission-vision">Mission & Vision</a>
          <a href="#address">Address</a>
          <a href="#contact">Contact Number</a>
        </div>
      </nav>
      <div className="landing-container">
        <div className="landing-text-content">
          <h1 className="typewriter">MSU - EDAAMS</h1>
          <div className="landing-page-content">
            <p>
              An electronic document approval and archive management system is a
              software solution designed to streamline the process of approving
              and managing documents in digital format. It eliminates the need
              for manual paper-based approvals and offers a secure and efficient
              way to handle documents.
            </p>
          </div>
          <div className="get-started-btn">
            <button className="continue-application" onClick={handleGetStarted}>
              GET STARTED
              <div>
                <div class="pencil"></div>
                <div class="folder">
                  <div class="top">
                    <svg viewBox="0 0 24 27">
                      <path d="M1,0 L23,0 C23.5522847,-1.01453063e-16 24,0.44771525 24,1  L24,8.17157288 C24,8.70200585 23.7892863,9.21071368 23.4142136,9.58578644 L20.5857864,12.4142136 C20.2107137,12.7892863 20,13.2979941 20,13.8284271 L20,26 C20,26.5522847 19.5522847,27 19,27 L1,27 C0.44771525,27 6.76353751e-17,26.5522847 0,26 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z"></path>
                    </svg>
                  </div>
                  <div class="paper"></div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
