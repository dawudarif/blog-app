import axios from 'axios';
import { useEffect, useState } from 'react';
import BlogSlide from '../components/index/BlogSlide';
import { IBlogItem } from '../types/types';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../components/ui/pagination';
import { Button } from '../components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function IndexPage() {
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState<null | number>(null);
  const [data, setData] = useState<IBlogItem[]>([]);

  async function getBlogPosts(input?: any) {
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
  }

  useEffect(() => {
    getBlogPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='w-full flex flex-col justify-center items-center min-h-full'>
      <div className='grid grid-flow-row grid-cols-2 justify-center items-center w-[80%] p-4 gap-4'>
        {data.map((item: IBlogItem) => (
          <BlogSlide key={item.id} item={item} />
        ))}
      </div>
      <Pagination className='py-4 flex items-center justify-center'>
        <PaginationContent>
          <PaginationItem className='cursor-pointer'>
            <Button disabled={pageNo === 1} onClick={() => getBlogPosts(-1)}>
              <ChevronLeft size={30} />
            </Button>
          </PaginationItem>
          <PaginationItem className='cursor-pointer'>
            <PaginationLink className='text-xl underline'>
              {pageNo}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem onClick={() => getBlogPosts('last')}>
            <PaginationEllipsis className='cursor-pointer text-xl' />
          </PaginationItem>
          <PaginationItem className='cursor-pointer text-lg'>
            <Button
              disabled={pageNo === totalPages}
              onClick={() => getBlogPosts(1)}
            >
              <ChevronRight size={25} />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
