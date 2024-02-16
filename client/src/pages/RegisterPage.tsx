import axios from 'axios';
import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import '../index.css';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function registerUser(e: FormEvent) {
    e.preventDefault();
    const response = await axios.post(
      '/users/register',
      { email, password, confirmPassword, name },
      { withCredentials: true },
    );

    console.log(response);
  }

  return (
    <div className='flex flex-col items-center justify-center bg-[#f1f1f1] w-full h-screen gap-10'>
      <h1 className='font-bold text-3xl text-[#5555]'>
        Register a New Account
      </h1>
      <form className='w-[30%] gap-2 flex flex-col' onSubmit={registerUser}>
        <Input
          placeholder='john@example.com'
          type='email'
          className='text-base'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder='John Doe'
          type='text'
          className='text-base'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder='Password'
          type='password'
          className='text-base'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          placeholder='Confirm Password'
          type='password'
          className='text-base'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button variant='default' className='w-full mt-4' type='submit'>
          Register
        </Button>
        <Link to='/login' className='hover:text-blue-900'>
          Already a user? Login here.
        </Link>
      </form>
    </div>
  );
}
