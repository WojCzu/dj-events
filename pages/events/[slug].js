import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";
import Link from "next/link";
import Image from "next/image";
import { FaPencilAlt, FaTimes } from "react-icons/fa";

const EventPage = ({ event }) => {
  const handleDeleteEvent = e => {
    console.log("delete");
  };

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${event.id}`}>
            <FaPencilAlt /> Edit Event
          </Link>
          <button className={styles.delete} onClick={handleDeleteEvent}>
            <FaTimes /> Delete Event
          </button>
        </div>

        <span>
          {new Date(event.date).toLocaleDateString("en-US")} at {event.time}
        </span>

        <h1>{event.name}</h1>
        {event.image && (
          <div className={styles.image}>
            <Image src={event.image} width={960} height={600} />
          </div>
        )}

        <h2>Performers:</h2>
        <p>{event.performers}</p>
        <h2>Description:</h2>
        <p>{event.description}</p>
        <h2>Venue: {event.venue}</h2>
        <p>{event.address}</p>

        <Link href='/events' className={styles.back}>
          {"<"} Go Back
        </Link>
      </div>
    </Layout>
  );
};

export default EventPage;

export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(`${API_URL}/api/events/${slug}`);
  const events = await res.json();
  return {
    props: { event: events[0] },
  };
}
