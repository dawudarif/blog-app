import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ISingleBlogItem } from '../types/types';
import { Home } from 'lucide-react';

export default function BlogPage() {
  const [redirect, setRedirect] = useState(false);
  const [blog, setBlog] = useState<ISingleBlogItem | null>(null);

  const { id } = useParams();

  async function getPost() {
    const response = await axios.get('/blog/get/' + id, {
      withCredentials: true,
    });
    if (response.status === 200) {
      setBlog(response.data);
    } else {
      setRedirect(true);
    }
  }

  useEffect(() => {
    getPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (redirect) return <Navigate to='/' />;

  return (
    <div className='flex justify-center items-center bg-stone-50 py-6'>
      {blog && (
        <div className='w-[80%]'>
          <div className='flex items-center gap-4'>
            <Link to='/' className='hover:text-purple-600'>
              <Home size={22} />
            </Link>
            <span className='text-semibold'> / </span>
            <Link
              to={`/blog/${blog.id}`}
              className='hover:text-purple-600 text-semibold'
            >
              {blog.title}
            </Link>
          </div>
          <h1 className='text-[1.8rem] font-bold capitalize'>{blog.title}</h1>
          <h2 className='text-[1.4rem] italic font-base capitalize'>
            {blog.summary}
          </h2>
          <img
            src={blog.cover}
            alt={blog.title}
            className='h-50 w-full object-cover'
          />
          <div
            className='blog-content'
            dangerouslySetInnerHTML={{
              __html: blog?.content,
            }}
          />
        </div>
      )}
    </div>
  );
}
