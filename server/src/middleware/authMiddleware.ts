import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { prisma } from "../prisma/prisma";
import { JWTPayload } from "../types/types";

declare global {
  namespace Express {
    interface Request {
      user?:
        | {
            userId: string;
            name: string;
            email: string;
            exp: number;
            iat: number;
          }
        | any;
    }
  }
}

const protect = async (req: Request, res: Response, next: NextFunction) => {
  const { auth } = req.cookies;

  if (auth && process.env.JWT_SECRET) {
    try {
      if (process.env.JWT_SECRET && auth) {
        const userInfo = jwt.verify(auth, process.env.JWT_SECRET) as JWTPayload;

        if (!userInfo) {
          throw new Error();
        }

        const findUser = await prisma.account.findUnique({
          where: { email: userInfo.email, id: userInfo.userId },
          select: {
            id: true,
            name: true,
            email: true,
            updatedAt: true,
            createdAt: true,
          },
        });

        req.user = findUser;
        next();
      }
    } catch (error) {
      res.status(401);
      console.log(error);
      throw new Error("Not authorized, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

export { protect };
