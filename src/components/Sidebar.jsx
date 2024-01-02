import Logo from "./Logo";
import AppNav from "./AppNav";
import styles from "./Sidebar.module.css";
import { Outlet } from "react-router-dom";
import User from "./User";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <User />

      <Outlet />

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; copiryght {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
