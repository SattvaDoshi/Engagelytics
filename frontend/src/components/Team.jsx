import React from "react";
import { 
  Menu,
  X,
  Github,
  Linkedin,
  Twitter
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const TeamPage = () => {
    const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "Lead Data Scientist",
      description: "Expert in machine learning and AI with 8+ years of experience in social media analytics. Previously led data science teams at major tech companies and contributed to breakthrough research in engagement prediction models.",
      image: "/api/placeholder/400/400",
    },
    {
      name: "Marcus Rodriguez",
      role: "Full Stack Developer",
      description: "Full stack developer specialized in React and Node.js. Created multiple successful social media management platforms and brings expertise in building scalable analytics dashboards.",
      image: "/api/placeholder/400/400",
    },
    {
      name: "Aisha Patel",
      role: "UI/UX Designer",
      description: "Award-winning designer with a passion for creating intuitive user experiences. Has designed interfaces for several popular social media tools and believes in user-centered design approaches.",
      image: "/api/placeholder/400/400",
    },
    {
      name: "David Kim",
      role: "Product Manager",
      description: "Strategic product leader with background in social media marketing. Previously managed product teams at leading social platforms and understands the challenges of modern social media growth.",
      image: "/api/placeholder/400/400",
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">

      {/* Team Section */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Meet Our Team</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We're a diverse group of experts passionate about helping businesses grow their social media presence through data-driven insights and AI-powered strategies.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-700"
            >
              <div className="aspect-square mb-6 overflow-hidden rounded-xl">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
              <p className="text-purple-400 mb-3">{member.role}</p>
              <p className="text-gray-400 mb-4 text-sm">{member.description}</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;