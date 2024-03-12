import { Request, Response } from 'express';
import { cloudinary } from '../utils/cloudinary';
import { prisma } from '../prisma/prisma';


const getBlogs = async (req: Request, res: Response) => {
  const { page, perPage = 12 } = req.query;

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

  const postCount = await prisma.post.count()

  const pages = Math.ceil(postCount / Number(perPage))

  res.status(200).json({ pages, posts, resultsFor: page })
}

const getSingleBlog = async (req: Request, res: Response) => {
  const { id } = req.params

  const getPost = await prisma.post.findUnique({
    where: { id }, include: {
      account: {
        select: {
          id: true, name: true
        }
      }
    }
  })

  res.status(200).json(getPost)
}

const createBlog = async (req: Request, res: Response) => {
  const { title, summary, content } = req.body
  const file = req.file

  const mimeType = file?.mimetype.split('/')[0] === 'image' ? true : false

  if (!mimeType) {
    res.status(406).json({ error: 'Invalid cover image' });
    return;
  }


  if (!file || !title || !content) {
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
  const uploadCoverPublicId = uploadCover.public_id

  const createBlog = await prisma.post.create({
    data: {
      title,
      summary,
      content,
      cover: coverImageUrl,
      coverPublicId: uploadCoverPublicId,
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

const searchBlogs = async (req: Request, res: Response) => {
  const { search } = req.params;

  if (!search) {
    return res.status(400).json({ error: 'Missing search term' });
  }

  try {
    const searchData = await prisma.post.findMany({
      where: {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { content: { contains: search, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true, title: true, summary: true, cover: true, createdAt: true, updatedAt: true, account: {
          select: {
            id: true,
            name: true
          }
        }
      },
    });

    res.status(200).json(searchData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



const deleteBlog = async (req: Request, res: Response) => {
  const { id } = req.params

  const isAuthor = await prisma.post.findUnique({ where: { id, accountId: req.user.id } })

  if (!isAuthor) {
    res.status(401).json({ error: 'Authentication error' })
    return;
  }

  const deleteImage = await cloudinary.uploader.destroy(isAuthor.coverPublicId)
  const deletePost = await prisma.post.delete({ where: { id } })


  if (deletePost && deleteImage) {
    res.status(200).json({ delete: true })
  }
}



export { createBlog, searchBlogs, getBlogs, getSingleBlog, deleteBlog }
