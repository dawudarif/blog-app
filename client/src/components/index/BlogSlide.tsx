import moment from 'moment';
import { IBlogItem } from '../../types/types';

export default function BlogSlide({ item }: { item: IBlogItem }) {
  return (
    <div className='bg-stone-50 rounded-lg w-[80%] p-4 grid gap-4 grid-cols-2 cursor-pointer hover:shadow-md transition duration-500'>
      <div>
        <img
          src={item.cover}
          alt={item.title}
          className='h-50 w-full object-cover'
        />
      </div>
      <div className='flex-col flex gap-4'>
        <div>
          <h1 className='text-[1.8rem] font-bold capitalize'>{item.title}</h1>
          <h2 className='text-[1.4rem] italic font-base capitalize'>
            {item.summary}
          </h2>
        </div>
        <div>
          <h2 className='font-mono font-semibold text-[1.2rem] capitalize'>
            {item.account.name}
          </h2>
          <h4 className='text-[1.2rem] font-mono'>
            {moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
          </h4>
        </div>
      </div>
    </div>
  );
}
