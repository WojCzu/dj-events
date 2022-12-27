import styles from "@/styles/DashboardEvent.module.css";
import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";

const DashboardEvent = ({ event, handleDelete }) => {
  const { name, slug } = event.attributes;
  return (
    <div className={styles.event}>
      <h4>
        <Link href={`/events/${slug}`}>{name}</Link>
      </h4>
      <Link href={`/events/edit/${event.id}`} className={styles.edit}>
        <FaPencilAlt /> <span>Edit Event</span>
      </Link>
      <button className={styles.delete} onClick={handleDelete}>
        <FaTimes /> <span>Delete</span>
      </button>
    </div>
  );
};

export default DashboardEvent;
