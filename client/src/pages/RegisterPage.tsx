import axios from 'axios';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import '../index.css';
import RingLoader from '../components/loaders/ring';
import { useToast } from '../components/ui/use-toast';
import { KeyRound } from 'lucide-react';
import { UserContext } from '../context/userContext';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const { userInfo, setUserInfo } = useContext(UserContext) as any;
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
        setUserInfo(response.data.createUser);
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

  useEffect(() => {
    if (userInfo.name) {
      setRedirect(true);
    }
  }, [userInfo]);

  if (redirect) {
    return <Navigate to='/' />;
  }

  return (
    <div className='flex flex-col items-center justify-center bg-slate-50 w-full min-h-[38rem] gap-10'>
      <div className='flex flex-col justify-center items-center gap-6'>
        <h1 className='font-bold text-3xl sm:text-2xl xs:text-2xl text-[#5555]'>
          Register a New Account
        </h1>
        <KeyRound size={45} color='#5555' />
      </div>
      <form
        className='w-[40%] sm:w-[95%] xs:w-[95%] md:w-[50%] gap-2 flex flex-col h-auto'
        onSubmit={registerUser}
      >
        <Input
          placeholder='john@example.com'
          type='email'
          className='text-base p-6 focus-visible:ring-0 focus-visible:ring-offset-0'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder='John Doe'
          type='text'
          className='text-base p-6 focus-visible:ring-0 focus-visible:ring-offset-0'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder='Password'
          type='password'
          className='text-base p-6 focus-visible:ring-0 focus-visible:ring-offset-0'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          placeholder='Confirm Password'
          type='password'
          className='text-base p-6 focus-visible:ring-0 focus-visible:ring-offset-0'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          variant='default'
          className='w-full mt-4 p-6'
          type='submit'
          disabled={loading}
        >
          {loading ? <RingLoader size={25} color='white' /> : <>Register</>}
        </Button>
        <Link to='/login' className='hover:text-blue-900'>
          Already a user? Login here.
        </Link>
      </form>
    </div>
  );
}
