import moment from 'moment';
import { IBlogItem } from '../../types/types';
import { Link } from 'react-router-dom';

export default function BlogSlide({ item }: { item: IBlogItem }) {
  return (
    <Link
      to={`/blog/${item.id}`}
      className='bg-stone-100 rounded-lg p-4 flex xs:flex-col sm:flex-col gap-4 cursor-pointer transition duration-500 w-full'
    >
      <div className='w-[50%] xs:w-full sm:w-full'>
        <img
          src={item.cover}
          alt={item.title}
          className='h-40 w-full object-cover'
        />
      </div>
      <div className='flex-col flex gap-4 w-[50%] xs:w-full sm:w-full'>
        <div>
          <h1 className='text-[1.2rem] font-bold capitalize line-clamp-3'>
            {item.title}
          </h1>
          <h2 className='text-[1rem] italic font-base capitalize'>
            {item.summary}
          </h2>
        </div>
        <div>
          <h2 className='font-mono font-semibold text-[1rem] capitalize'>
            {item.account.name}
          </h2>
          <h4 className='text-[1rem] font-mono'>
            {moment(item.createdAt).format('MMMM Do, YYYY')}
          </h4>
        </div>
      </div>
    </Link>
  );
}
