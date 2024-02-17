import axios from 'axios';
import { LibrarySquare, LogOut } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/userContext';
import { Navigate } from 'react-router-dom';

export default function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext) as any;
  const [redirect, setRedirect] = useState(false);

  const size = 45;
  const color = '#1e1e1e';

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
    <div className='flex justify-center items-center h-20 bg-[#ffff] shadow-sm gap-4'>
      <div>
        <LibrarySquare size={size} color={color} />
      </div>
      <div className='flex bg-gray-200 rounded-md justify-center items-center p-1'>
        <LogOut size={size} color={color} />
        <h1 className='capitalize font-semibold'>{userInfo.name}</h1>
      </div>
    </div>
  );
}
