import { Home, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BlogContentLoader() {
  return (
    <div className='flex justify-center items-center py-6 animate-pulse'>
      <div className='w-[80%]'>
        <div className='flex items-center gap-4'>
          <Link to='/' className='hover:text-slate-900 hover:underline'>
            <Home size={22} />
          </Link>
          <span className='text-semibold'> / </span>
          <div className='h-4 w-20 bg-stone-300'></div>
        </div>
        <span>
          <span className='flex flex-col gap-3 py-2'>
            <div className='h-8 w-[60%] bg-stone-300'></div>
            <div className='h-6 w-[80%] bg-stone-300'></div>
          </span>
        </span>
        <div className='flex flex-col gap-4 py-2 border-t-2 border-b-2 border-slate-950 my-2'>
          <span className='flex justify-between items-center'>
            <div className='flex justify-center items-center font-bold gap-3'>
              <span className='rounded-full bg-slate-900 p-2'>
                <User color='white' size={30} />
              </span>
              <div className='h-4 w-20 bg-stone-300'></div>
            </div>
            <span className='h-4 w-20 bg-stone-300'></span>
          </span>
        </div>
        <div className='h-[30rem] w-full bg-stone-300'></div>
        <div className='flex flex-col gap-2'>
          {[0, 1, 2].map((i) => (
            <div key={i} className={`h-4 w-[100%] bg-stone-300`}></div>
          ))}
        </div>
      </div>
    </div>
  );
}
