import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function SearchPage() {
  const [search, setSearch] = useState('');

  return (
    <div className='flex justify-stretch py-20 items-center flex-col min-h-[80vh] w-full'>
      <div className='flex justify-center items-center gap-4'>
        <Input
          className='w-72 font-semibold'
          placeholder='News...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button className='w-32'>Search</Button>
      </div>
    </div>
  );
}
