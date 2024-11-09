export default function BlogSlideLoader() {
  return (
    <div className="bg-stone-100 rounded-lg p-4 gap-4 flex md:flex-row flex-col cursor-pointer transition duration-500 w-full animate-pulse">
      <div className="h-40 w-50 object-cover bg-stone-300 md:w-[50%] w-full"></div>
      <div className="flex-col flex gap-8 md:w-[50%] w-full">
        <div className="flex flex-col gap-2">
          <div className="text-[1.8rem] font-bold capitalize bg-stone-300 w-30 h-4"></div>
          <div className="text-[1.4rem] italic font-base capitalize bg-stone-300 w-45 h-4"></div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="font-mono font-semibold text-[1.2rem] capitalize bg-stone-300 w-20 h-4 py-2"></div>
          <div className="text-[1.2rem] font-mono bg-stone-300 w-20 h-4 py-2"></div>
        </div>
      </div>
    </div>
  );
}
