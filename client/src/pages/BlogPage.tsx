import axios from 'axios';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import { Home, Trash2, User } from 'lucide-react';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import BlogContentLoader from '../components/loaders/BlogContentLoader';
import RingLoader from '../components/loaders/ring';
import { useToast } from '../components/ui/use-toast';
import { UserContext } from '../context/userContext';
import { ISingleBlogItem } from '../types/types';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../components/ui/popover';
import { Button } from '../components/ui/button';

export default function BlogPage() {
  const [redirect, setRedirect] = useState(false);
  const [blog, setBlog] = useState<ISingleBlogItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const { toast } = useToast();

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

  async function deletePost() {
    try {
      setDeleteLoading(true);
      const response = await axios.get('/blog/delete/' + id, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setRedirect(true);
      } else {
        throw new Error();
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.response.data.error,
      });
    } finally {
      setDeleteLoading(false);
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
    <div className='flex justify-center items-center bg-stone-50 py-6 px-0'>
      {blog && (
        <div className='w-[80%]'>
          <div className='flex items-center gap-4'>
            <Link to='/' className='hover:text-slate-900 hover:underline'>
              <Home size={22} />
            </Link>
            <span className='text-semibold'> / </span>
            <Link
              to={`/blog/${blog.id}`}
              className='hover:text-slate-900 font-semibold hover:underline text-semibold'
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
                <>
                  {deleteLoading ? (
                    <span className='text-slate-950 p-4 rounded-lg cursor-pointer'>
                      <RingLoader size={20} stroke={4} />
                    </span>
                  ) : (
                    <Popover>
                      <PopoverTrigger className='hover:bg-slate-950 hover:text-white text-slate-950 p-4 rounded-lg cursor-pointer '>
                        <Trash2 size={15} />
                      </PopoverTrigger>
                      <PopoverContent className='flex flex-col gap-2'>
                        <p className='text-base font-semibold'>
                          Are you sure you want to delete this blog post?
                        </p>
                        <Button
                          onClick={() => deletePost()}
                          className='bg-slate-950 rounded-lg'
                        >
                          <>
                            {deleteLoading ? (
                              <RingLoader size={20} stroke={4} />
                            ) : (
                              <>Delete</>
                            )}
                          </>
                        </Button>
                      </PopoverContent>
                    </Popover>
                  )}
                </>
              )}
            </span>
            <h2 className='text-[1.4rem] italic font-base capitalize'>
              {blog.summary}
            </h2>
          </span>
          <div className='flex flex-col gap-4 py-4 border-t-2 border-b-2 border-slate-950 my-8'>
            <span className='flex justify-between items-center sm:flex-col sm:items-start sm:gap-4 xs:flex-col xs:items-start xs:gap-4'>
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
                  Published: {moment(blog.createdAt).format('MMMM Do, YYYY')}
                </h3>
              </span>
            </span>
          </div>
          <img
            src={blog.cover}
            alt={blog.title}
            className='h-[30rem] w-full object-contain my-8 xs:my-4 sm:my-4 sm:h-auto xs:h-auto'
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
