import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as any,
    });

    res.status(201).json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as any,
    });

    res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
