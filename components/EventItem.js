import styles from "@/styles/EventItem.module.css";
import Image from "next/image";
import Link from "next/link";

const EventItem = ({ event }) => {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={event.image || "/images/event-default.png"}
          width={170}
          height={150}
        />
      </div>

      <div className={styles.info}>
        <span>
          {event.date} at {event.time}
        </span>
        <h2>{event.name}</h2>
      </div>

      <div className={styles.link}>
        <Link href={`/events/${event.slug}`} className={"btn"}>
          Details
        </Link>
      </div>
    </div>
  );
};

export default EventItem;
