import React from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/landing.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <header className="main-header">
        <h1>Welcome to Our Chatbot</h1>
        <p>
          Discover insights like never before with our AI-powered chatbot, analyzing social media performance to deliver actionable recommendations.
        </p>
      </header>

      <button onClick={() => navigate("/chatbot")} className="start-button">
        Start ChatBot
      </button>

      <div className="cards-container">
        <div className="card">
          <h2>Features</h2>
          <p>Analyze engagement data, compare post types, and generate data-driven insights using GPT models.</p>
        </div>
        <div className="card">
          <h2>About the Project</h2>
          <p>
            Social Media Performance Analysis is a hackathon project that provides analytics for synthetic engagement data to help marketers optimize strategies.
          </p>
        </div>
        <div className="card">
          <h2>How It Works</h2>
          <p>
            We use Astra DB for data storage, query the dataset for metrics, and employ GPT models via Langflow for intelligent insights.
          </p>
        </div>
        <div className="card">
          <h2>Meet the Team</h2>
          <p>
            Our team consists of passionate developers, data analysts, and AI enthusiasts dedicated to bringing this project to life.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;