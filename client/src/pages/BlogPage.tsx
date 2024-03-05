import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ISingleBlogItem } from '../types/types';
import { Home, Pencil, Trash2 } from 'lucide-react';
import 'highlight.js/styles/atom-one-dark.css';
import hljs from 'highlight.js';
import moment from 'moment';
import { Button } from '../components/ui/button';
import { UserContext } from '../context/userContext';

export default function BlogPage() {
  const [redirect, setRedirect] = useState(false);
  const [blog, setBlog] = useState<ISingleBlogItem | null>(null);

  const { userInfo } = useContext(UserContext) as any;
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

  useEffect(() => {
    // Apply syntax highlighting after content is loaded
    if (blog?.content) {
      document.querySelectorAll('.ql-syntax').forEach((block: any) => {
        hljs.highlightBlock(block);
      });
    }
  }, [blog?.content]);

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
          <div className='flex flex-col gap-4 py-4'>
            <div className='flex justify-between '>
              <span>
                <h1 className='text-[1.8rem] font-bold capitalize'>
                  {blog.title}
                </h1>
                <h2 className='text-[1.4rem] italic font-base capitalize'>
                  {blog.summary}
                </h2>
              </span>

              <span>
                <h3 className='capitalize text-base font-bold'>
                  {blog.account.name}
                </h3>
                <h3 className='italic text-base font-semibold'>
                  {moment(blog.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                </h3>
                {blog.account.id === userInfo.id && (
                  <span className='flex justify-between items-center w-full border h-auto'>
                    <Button className='border-2 border-slate-950 rounded-lg p-2 bg-inherit hover:text-white text-slate-950'>
                      <Pencil size={25} />
                    </Button>
                    <Button className='border-2 border-red-950 rounded-lg p-2 bg-inherit hover:text-white hover:bg-red-800 text-red-950'>
                      <Trash2 size={25} />
                    </Button>
                  </span>
                )}
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
        </div>
      )}
    </div>
  );
}
