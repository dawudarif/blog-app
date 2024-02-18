import { Request, Response, request } from 'express';
import { prisma } from '../prisma/prisma';
import bcrypt from 'bcryptjs'
import { generateCookie } from '../utils/generateCookie';
import jwt from 'jsonwebtoken'
import { JWTPayload } from '../types/types';

export const getUserProfile = async (req: Request, res: Response) => {
  const { auth } = req.cookies

  if (process.env.JWT_SECRET && auth) {

    const userInfo = jwt.verify(auth, process.env.JWT_SECRET) as JWTPayload


    if (userInfo) {
      const getUser = await prisma.account.findUnique({ where: { email: userInfo.email, id: userInfo.userId } })

      res.json({
        userInfo: {
          id: getUser?.id,
          name: getUser?.name,
          email: getUser?.email
        }
      })
    }
  }

}

export const registerUser = async (req: Request, res: Response) => {
  const { email, name, password, confirmPassword } = req.body

  if (password !== confirmPassword) {
    res.status(422).json({ error: "Passwords do not match" })
    return;
  }

  const userExists = await prisma.account.findUnique({
    where: {
      email: email
    }
  })

  if (userExists) {
    res.status(500).json({ error: 'User with this email already exists.' });
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

  generateCookie(res, createUser.id, createUser.email, createUser.name)

  res.status(201).json({ createUser })
}

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body


  if (!email || !password) {
    res.status(406).json({ error: 'Necessary fields not provided' });
    return;
  }

  const getUser = await prisma.account.findUnique({ where: { email } })

  if (!getUser) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const comparePassword = await bcrypt.compare(password, getUser?.password)

  if (!comparePassword) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  generateCookie(res, getUser.id, getUser.email, getUser.name)

  res.status(200).json({
    id: getUser.id,
    name: getUser.name,
    email: getUser.email
  })
}


export const logoutUser = async (req: Request, res: Response) => {
  const user = req.user

  if (!user) {
    res
      .status(401)
      .json({ error: 'Something went wrong please try again later.' });
    return;
  }

  res.cookie('auth', '', {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'User Logged Out' });
}
