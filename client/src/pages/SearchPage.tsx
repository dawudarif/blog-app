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
    <div className='flex justify-stretch py-20 items-center flex-col min-h-[38rem] w-full'>
      <div className='flex justify-center items-center sm:flex-col xs:flex-col xs:items-start sm:items-start gap-4 w-[40%] sm:w-[95%] xs:w-[95%] md:w-[50%]'>
        <Input
          className='w-[70%] sm:w-full xs:w-full font-semibold focus-visible:ring-0 focus-visible:ring-offset-0 p-6'
          placeholder='Search...'
          required
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          className='w-[30%] p-6 sm:w-full xs:w-full'
          onClick={searchData}
        >
          Search
        </Button>
      </div>

      {loading ? (
        <div className='grid grid-flow-row grid-cols-2 md:grid-cols-1 sm:grid-cols-1 xs:grid-cols-1 px-20 sm:px-2 xs:px-2 gap-4 py-4'>
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
            <div className='grid grid-flow-row grid-cols-2 md:grid-cols-1 sm:grid-cols-1 xs:grid-cols-1 px-20 sm:px-2 xs:px-2 gap-4 py-4'>
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
