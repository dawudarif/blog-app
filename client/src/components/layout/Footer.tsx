import React from 'react';

export default function Footer() {
  return (
    <div className='flex justify-center items-center h-16 bg-slate-950 text-white text-lg gap-4 font-mono font-semibold'>
      <span> Blogger</span> <span>&copy; {new Date().getFullYear()}</span>
    </div>
  );
}
