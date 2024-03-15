import { Link, Navigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import '../index.css';
import axios from 'axios';
import { FormEvent, useContext, useEffect, useState } from 'react';
import RingLoader from '../components/loaders/ring';
import { useToast } from '../components/ui/use-toast';
import { KeyRound } from 'lucide-react';
import { UserContext } from '../context/userContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  const { userInfo, setUserInfo } = useContext(UserContext) as any;
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
        setUserInfo(response.data);
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

  useEffect(() => {
    if (userInfo.name) {
      setRedirect(true);
    }
  }, [userInfo]);

  if (redirect) {
    return <Navigate to='/' />;
  }

  return (
    <div className='flex flex-col items-center justify-center bg-slate-50 w-full lg:min-h-[38rem] md:min-h-[38rem] sm:h-[30rem] xs:h-[30rem] gap-10'>
      <div className='flex flex-col justify-center items-center gap-6'>
        <h1 className='font-bold text-3xl sm:text-2xl xs:text-2xl text-[#5555] text-center'>
          Login to Your account
        </h1>
        <KeyRound size={45} color='#5555' />
      </div>
      <form
        className='w-[40%] sm:w-[95%] xs:w-[95%] md:w-[50%] gap-2 flex flex-col h-auto'
        onSubmit={loginUser}
      >
        <Input
          placeholder='john@example.com'
          type='email'
          className='text-base p-6 focus-visible:ring-0 focus-visible:ring-offset-0'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder='Password'
          type='password'
          className='text-base p-6 focus-visible:ring-0 focus-visible:ring-offset-0'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant='default'
          className='w-full mt-4 p-6'
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
