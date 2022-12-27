import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";
import Link from "next/link";
import Image from "next/image";

const EventPage = ({ event }) => {
  const { date, time, name, image, performers, description, venue, address } =
    event.attributes;
  return (
    <Layout>
      <div className={styles.event}>
        <span>
          {new Date(date).toLocaleDateString("en-US")} at {time}
        </span>

        <h1>{name}</h1>
        {image && (
          <div className={styles.image}>
            <Image
              alt={
                image?.data?.attributes?.alternativeText || "image of the event"
              }
              src={
                image?.data?.attributes?.formats?.medium?.url ||
                "/images/event-default.png"
              }
              width={960}
              height={600}
            />
          </div>
        )}

        <h2>Performers:</h2>
        <p>{performers}</p>
        <h2>Description:</h2>
        <p>{description}</p>
        <h2>Venue: {venue}</h2>
        <p>{address}</p>

        <Link href='/events' className={styles.back}>
          {"<"} Go Back
        </Link>
      </div>
    </Layout>
  );
};

export default EventPage;

export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(
    `${API_URL}/api/events?filters[slug][$eq]=${slug}&[populate]=*`
  );
  const events = await res.json();
  return {
    props: { event: events.data[0] },
  };
}
