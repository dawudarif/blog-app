import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import axios from 'axios';
import { ISingleBlogItem } from '../types/types';
import BlogSlide from '../components/index/BlogSlide';
import BlogSlideLoader from '../components/loaders/BlogSlideLoader';

export default function SearchPage() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState<Array<ISingleBlogItem>>();
  const [resultsFor, setResultsFor] = useState('');
  const [loading, setLoading] = useState(false);

  async function searchData() {
    try {
      setLoading(true);
      const response = await axios.get('/blog/search/' + search, {
        withCredentials: true,
      });

      setData(response.data);
      setResultsFor(search);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex justify-stretch py-20 items-center flex-col min-h-[80vh] w-full'>
      <div className='flex justify-center items-center gap-4'>
        <Input
          className='w-72 font-semibold'
          placeholder='Search...'
          required
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button className='w-32' onClick={searchData}>
          Search
        </Button>
      </div>
      {loading}

      {loading ? (
        <div className='grid grid-flow-row grid-cols-2 px-20 gap-4 py-10 w-full'>
          <>
            {[0, 1, 2, 3].map((i: number) => (
              <BlogSlideLoader key={i} />
            ))}
          </>
        </div>
      ) : (
        data && (
          <>
            <h1 className='py-4 font-semibold'>
              Showing results for "{resultsFor}"
            </h1>
            <div className='grid grid-flow-row grid-cols-2 px-20 gap-4 py-10'>
              {data.map((item) => (
                <BlogSlide key={item.id} item={item} />
              ))}
            </div>
          </>
        )
      )}
    </div>
  );
}
