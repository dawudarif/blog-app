import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { useToast } from '../ui/use-toast';

export default function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext) as any;
  const [redirect, setRedirect] = useState(false);

  const { toast } = useToast();

  const hrefStyle =
    'font-semibold text-xl cursor-pointer hover:bg-slate-800 transition-all duration-500 p-2 rounded-md text-white';

  async function getProfile() {
    const response = await axios.get('/users/profile', {
      withCredentials: true,
    });

    if (response.status === 200) {
      setUserInfo(response.data.userInfo);
    } else {
      setRedirect(true);
    }
  }

  async function logout() {
    const response = await axios.get('/users/logout', {
      withCredentials: true,
    });

    if (response.status === 200) {
      setUserInfo({});
      toast({
        variant: 'default',
        title: 'Success',
        description: `You've been logged out successfully`,
      });
    }
  }

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (redirect) {
    return <Navigate to='/login' />;
  }

  return (
    <div className='flex justify-center items-center h-20 bg-slate-950 text-white shadow-sm gap-4'>
      <Link to='/' className={hrefStyle}>
        Feed
      </Link>

      <Link to='/search' className={hrefStyle}>
        Search
      </Link>

      {userInfo.name ? (
        <>
          <Link to='/blog/create' className={hrefStyle}>
            Create
          </Link>
          <div className={hrefStyle} onClick={logout}>
            Logout
          </div>
        </>
      ) : (
        <Link to='/login' className={hrefStyle}>
          Login
        </Link>
      )}
    </div>
  );
}
