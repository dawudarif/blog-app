import { Request, Response } from 'express';
import { cloudinary } from '../utils/cloudinary';
import { prisma } from '../prisma/prisma';
import { ICreateBlogInput } from '../types/types';


const getBlogs = async (req: Request, res: Response) => {
  const { page = 1, perPage = 6 } = req.params;

  const offset = (Number(page) - 1) * Number(perPage);
  const posts = await prisma.post.findMany({
    select: {
      id: true, title: true, summary: true, cover: true, createdAt: true, updatedAt: true, account: {
        select: {
          id: true,
          name: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc',
    },
    skip: (offset),
    take: Number(perPage)
  },);


  res.status(200).json(posts)
}


const createBlog = async (req: Request, res: Response) => {
  const { title, summary, content } = req.body as ICreateBlogInput
  const file = req.file

  if (!file || !title || !summary || !content) {
    res.status(406).json({ error: 'Necessary fields not provided' });
    return;
  }

  const uploadCover = await cloudinary.uploader.upload(file.path, async function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: 'There was an error creating blog post.',
      });
    }

    return result
  });

  const coverImageUrl = uploadCover.url

  const createBlog = await prisma.post.create({
    data: {
      title,
      summary,
      content,
      cover: coverImageUrl,
      accountId: req.user.id
    }, include: {
      account: {
        select: {
          id: true, name: true, email: true
        }
      }
    }
  })

  res.status(201).json({ createBlog })
}

const updateBlog = async (req: Request, res: Response) => { }



export { createBlog, updateBlog, getBlogs }
