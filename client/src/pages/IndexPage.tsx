import axios from 'axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import BlogSlide from '../components/index/BlogSlide';
import BlogSlideLoader from '../components/loaders/BlogSlideLoader';
import { Button } from '../components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '../components/ui/pagination';
import { IBlogItem } from '../types/types';

export default function IndexPage() {
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState<null | number>(null);
  const [data, setData] = useState<IBlogItem[]>([]);
  const [loading, setLoading] = useState(false);

  async function getBlogPosts(input?: any) {
    setLoading(true);

    try {
      let page = 1;

      if (totalPages === page) return;

      if (totalPages) {
        if (input === 1) {
          page = pageNo + 1;
        } else if (input === -1) {
          page = pageNo - 1;
        } else if (input === 'last') {
          page = totalPages;
        }
      } else {
        page = pageNo;
      }

      setPageNo(page);

      const response = await axios.get(`/blog/get`, {
        params: { page },
        withCredentials: true,
      });
      setData(response.data.posts);
      setTotalPages(response.data.pages);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getBlogPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='w-full flex flex-col justify-stretch items-center min-h-[80vh]'>
      <div className='grid grid-flow-row grid-cols-2 xs:grid-cols-1 justify-center items-center w-[80%] md:w-[90%] sm:w-[90%] xs:w-full xs:p-2 md:p-2 p-4 gap-4'>
        {loading ? (
          <>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i: number) => (
              <BlogSlideLoader key={i} />
            ))}
          </>
        ) : (
          <>
            {data.map((item: IBlogItem) => (
              <BlogSlide key={item.id} item={item} />
            ))}
          </>
        )}
      </div>
      <Pagination className='py-4 flex items-center justify-center'>
        <PaginationContent>
          <PaginationItem className='cursor-pointer text-lg sm:text-base xs:text-base'>
            <Button disabled={pageNo === 1} onClick={() => getBlogPosts(-1)}>
              <ChevronLeft size={20} />
            </Button>
          </PaginationItem>
          <PaginationItem className='cursor-pointer'>
            <PaginationLink className='text-xl sm:text-base xs:text-base underline'>
              {pageNo}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem onClick={() => getBlogPosts('last')}>
            <PaginationEllipsis className='cursor-pointer text-xl' />
          </PaginationItem>
          <PaginationItem className='cursor-pointer text-lg sm:text-base xs:text-base'>
            <Button
              disabled={pageNo === totalPages}
              onClick={() => getBlogPosts(1)}
            >
              <ChevronRight size={20} />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
