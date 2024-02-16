import { Request, Response, request } from 'express';
import { prisma } from '../prisma/prisma';
import bcrypt from 'bcryptjs'
import { generateCookie } from '../utils/generateCookie';

export const getUserProfile = async (req: Request, res: Response) => {
  res.json('hi');
}

export const registerUser = async (req: Request, res: Response) => {
  console.log(req.body);
  const { email, name, password, confirmPassword } = req.body

  if (password !== confirmPassword) {
    res.status(500).json({ error: "passwords do not match" })
    return;
  }

  const userExists = await prisma.account.findUnique({
    where: {
      email: email
    }
  })

  if (userExists) {
    res.status(409).json({ error: 'User with this email already exists.' });
    return;
  }

  if (!email || !name || !password) {
    res.status(406).json({ error: 'Necessary fields not provided' });
    return;
  }


  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const createUser = await prisma.account.create({
    data: {
      email,
      name,
      password: hashedPassword,
    }
  })

  generateCookie(res, createUser.id, createUser.email)

  res.status(200).json({ createUser })
}
export const loginUser = async (req: Request, res: Response) => {

  res.json('hi');
}

export const logoutUser = async (req: Request, res: Response) => {
  res.json('hi');
}
