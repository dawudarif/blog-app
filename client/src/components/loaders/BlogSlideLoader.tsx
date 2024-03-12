export default function BlogSlideLoader() {
  return (
    <div className='bg-stone-100 rounded-lg p-4 grid gap-4 grid-cols-2 cursor-pointer hover:shadow-md transition duration-500 w-full animate-pulse'>
      <div className='h-40 w-50 object-cover bg-stone-300'></div>
      <div className='flex-col flex gap-8'>
        <div className='flex flex-col gap-2'>
          <div className='text-[1.8rem] font-bold capitalize bg-stone-300 w-30 h-4'></div>
          <div className='text-[1.4rem] italic font-base capitalize bg-stone-300 w-45 h-4'></div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='font-mono font-semibold text-[1.2rem] capitalize bg-stone-300 w-20 h-4 py-2'></div>
          <div className='text-[1.2rem] font-mono bg-stone-300 w-20 h-4 py-2'></div>
        </div>
      </div>
    </div>
  );
}
