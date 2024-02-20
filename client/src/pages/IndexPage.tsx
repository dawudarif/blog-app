import axios from 'axios';
import { useEffect, useState } from 'react';
import BlogSlide from '../components/index/BlogSlide';
import { IBlogItem } from '../types/types';

export default function IndexPage() {
  const [pageNo, setPageNo] = useState(1);
  const [data, setData] = useState<IBlogItem[]>([]);

  async function getBlogPosts() {
    const response = await axios.get(`/blog/get?page${pageNo}`, {
      withCredentials: true,
    });
    setData(response.data);
  }

  useEffect(() => {
    getBlogPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNo]);

  return (
    <div className='w-full flex justify-center'>
      <div className='flex flex-col justify-center w-[80%] p-4 gap-4'>
        {data.map((item: IBlogItem) => (
          <BlogSlide key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
