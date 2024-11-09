import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { toast } from "sonner";
import clsx from "clsx";

export default function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext) as any;
  const [redirect, setRedirect] = useState(false);

  const hrefStyle =
    "text-xl font-semibold cursor-pointer hover:bg-stone-100 transition-all duration-500 rounded-md text-brand-text-black p-2";

  async function getProfile() {
    const response = await axios.get("/users/profile", {
      withCredentials: true,
    });

    if (response.status === 200) {
      setUserInfo(response.data.userInfo);
    } else {
      setRedirect(true);
    }
  }

  async function logout() {
    const response = await axios.get("/users/logout", {
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
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex max-w-screen-xxxl text-brand-text-black sm:justify-between justify-center items-center sm:flex-row flex-col py-4 px-5 lg:px-10">
      <span>
        {userInfo?.name && (
          <p className={clsx("capitalize !font-bold text-3xl", hrefStyle)}>
            {userInfo.name}
          </p>
        )}
      </span>

      <span>
        <Link to="/" className={hrefStyle}>
          Feed
        </Link>
        <Link to="/search" className={hrefStyle}>
          Search
        </Link>
        {userInfo.name && (
          <Link to="/blog/create" className={hrefStyle}>
            Create
          </Link>
        )}
        {userInfo.name ? (
          <span className={hrefStyle} onClick={logout}>
            Logout
          </span>
        ) : (
          <Link to="/login" className={hrefStyle}>
            Login
          </Link>
        )}
      </span>
    </div>
  );
}
