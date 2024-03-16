import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { toast } from 'sonner';

export default function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext) as any;
  const [redirect, setRedirect] = useState(false);

  const hrefStyle =
    'font-semibold text-xl sm:text-lg xs:text-lg cursor-pointer hover:bg-slate-800 transition-all duration-500 p-2 xs:p-1 sm:p-1 rounded-md text-white';

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
      toast(`You've been logged out successfully`);
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
    <div className='flex justify-center items-center h-20 xs:h-15 sm:h-15 gap-4 xs:gap-2 sm:gap-2 bg-slate-950 text-white shadow-sm'>
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
