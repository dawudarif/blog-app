import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import '../index.css';
import axios from 'axios';
import { FormEvent, useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function loginUser(e: FormEvent) {
    e.preventDefault();
    const response = await axios.post(
      '/users/login',
      { email, password },
      { withCredentials: true },
    );

    console.log(response);
  }

  return (
    <div className='flex flex-col items-center justify-center bg-[#f1f1f1] w-full h-screen gap-10'>
      <h1 className='font-bold text-3xl text-[#5555]'>Login to Your account</h1>
      <form className='w-[30%] gap-2 flex flex-col' onSubmit={loginUser}>
        <Input
          placeholder='john@example.com'
          type='email'
          className='text-base'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder='Password'
          type='password'
          className='text-base'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant='default' className='w-full mt-4' type='submit'>
          Login
        </Button>
        <Link to='/register' className='hover:text-blue-900'>
          Not a user? Register here.
        </Link>
      </form>
    </div>
  );
}
