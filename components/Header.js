import styles from "@/styles/Header.module.css";
import Link from "next/link";
import Search from "./Search";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href={"/"}>DJ Events</Link>
      </div>

      <Search />

      <nav>
        <ul>
          <li>
            <Link href={"/events"}>Events</Link>
          </li>
          {user ? <LoginUserLinks logout={logout} /> : <NotLoginUserLinks />}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

const LoginUserLinks = ({ logout }) => (
  <>
    <li>
      <Link href={"/events/add"}>Add Event</Link>
    </li>
    <li>
      <Link href={"/account/dashboard"}>Dashboard</Link>
    </li>
    <li>
      <button className='btn-secondary btn-icon' onClick={logout}>
        <FaSignOutAlt /> Logout
      </button>
    </li>
  </>
);

const NotLoginUserLinks = () => (
  <>
    <li>
      <Link href={"/account/login"} className='btn-secondary btn-icon'>
        <FaSignInAlt />
        Login
      </Link>
    </li>
  </>
);
