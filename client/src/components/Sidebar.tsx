
import { Button } from "./Button"; 
import { FaHome, FaCog, FaImage, FaBrain, FaSignOutAlt,FaHistory } from "react-icons/fa"; 
import { useNavigate } from 'react-router-dom';

export const Sidebar = () => {

  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    navigate('/');
  };

  return (
    <aside className="h-screen w-64 bg-white text-blue-900 shadow-lg border-r border-blue-200">
      <nav className="p-6">
        <h2 className="text-lg font-semibold mb-6 text-blue-900">Image Analyser</h2>
        <ul>
          <li className="mb-4">
            <Button
              variant="link"
              asChild
              className="flex items-center space-x-2 p-2 rounded-md text-blue-900 hover:bg-blue-100 transition-colors"
            >
              <a href="/dashboard" className="flex items-center">
                <FaHome className="w-5 h-5" />
                <span className="text-md">Dashboard</span>
              </a>
            </Button>
          </li>
          <li className="mb-4">
            <Button
              variant="link"
              asChild
              className="flex items-center space-x-2 p-2 rounded-md text-blue-900 hover:bg-blue-100 transition-colors"
            >
              <a href="/image-classifier" className="flex items-center">
                <FaImage className="w-5 h-5" />
                <span className="text-md">Image Classifier</span>
              </a>
            </Button>
          </li>
          <li className="mb-4">
            <Button
              variant="link"
              asChild
              className="flex items-center space-x-2 p-2 rounded-md text-blue-900 hover:bg-blue-100 transition-colors"
            >
              <a href="/image-recognizer" className="flex items-center">
                <FaBrain className="w-5 h-5" />
                <span className="text-md">Image Recognizer</span>
              </a>
            </Button>
          </li>
          <li className="mb-4">
            <Button
              variant="link"
              asChild
              className="flex items-center space-x-2 p-2 rounded-md text-blue-900 hover:bg-blue-100 transition-colors"
            >
              <a href="/settings" className="flex items-center">
                <FaCog className="w-5 h-5" />
                <span className="text-md">Settings</span>
              </a>
            </Button>
          </li>
          <li className="mb-4">
            <Button
              variant="link"
              asChild
              className="flex items-center space-x-2 p-2 rounded-md text-blue-900 hover:bg-blue-100 transition-colors"
              onClick={handleLogout} 
            >
              <span className="flex items-center">
                <FaSignOutAlt className="w-5 h-5" />
                <span className="text-md">Logout</span>
              </span>
            </Button>
          </li>
          <li className="mb-4">
            <Button
              variant="link"
              asChild
              className="flex items-center space-x-2 p-2 rounded-md text-blue-900 hover:bg-blue-100 transition-colors"
            >
              <a href="/history" className="flex items-center">
                <FaHistory className="w-5 h-5" />
                <span className="text-md">History</span>
              </a>
            </Button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
