import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

export default function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext) as any;
  const [redirect, setRedirect] = useState(false);

  const hrefStyle =
    'font-semibold text-xl cursor-pointer hover:bg-stone-100 transition-all duration-500 p-2 rounded-md text-[#333]';

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

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (redirect) {
    return <Navigate to='/login' />;
  }

  return (
    <div className='flex justify-center items-center h-20 bg-[#ffff] shadow-sm gap-4 sticky top-0'>
      <Link to='/' className={hrefStyle}>
        Feed
      </Link>
      {userInfo.name ? (
        <div className={hrefStyle}>Logout</div>
      ) : (
        <Link to='/login' className={hrefStyle}>
          Login
        </Link>
      )}
    </div>
  );
}
