import styles from "@/styles/EventItem.module.css";
import Image from "next/image";
import Link from "next/link";

const EventItem = ({ event }) => {
  const { date, time, name, slug, image } = event.attributes;
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          alt={image?.data?.attributes?.alternativeText || "image of the event"}
          src={
            image?.data?.attributes?.formats?.thumbnail?.url ||
            "/images/event-default.png"
          }
          width={170}
          height={100}
        />
      </div>

      <div className={styles.info}>
        <span>
          {new Date(date).toLocaleDateString("en-US")} at {time}
        </span>
        <h2>{name}</h2>
      </div>

      <div className={styles.link}>
        <Link href={`/events/${slug}`} className={"btn"}>
          Details
        </Link>
      </div>
    </div>
  );
};

export default EventItem;
