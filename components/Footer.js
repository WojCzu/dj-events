import Link from "next/link";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>copyright &copy; DJ Events 2022</p>
      <p>
        <Link href={"/about"}>About this project</Link>
      </p>
    </footer>
  );
};

export default Footer;
