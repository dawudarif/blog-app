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

export default function IndexPage() {
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState<null | number>(null);
  const [data, setData] = useState<IBlogItem[]>([]);

  async function getBlogPosts(input?: any) {
    let page = 1;

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

    console.log(page);
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
    <div className='w-full flex flex-col justify-center items-center'>
      <div className='flex flex-col justify-center items-center w-[80%] p-4 gap-4'>
        {data.map((item: IBlogItem) => (
          <BlogSlide key={item.id} item={item} />
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem
            className='cursor-pointer'
            onClick={() => getBlogPosts(-1)}
          >
            <PaginationPrevious />
          </PaginationItem>
          <PaginationItem className='cursor-pointer'>
            <PaginationLink>{pageNo}</PaginationLink>
          </PaginationItem>
          <PaginationItem
            className='cursor-pointer'
            onClick={() => getBlogPosts('last')}
          >
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className='cursor-pointer'
              onClick={() => getBlogPosts(1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
