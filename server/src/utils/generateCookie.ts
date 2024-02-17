import { Response } from 'express';
import jwt from 'jsonwebtoken';

export const generateCookie = (res: Response, userId: String, email: String, name: String) => {
  if (process.env.JWT_SECRET) {
    const token = jwt.sign({ userId, email, name }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.cookie('auth', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
  }
};