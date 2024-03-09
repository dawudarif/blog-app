import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ISingleBlogItem } from '../types/types';
import { Home, Pencil, Trash2, User } from 'lucide-react';
import 'highlight.js/styles/atom-one-dark.css';
import hljs from 'highlight.js';
import moment from 'moment';
import { UserContext } from '../context/userContext';
import BlogContentLoader from '../components/loaders/BlogContentLoader';

export default function BlogPage() {
  const [redirect, setRedirect] = useState(false);
  const [blog, setBlog] = useState<ISingleBlogItem | null>(null);
  const [loading, setLoading] = useState(false);

  const { userInfo } = useContext(UserContext) as any;
  const { id } = useParams();

  async function getPost() {
    try {
      setLoading(true);
      const response = await axios.get('/blog/get/' + id, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setBlog(response.data);
      } else {
        setRedirect(true);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    // Apply syntax highlighting after content is loaded
    if (blog?.content) {
      document.querySelectorAll('.ql-syntax').forEach((block: any) => {
        hljs.highlightBlock(block);
      });
    }
  }, [blog?.content]);

  if (redirect) return <Navigate to='/' />;

  if (loading) return <BlogContentLoader />;

  return (
    <div className='flex justify-center items-center bg-stone-50 py-6'>
      {blog && (
        <div className='w-[80%]'>
          <div className='flex items-center gap-4'>
            <Link to='/' className='hover:text-slate-900 hover:underline'>
              <Home size={22} />
            </Link>
            <span className='text-semibold'> / </span>
            <Link
              to={`/blog/${blog.id}`}
              className='hover:text-slate-900 hover:underline text-semibold'
            >
              {blog.title}
            </Link>
          </div>
          <span>
            <span className='flex justify-between items-center'>
              <h1 className='text-[1.8rem] font-bold capitalize'>
                {blog.title}
              </h1>
              {blog.account.id === userInfo.id && (
                <span className='flex justify-between items-center gap-4 h-auto'>
                  <Pencil size={15} />
                  <Trash2 size={15} />
                </span>
              )}
            </span>
            <h2 className='text-[1.4rem] italic font-base capitalize'>
              {blog.summary}
            </h2>
          </span>
          <div className='flex flex-col gap-4 py-2 border-t-2 border-b-2 border-slate-950 my-2'>
            <span className='flex justify-between items-center'>
              <div className='flex justify-center items-center font-bold gap-3'>
                <span className='rounded-full bg-slate-900 p-2'>
                  <User color='white' size={30} />
                </span>
                <h3 className='capitalize text-lg font-semibold'>
                  {blog.account.name}
                </h3>
              </div>
              <span>
                <h3 className='italic text-base font-semibold text-nowrap'>
                  {moment(blog.createdAt).format('MMMM Do, YYYY')}
                </h3>
              </span>
            </span>
          </div>
          <img
            src={blog.cover}
            alt={blog.title}
            className='h-[30rem] w-full object-contain'
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
