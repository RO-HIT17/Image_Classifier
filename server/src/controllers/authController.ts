import { Request, Response } from 'express';
import { UserModel ,IUser } from '../models/UserModel';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt';


export const registerUser = async (req: Request, res: Response) => {
    const { fullName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ fullName, email, password: hashedPassword });
    const existingUser: IUser | null = await UserModel.findOne({ email });
    if (existingUser) {
        res.status(400).json({ msg: 'Email already exists' });
        return;
    }
    
    await user.save();
    res.status(201).json({ success: true, data: user });
};
export const updateUser = async (req: Request, res: Response) => {
    try {
    const { userId, name, email, password } = req.body;
    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    if (name) {
        user.fullName = name;
      }
  
      if (email) {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser && existingUser._id.toString() !== userId) {
          res.status(400).send('Email is already taken');
          return;
        }
        user.email = email;
      }
  
      if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      }
  
    
      await user.save();
  
      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).send('Server error');
    }


};
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
        return;
    }
    
    const token = generateToken(user._id.toString());
    res.status(200).json({ success: true, token });
};
