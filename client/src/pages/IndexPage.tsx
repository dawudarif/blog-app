import axios from 'axios';
import { useEffect, useState } from 'react';
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
    <div className='flex items-center w-full'>
      <div className='w-[80%]'>
        {data &&
          data.map((item: IBlogItem) => (
            <div>
              <img src={item.cover} alt={item.title} />
              <h1>{item.title}</h1>
              <h2>{item.account.name}</h2>
              <h4>{item.createdAt}</h4>
            </div>
          ))}
      </div>
    </div>
  );
}
