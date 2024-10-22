import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/Tabs';
import { Button } from '../components/Button';
import { FaGoogle, FaGithub, FaLinkedin } from 'react-icons/fa';


interface AuthResponse {
  token: string;
  id:string;
}

export const LoginPage = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailSignup, setEmailSignup] = useState('');
  const [passwordSignup, setPasswordSignup] = useState('');
  const [fullName, setName] = useState('');
  const navigate = useNavigate();
  

  const handleTabChange = (tab: 'login' | 'signup') => {
    setActiveTab(tab);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = axios.post<AuthResponse>('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', (await response).data.token);
      localStorage.setItem('id', (await response).data.id);
      navigate('/dashboard');
    } 
    catch (error) {
      console.error('Login failed:', error);
    }
  };
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post<AuthResponse>('http://localhost:5000/api/auth/register', { fullName, email: emailSignup, password: passwordSignup });
      
      const loginResponse = await axios.post<AuthResponse>('http://localhost:5000/api/auth/login', { email: emailSignup, password: passwordSignup });
      
      localStorage.setItem('token', loginResponse.data.token);
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <Tabs defaultValue={activeTab}>
          <TabsList className="flex justify-center mb-4">
            <TabsTrigger
              value="login"
              className={`w-full p-2 ${activeTab === 'login' ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}
              onClick={() => handleTabChange('login')}
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className={`w-full p-2 ${activeTab === 'signup' ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}
              onClick={() => handleTabChange('signup')}
            >
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="p-4">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md shadow hover:bg-blue-700 transition-colors">
                Login
              </Button>
            </form>

            <div className="my-4 text-center text-gray-500">or</div>

            <div className="flex flex-col space-y-3">
              <Button className="flex items-center justify-center bg-gray-100 text-gray-700 hover:bg-gray-200 py-2 rounded-md shadow">
                <FaGithub className="mr-2" /> Continue with GitHub
              </Button>
              <Button className="flex items-center justify-center bg-gray-100 text-gray-700 hover:bg-gray-200 py-2 rounded-md shadow">
                <FaGoogle className="mr-2" /> Continue with Google
              </Button>
              <Button className="flex items-center justify-center bg-gray-100 text-gray-700 hover:bg-gray-200 py-2 rounded-md shadow">
                <FaLinkedin className="mr-2" /> Continue with LinkedIn
              </Button>
            </div>
          </TabsContent>

          
          <TabsContent value="signup" className="p-4">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Sign Up</h2>
            <form onSubmit={handleSignup}>
              <div className="mb-4">
                <label htmlFor="signup-name" className="block text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="signup-name"
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={fullName}
                  onChange={(e) => setName(e.target.value)} 
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="signup-email" className="block text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="signup-email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={emailSignup}
                  onChange={(e) => setEmailSignup(e.target.value)} 
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="signup-password" className="block text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="signup-password"
                  placeholder="Create a password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={passwordSignup}
                  onChange={(e) => setPasswordSignup(e.target.value)} 
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md shadow hover:bg-blue-700 transition-colors">
                Sign Up
              </Button>
            </form>

            <div className="my-4 text-center text-gray-500">or</div>

            <div className="flex flex-col space-y-3">
              <Button className="flex items-center justify-center bg-gray-100 text-gray-700 hover:bg-gray-200 py-2 rounded-md shadow">
                <FaGithub className="mr-2" /> Continue with GitHub
              </Button>
              <Button className="flex items-center justify-center bg-gray-100 text-gray-700 hover:bg-gray-200 py-2 rounded-md shadow">
                <FaGoogle className="mr-2" /> Continue with Google
              </Button>
              <Button className="flex items-center justify-center bg-gray-100 text-gray-700 hover:bg-gray-200 py-2 rounded-md shadow">
                <FaLinkedin className="mr-2" /> Continue with LinkedIn
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoginPage;
