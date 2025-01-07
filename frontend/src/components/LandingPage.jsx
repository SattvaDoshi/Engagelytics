import React from "react";
import { useNavigate } from "react-router-dom";
import { TrendingUp, Share2, PieChart, Zap, Target, MessageCircle } from "lucide-react";
import Navbar from "./Navbar";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation */}

      {/* Main Content with padding for fixed nav */}
      <div className="pt-16">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 lg:w-full">
              <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20">
                <div className="text-center">
                  <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                    <span className="block">Supercharge Your</span>
                    <span className="block text-purple-400">Social Media Growth</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
                    Transform your social media presence with AI-powered analytics and personalized growth strategies. Get real-time insights and actionable recommendations.
                  </p>
                  <div className="mt-5 sm:mt-8 flex justify-center gap-4">
                    <button
                      onClick={() => navigate("/chatbot")}
                      className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-300"
                    >
                      Start Analysis
                      <TrendingUp className="ml-2 h-5 w-5" />
                    </button>
                    <button
                      onClick={() => navigate("/demo")}
                      className="inline-flex items-center px-8 py-3 border border-purple-400 text-base font-medium rounded-full text-purple-400 hover:bg-purple-400/10 transition-colors duration-300"
                    >
                      Watch Demo
                      <Share2 className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Feature 1 */}
            <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-purple-500/10 hover:shadow-2xl transition-shadow duration-300 border border-gray-700">
              <div className="p-6">
                <div className="inline-flex items-center justify-center p-2 bg-purple-900/50 rounded-lg">
                  <PieChart className="h-6 w-6 text-purple-400" />
                </div>
                <h2 className="mt-4 text-xl font-semibold text-white">Deep Analytics</h2>
                <p className="mt-2 text-gray-300">
                  Get comprehensive insights into your engagement rates, audience demographics, and content performance metrics.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-purple-500/10 hover:shadow-2xl transition-shadow duration-300 border border-gray-700">
              <div className="p-6">
                <div className="inline-flex items-center justify-center p-2 bg-purple-900/50 rounded-lg">
                  <Zap className="h-6 w-6 text-purple-400" />
                </div>
                <h2 className="mt-4 text-xl font-semibold text-white">Smart Suggestions</h2>
                <p className="mt-2 text-gray-300">
                  Receive AI-powered recommendations for optimal posting times, content types, and engagement strategies.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-purple-500/10 hover:shadow-2xl transition-shadow duration-300 border border-gray-700">
              <div className="p-6">
                <div className="inline-flex items-center justify-center p-2 bg-purple-900/50 rounded-lg">
                  <Target className="h-6 w-6 text-purple-400" />
                </div>
                <h2 className="mt-4 text-xl font-semibold text-white">Growth Tracking</h2>
                <p className="mt-2 text-gray-300">
                  Monitor your growth metrics, reach expansion, and engagement improvements with detailed progress reports.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-purple-500/10 hover:shadow-2xl transition-shadow duration-300 border border-gray-700">
              <div className="p-6">
                <div className="inline-flex items-center justify-center p-2 bg-purple-900/50 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-purple-400" />
                </div>
                <h2 className="mt-4 text-xl font-semibold text-white">Real-Time Feedback</h2>
                <p className="mt-2 text-gray-300">
                  Receive real-time feedback on your social media content and interaction strategies to drive more engagement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
