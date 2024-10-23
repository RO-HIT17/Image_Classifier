import React, { useState } from 'react';
import { Button } from './Button'; 
import { Input } from './Input'; 
import { Label } from './Label'; 
import axios from 'axios';

const SettingsMainContent = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('id');

    try {
      const response = await axios.put('http://localhost:5000/api/auth/update', 
        { ...profile, userId },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      console.log('Updated Profile: ', response.data);
    } catch (error) {
      console.error('Error updating profile: ', error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg max-w-4xl">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Profile Information</h3>

          <div className="mb-4">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2"
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2"
            />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Change Password</h3>

          <div className="mb-4">
            <Label htmlFor="password">New Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={profile.password}
              onChange={handleInputChange}
              placeholder="Enter a new password"
              className="w-full px-4 py-2"
            />
          </div>
        </div>

        <Button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Save Changes
        </Button>
      </form>
      
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
        <Button variant="outline" className="w-full py-2 text-red-600 border-red-600 hover:bg-red-100">
          Deactivate Account
        </Button>
      </div>
    </div>
  );
};

export default SettingsMainContent;
