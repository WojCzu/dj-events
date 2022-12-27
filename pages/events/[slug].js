import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";
import Link from "next/link";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPencilAlt, FaTimes } from "react-icons/fa";

const EventPage = ({ event }) => {
  const router = useRouter();

  const handleDeleteEvent = async e => {
    if (confirm("Are you sure?")) {
      const res = await fetch(`${API_URL}/api/events/${event.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const { error } = await res.json();
        toast.error(error?.message || "Something Went Wrong");
      } else {
        router.push(`/events`);
      }
    }
  };

  const { date, time, name, image, performers, description, venue, address } =
    event.attributes;
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
      <ToastContainer theme='colored' position='bottom-right' />
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
