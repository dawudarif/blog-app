import axios from 'axios';
import { FormEvent, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import '../index.css';
import RingLoader from '../components/loaders/ring';
import { useToast } from '../components/ui/use-toast';
import { KeyRound } from 'lucide-react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const { toast } = useToast();

  async function registerUser(e: FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      const body = { email, password, confirmPassword, name };

      const response = await axios.post('/users/register', body, {
        withCredentials: true,
      });

      if (response.status !== 201) {
        throw Error();
      } else {
        setRedirect(true);
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error creating account',
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
    <div className='flex flex-col items-center justify-center bg-slate-50 w-full h-[35rem] gap-10'>
      <div className='flex flex-col justify-center items-center gap-6'>
        <h1 className='font-bold text-3xl text-[#5555]'>
          Register a New Account
        </h1>
        <KeyRound size={45} color='#5555' />
      </div>
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
        <Button
          variant='default'
          className='w-full mt-4'
          type='submit'
          disabled={loading}
        >
          {loading ? <RingLoader size={25} color='white' /> : <>Login</>}
        </Button>
        <Link to='/login' className='hover:text-blue-900'>
          Already a user? Login here.
        </Link>
      </form>
    </div>
  );
}
