import { Link, Navigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import '../index.css';
import axios from 'axios';
import { FormEvent, useState } from 'react';
import RingLoader from '../components/loaders/ring';
import { useToast } from '../components/ui/use-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  async function loginUser(e: FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        '/users/login',
        { email, password },
        { withCredentials: true },
      );

      if (response.status === 200) {
        setRedirect(true);
      } else {
        throw new Error();
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.response.data.error,
      });
    } finally {
      setLoading(false);
    }
  }

  if (redirect) {
    return <Navigate to='/' />;
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
        <Button
          variant='default'
          className='w-full mt-4'
          type='submit'
          disabled={loading}
        >
          {loading ? <RingLoader size={25} color='white' /> : <>Login</>}
        </Button>
        <Link to='/register' className='hover:text-blue-900'>
          Not a user? Register here.
        </Link>
      </form>
    </div>
  );
}
